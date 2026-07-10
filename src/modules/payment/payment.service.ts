import {
  PaymentStatus,
  RentalRequestStatus,
} from "../../../generated/prisma/enums";
import prisma from "../../lib/prisma";
import stripe from "../../lib/stripe";
import config from "../../config";
import Stripe from "stripe";
import { TCreatePayment } from "./payment.interface";
import { Request, Response } from "express";

const createPaymentIntoDB = async (
  payload: TCreatePayment,
  tenantId: string,
) => {
  const rentalRequest = await prisma.rentalRequest.findUnique({
    where: {
      id: payload.rentalRequestId,
    },
    include: {
      property: true,
      payment: true,
    },
  });

  if (!rentalRequest) {
    throw new Error("Rental request not found");
  }

  if (rentalRequest.tenantId !== tenantId) {
    throw new Error("Unauthorized access");
  }

  if (rentalRequest.status !== RentalRequestStatus.APPROVED) {
    throw new Error("Rental request is not approved");
  }

  if (rentalRequest.payment) {
    throw new Error("Payment already exists");
  }

  const amount = Math.round(Number(rentalRequest.property.price) * 100);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],

    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "bdt",
          unit_amount: amount,
          product_data: {
            name: rentalRequest.property.title,
            description: rentalRequest.property.description,
          },
        },
      },
    ],

    metadata: {
      rentalRequestId: rentalRequest.id,
      tenantId,
    },

    success_url: `${config.app_url}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

    cancel_url: `${config.app_url}/payment/cancel`,
  });

  const payment = await prisma.payment.create({
    data: {
      transactionId: session.id,
      rentalRequestId: rentalRequest.id,
      amount: rentalRequest.property.price,
      method: "CARD",
      status: PaymentStatus.PENDING,
    },
  });

  if (!session.url) {
    throw new Error("Failed to create checkout session");
  }

  return {
    paymentUrl: session.url,
    payment,
    sessionId: session.id,
  };
};

const stripeWebhookIntoDB = async (req: Request) => {
  const signature = req.headers["stripe-signature"] as string;

  if (!signature) {
    throw new Error("Stripe signature is missing");
  }

  console.log("Webhook Called");
  const payload = req.body;
  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    config.stripe_webhook_secret as string,
  );
  console.log("Event:", event.type);
  if (event.type !== "checkout.session.completed") {
    return;
  }

  const session = event.data.object as Stripe.Checkout.Session;
  console.log("Session ID:", session.id);
  const payment = await prisma.payment.findUnique({
    where: {
      transactionId: session.id,
    },
    include: {
      rentalRequest: true,
    },
  });
  console.log("Payment:", payment);

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.status === PaymentStatus.COMPLETED) {
    return;
  }

  await prisma.payment.update({
    where: {
      transactionId: session.id,
    },
    data: {
      status: PaymentStatus.COMPLETED,
      paidAt: session.created ? new Date(session.created * 1000) : new Date(),
    },
  });

  await prisma.rentalRequest.update({
    where: {
      id: payment.rentalRequestId,
    },
    data: {
      status: RentalRequestStatus.ACTIVE,
    },
  });

  await prisma.property.update({
    where: {
      id: payment.rentalRequest.propertyId,
    },
    data: {
      availability: false,
    },
  });
};

const getMyPaymentsFromDB = async (tenantId: string) => {
  const result = await prisma.payment.findMany({
    where: {
      rentalRequest: {
        tenantId,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      rentalRequest: {
        include: {
          property: {
            include: {
              category: true,
              landlord: {
                omit: {
                  password: true,
                },
              },
            },
          },
        },
      },
    },
  });

  return result;
};

const getSinglePaymentFromDB = async (paymentId: string, tenantId: string) => {
  const payment = await prisma.payment.findUnique({
    where: {
      id: paymentId,
    },
    include: {
      rentalRequest: {
        include: {
          property: {
            include: {
              category: true,
              landlord: {
                omit: {
                  password: true,
                },
              },
            },
          },
          review: true,
        },
      },
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  if (payment.rentalRequest.tenantId !== tenantId) {
    throw new Error("Unauthorized access");
  }

  return payment;
};

export const paymentService = {
  createPaymentIntoDB,
  stripeWebhookIntoDB,
  getMyPaymentsFromDB,
  getSinglePaymentFromDB,
};
