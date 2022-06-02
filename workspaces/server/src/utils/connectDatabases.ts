import redis from "../cache";
import prisma from "../database";

export const connectDatabases = async (): Promise<void> => {
  await redis.connect();
  await prisma.$connect();
};
