import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const secret = requestHeaders.get("x-contentful-reval-key");
  const tag = request.nextUrl.searchParams.get("tag");

  if (secret !== process.env.CONTENTFUL_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  if (!tag) {
    return NextResponse.json({ message: "Missing tag" }, { status: 400 });
  }

  revalidateTag(tag);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
