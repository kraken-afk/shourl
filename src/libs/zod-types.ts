import { z } from "zod";

const urlRegex =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/i;
export const UrlSchema = z.object({
  url: z.string().refine((arg) => urlRegex.test(arg), {
    message: "Please enter a valid URL",
  }),
});
