import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      id?: string;
      role?: string;
      isActive?: boolean;
    } & DefaultSession["user"];
  }
}
