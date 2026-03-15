import { DefaultSession } from "next-auth";
import { handlers } from "@/auth";
export const { GET, POST } = handlers;

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}
