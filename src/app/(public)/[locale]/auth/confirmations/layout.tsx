import AuthProvider from "@/components/AuthProvider";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
