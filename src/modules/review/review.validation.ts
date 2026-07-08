import { TCreateReview } from "./review.interface";

const validateCreateReviewPayload = (payload: TCreateReview) => {
  const { rentalRequestId, rating, comment } = payload;

  if (typeof rentalRequestId !== "string" || rentalRequestId.trim() === "") {
    throw new Error("Rental request ID is required");
  }

  if (typeof rating !== "number") {
    throw new Error("Rating is required");
  }

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  if (typeof comment !== "string" || comment.trim() === "") {
    throw new Error("Comment is required");
  }

  if (comment.trim().length > 500) {
    throw new Error("Comment cannot exceed 500 characters");
  }
};

export const reviewValidation = {
  validateCreateReviewPayload,
};
