import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  debug: true,
  providers: [
    {
      id: "fisa",
      name: "FISA",
      type: "oauth",
      issuer: "http://localhost:9000",
      authorization: {
        url: "http://localhost:9000/oauth2/authorize",
        params: {
          scope: "openid profile email",
          response_type: "code",
        },
      },
      token: "http://localhost:9000/oauth2/token",
      userinfo: "http://localhost:8080/userinfo",
      clientId: process.env.AUTH_FISA_ID,
      clientSecret: process.env.AUTH_FISA_SECRET,
      checks: ["pkce", "state"],
    },
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token; // Resource Server 호출용
        token.role = (profile as any)?.role;
        token.id = (profile as any)?.sub;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.user.id = token.id as string;
      session.user.role = token.role as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
