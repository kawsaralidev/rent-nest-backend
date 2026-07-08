import httpStatus from "http-status";

import { sendResponse } from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import { Request, Response } from "express";
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

const confirmPayment = catchAsync(async (req: Request, res: Response) => {
  const result = await paymentService.confirmPaymentIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment confirmed successfully",
    data: result,
  });
});
const getMyPayments = catchAsync(async (req, res) => {
  const tenantId = res.locals.user.id;

  const result = await paymentService.getMyPaymentsFromDB(tenantId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payments retrieved successfully",
    data: result,
  });
});

const getSinglePayment = catchAsync(async (req, res) => {
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
  confirmPayment,
  getMyPayments,
  getSinglePayment,
};
