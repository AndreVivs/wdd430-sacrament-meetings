import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isCreateRoute =
        nextUrl.pathname === "/meetings/new";

      const isEditRoute =
        /^\/meetings\/[^/]+\/edit$/.test(
          nextUrl.pathname
        );

      const isProtected =
        isCreateRoute || isEditRoute;

      if (isProtected) {
        return isLoggedIn;
      }

      if (
        isLoggedIn &&
        nextUrl.pathname === "/login"
      ) {
        return Response.redirect(
          new URL("/meetings", nextUrl)
        );
      }

      return true;
    },
  },

  providers: [],
} satisfies NextAuthConfig;