import type { Cache } from "./cache.d";
import client from "./connection";

const cache: Cache = {
  set: async <T>(key: string, value: T, expiryTime?: number): Promise<void> => {
    await client.set(key, JSON.stringify(value));
    expiryTime && (await client.expire(key, expiryTime));
  },

  getOne: async <T>(key: string): Promise<T | null> => {
    const reply = await client.get(key);
    return reply ? JSON.parse(reply) : reply;
  },

  deleteOne: async (key: string): Promise<void> => {
    await client.del(key);
  },

  exist: async (key: string): Promise<boolean> => {
    const reply = await client.get(key);
    return !!reply;
  },

  connect: async (): Promise<void> => {
    await client.connect();
  },
};

export default cache;
