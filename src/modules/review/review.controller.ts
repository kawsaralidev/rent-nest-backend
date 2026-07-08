import { Request, Response } from "express";
import { reviewService } from "./review.service";
import { catchAsync } from "../../utils/catchAysnc";
import { sendResponse } from "../../utils/sendResponse";
import { reviewValidation } from "./review.validation";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const tenantId = res.locals.user.id;
  const payload = req.body;

  reviewValidation.validateCreateReviewPayload(payload);

  const result = await reviewService.createReviewIntoDB(payload, tenantId);

  sendResponse(res, {
    success: true,
    statusCode: 201,
    message: "Review submitted successfully",
    data: result,
  });
});

export const reviewController = {
  createReview,
};
