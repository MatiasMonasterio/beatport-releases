import type { Prisma } from "@prisma/client";
import { bcrypt } from "../../../utilities";

const encryptUserPassword: Prisma.Middleware = async (params, next) => {
  const { action, model, args } = params;

  if (model === "UserDB" && action === "create") {
    const user = args.data;
    user.password = await bcrypt.hash(user.password);

    params.args.data = user;
  }

  return next(params);
};

export default encryptUserPassword;
