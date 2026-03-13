import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

// 더미 유저 (나중에 실제 Auth Server로 교체)
const DUMMY_USERS = [
  { id: "uuid-user-0001",  name: "testuser",  email: "test@example.com",  role: "USER" },
  { id: "uuid-admin-0001", name: "adminuser", email: "admin@example.com", role: "ADMIN" },
]

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: { label: "아이디" },
        password: { label: "비밀번호", type: "password" },
      },
      authorize(credentials) {
        // Mock: 비밀번호는 아무거나 입력해도 통과
        const user = DUMMY_USERS.find(u => u.name === credentials.username)
        return user ?? null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // 최초 로그인 시 user 정보 token에 저장
      if (user) {
        token.id = user.id
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id as string
      session.user.role = token.role as string
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
})