import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://" + process.env.redis_host!,
  token: process.env.redis_token!,
});
