import redis from "../infra/cache";
import prisma from "../infra/database";

export default async function connectDatabases() {
  await redis.connect();
  await prisma.$connect();
}
