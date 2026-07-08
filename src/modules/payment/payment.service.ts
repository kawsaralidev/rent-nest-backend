import {
  PaymentStatus,
  RentalRequestStatus,
} from "../../../generated/prisma/enums";
import prisma from "../../lib/prisma";
import stripe from "../../lib/stripe";
import { TCreatePayment } from "./payment.interface";

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

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "bdt",
    automatic_payment_methods: {
      enabled: true,
    },
  });

  const payment = await prisma.payment.create({
    data: {
      transactionId: paymentIntent.id,
      rentalRequestId: rentalRequest.id,
      amount: rentalRequest.property.price,
      method: "CARD",
      status: PaymentStatus.PENDING,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    payment,
  };
};

export const paymentService = {
  createPaymentIntoDB,
};
