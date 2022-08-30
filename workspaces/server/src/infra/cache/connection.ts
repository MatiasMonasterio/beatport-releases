import { createClient } from "redis";
import { REDIS_URL } from "../../config/env";

export default createClient({
  url: REDIS_URL,
});
