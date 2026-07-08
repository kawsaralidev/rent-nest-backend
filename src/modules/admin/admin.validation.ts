import { UserStatus } from "../../../generated/prisma/enums";

const validateUpdateUserStatusPayload = (payload: { status: UserStatus }) => {
  const { status } = payload;

  if (!status) {
    throw new Error("Status is required");
  }

  if (status !== UserStatus.ACTIVE && status !== UserStatus.BANNED) {
    throw new Error("Status must be ACTIVE or BANNED");
  }
};

export const adminValidation = {
  validateUpdateUserStatusPayload,
};
