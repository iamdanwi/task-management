import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name?: string | null;
      organizationId: string;
      image?: string | null;
    }
  }

  interface User {
    id: string;
    email: string;
    name?: string | null;
    organizationId: string;
    image?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: string;
    organizationId: string;
    email?: string | null;
    name?: string | null;
    image?: string | null;
  }
}
