import httpStatus from "http-status";
import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../../utils/catchAysnc";

const createPayment = catchAsync(async (req: Request, res: Response) => {
  const tenantId = res.locals.user.id;

  const result = await paymentService.createPaymentIntoDB(req.body, tenantId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Checkout session created successfully",
    data: result,
  });
});


const stripeWebhook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await paymentService.stripeWebhookIntoDB(req);

    res.status(httpStatus.OK).json({
      received: true,
    });
  } catch (error) {
    next(error);
  }
};

const getMyPayments = catchAsync(async (req: Request, res: Response) => {
  const tenantId = res.locals.user.id;

  const result = await paymentService.getMyPaymentsFromDB(tenantId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
  const tenantId = res.locals.user.id;

  const result = await paymentService.getSinglePaymentFromDB(
    req.params.id as string,
    tenantId,
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment retrieved successfully",
    data: result,
  });
});

export const paymentController = {
  createPayment,
  stripeWebhook,
  getMyPayments,
  getSinglePayment,
};
