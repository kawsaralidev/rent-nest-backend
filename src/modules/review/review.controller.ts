// import { Request, Response } from "express";
// import { reviewService } from "./review.service";
// import { catchAsync } from "../../utils/catchAysnc";
// import { sendResponse } from "../../utils/sendResponse";

// const createReview = catchAsync(async (req: Request, res: Response) => {
//   const result = await reviewService.createReviewIntoDB(
//     req.body,
//     res.locals.user.id,
//   );

//   sendResponse(res, {
//     success: true,
//     statusCode: 201,
//     message: "Review submitted successfully",
//     data: result,
//   });
// });

// export const reviewController = {
//   createReview,
// };
