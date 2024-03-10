"use client";

import { urlShortAction } from "@/libs/action";
import { UrlSchema } from "@/libs/zod-types";
import { ShortUrlContext } from "@/providers/short-url-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clipboard, Loader2 } from "lucide-react";
import { MouseEventHandler, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export function Input() {
  const [isError, setError] = useState<boolean>();
  const [_, setUrl] = useContext(ShortUrlContext)!;
  const { register, handleSubmit, formState } = useForm<
    z.infer<typeof UrlSchema>
  >({
    resolver: zodResolver(UrlSchema),
    defaultValues: { url: "" },
  });
  const submitHandler = handleSubmit(async (args) => {
    const response = await urlShortAction(args);

    if (response.status) {
      setError(false);
      setUrl(response.data.url);

      toast.info("Your URL is ready!");
    } else {
      setError(true);

      toast.error(response.message);
    }
  });

  return (
    <>
      <form
        className="flex border border-[#ffc777] border-3 rounded-lg h-9 overflow-hidden"
        onSubmit={submitHandler}>
        <input
          {...register("url")}
          type="url"
          required
          name="url"
          className="w-[80%] h-full bg-[#1f2335] px-3 py-2 outline-transparent"
          placeholder="Enter the link here"
        />
        <button
          type="submit"
          className="text-bold w-[20%] h-full bg-[#ffc777] text-[#c53b53] hover:opacity-95 transition-colors">
          {formState.isSubmitting ? (
            <Loader2 className="mx-auto animate-spin" />
          ) : (
            "Short"
          )}
        </button>
      </form>
      {(isError || formState.errors.url) && (
        <small className="text-[#c53b53] inline-block translate-y-[-1rem]">
          Please insert a valid URL
        </small>
      )}
    </>
  );
}

export function ShortUrl() {
  const [url] = useContext(ShortUrlContext)!;
  const hostname =
    typeof window !== "undefined"
      ? window.location.href.endsWith("/")
        ? window.location.href.slice(0, window.location.href.length - 1)
        : window.location.href
      : "";
  const href = hostname + `/${url}`;
  const onClickHandler: MouseEventHandler<HTMLButtonElement> = () => {
    window.navigator.clipboard.writeText(href);
    toast.info("Copied to clipboard");
  };

  return (
    <>
      {url && (
        <div className="text-center block mx-auto mt-16 shadow-lg justify-center p-3 space-y-8 bg-[#24283b]">
          <div className="p-4 bg-[#1f2335] flex items-center">
            <span className="inline-block w-[90%]">{href}</span>
            <button
              onClick={onClickHandler}
              className="w-[10%] rounded-t-md rounded-br-md bg-[#24283b] py-2 hover:opacity-80 transition-all translate-y-[-145%] translate-x-[42%]"
              title="Copy to Clipboard">
              <span className="sr-only">Copy to Clipboard</span>
              <Clipboard size={22} className="block mx-auto" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
