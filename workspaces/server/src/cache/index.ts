import { createClient } from "redis";
import { REDIS_URL } from "../config/constants";

const client = createClient({
  url: REDIS_URL,
});

export default client;
