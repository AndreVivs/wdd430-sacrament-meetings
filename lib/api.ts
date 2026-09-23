import { headers } from "next/headers";

export async function getBaseUrl(): Promise<string> {
  const headersList = await headers();

  const host: string =
    headersList.get("host") ?? "localhost:3000";

  const forwardedProtocol: string | null =
    headersList.get("x-forwarded-proto");

  const protocol: string =
    forwardedProtocol ??
    (host.startsWith("localhost") ? "http" : "https");

  return `${protocol}://${host}`;
}