import Api from "@/lib/api";
import { getSession } from "@/lib/session";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const session = await getSession();

  const res = await new Api(session?.apiToken).get(
    "/resources" + request.nextUrl.search
  );

  if (!res.ok) {
    return Response.error();
  }

  const body = await res.json();

  return Response.json(body);
}
