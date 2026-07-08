// import prisma from "../../lib/prisma";
// import { RentalRequestStatus } from "../../../generated/prisma/enums";
// import { TCreateReview } from "./review.interface";

// const createReviewIntoDB = async (payload: TCreateReview, tenantId: string) => {
//   const rentalRequest = await prisma.rentalRequest.findUnique({
//     where: {
//       id: payload.rentalRequestId,
//     },
//   });

//   if (!rentalRequest) {
//     throw new Error("Rental request not found");
//   }

//   if (rentalRequest.tenantId !== tenantId) {
//     throw new Error("Unauthorized access");
//   }

//   if (rentalRequest.status !== RentalRequestStatus.COMPLETED) {
//     throw new Error("You can only review completed rentals");
//   }

//   const existingReview = await prisma.review.findUnique({
//     where: {
//       rentalRequestId: payload.rentalRequestId,
//     },
//   });

//   if (existingReview) {
//     throw new Error("Review already exists");
//   }

//   const review = await prisma.review.create({
//     data: {
//       rating: payload.rating,
//       comment: payload.comment,
//       tenantId,
//       propertyId: rentalRequest.propertyId,
//       rentalRequestId: payload.rentalRequestId,
//     },
//     include: {
//       tenant: {
//         omit: {
//           password: true,
//         },
//       },
//       property: {
//         include: {
//           category: true,
//           landlord: {
//             omit: {
//               password: true,
//             },
//           },
//         },
//       },
//       rentalRequest: true,
//     },
//   });

//   return review;
// };

// export const reviewService = {
//   createReviewIntoDB,
// };
