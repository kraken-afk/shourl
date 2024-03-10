import { ShortUrlProvider } from "@/providers/short-url-provider";
import { Input, ShortUrl } from "./components";

export default async function Home() {

  return (
    <main className="max-w-screen-md mx-auto p-4">
      <h1 className="text-[#7aa2f7] my-8 font-bold text-4xl text-center">
        URL Shortener
      </h1>
      <ShortUrlProvider>
        <section className="flex items-center flex-col shadow-lg justify-center p-4 sm:p-6 space-y-8 bg-[#24283b]">
          <h2 className="text-xl">Paste the URL to be shortened</h2>
          <Input />
          <small className="text-[#ffc777]">URL will expire in 24 hours</small>
        </section>
        <ShortUrl />
      </ShortUrlProvider>
    </main>
  );
}
