import { redis } from "@/libs/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Redirect({
  params: { id },
}: { params: { id: string } }) {
  const val = await redis.get(id);
  if (val) redirect(val as string);

  return (
    <main className="w-full h-dvh flex flex-col justify-center items-center">
      <h1 className="text-3xl">
        You&apos;re link is expired or doesn&apos;t exist
      </h1>
      <Link
        href="/"
        className="mt-6 underline text-[#ff9e64] cursor-pointer hover:opacity-95">
        Back to the mainpage
      </Link>
    </main>
  );
}
