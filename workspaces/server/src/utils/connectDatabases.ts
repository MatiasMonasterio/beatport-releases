import redis from "../cache";
import prisma from "../database";

export default async function connectDatabases() {
  await redis.connect();
  await prisma.$connect();
}
