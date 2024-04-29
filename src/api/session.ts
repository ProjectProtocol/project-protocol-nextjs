import { AxiosResponse } from "axios";
import apiClient from "./client";

export async function reauthenticate({ token }: { token: string }) {
  const result = await apiClient
    .get("/auth/reauthenticate", { headers: { Cookie: `jwt=${token}` } })
    .catch((e) => e.response);

  return result;
}

export async function create(
  email: string,
  password: string
): Promise<AxiosResponse> {
  const result = await apiClient
    .post("/auth/sign_in", {
      email,
      password,
    })
    .catch((e) => e.response);

  return result;
}

export async function destroy() {
  const res = await apiClient.delete("/auth/sign_out");
  return res;
}
