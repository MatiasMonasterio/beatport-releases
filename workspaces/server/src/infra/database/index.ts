import { PrismaClient } from "@prisma/client";
import { encryptUserPassword } from "./middlewares";

const prisma = new PrismaClient();

prisma.$use(encryptUserPassword);

export default prisma;
