"use server";

import { z } from "zod";
import { UrlSchema } from "./zod-types";
import { redis } from "./db";
import { generateRandomString } from "./utils";

type ResponseType =
  | {
      status: true;
      data: z.infer<typeof UrlSchema>;
    }
  | {
      status: false;
      message: string;
    };

export async function urlShortAction(
  data: z.infer<typeof UrlSchema>,
): Promise<ResponseType> {
  const result = UrlSchema.safeParse(data);
  if (!result.success) return { status: false, message: result.error.message };

  const url = result.data.url;
  const urlStatus = await fetch(url, { cache: "no-store" });
  if (urlStatus.status !== 200)
    return {
      status: false,
      message: `Your site is  either offline or problematic.`,
    };

  const val: string = generateRandomString(4);
  // 3600 seconds -> 24 hours
  const response = await redis.set(val, url, { ex: 3600 });
  if (response !== "OK")
    return { status: false, message: "Something went error on the server" };

  return { status: true, data: { url: val } };
}
