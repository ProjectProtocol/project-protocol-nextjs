import { NextRequest } from "next/server";
import { updateSession } from "./lib/session";

export async function middleware(request: NextRequest) {
  console.log("updating session");
  return await updateSession(request);
}
