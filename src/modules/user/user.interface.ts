import { Role } from "../../../generated/prisma/enums";

export type TRegisterUser = {
  name: string;
  email: string;
  password: string;
  role: Role;
};
