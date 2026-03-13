import { auth, signOut } from "@/auth"

export default async function DashboardPage() {
  const session = await auth()

  return (
    <div>
      <h1>안녕하세요, {session?.user?.name}님!</h1>
      <p>이메일: {session?.user?.email}</p>
      <p>role: {session?.user?.role}</p>
      <form
        action={async () => {
          "use server"
          await signOut({ redirectTo: "/login" })
        }}
      >
        <button type="submit">로그아웃</button>
      </form>
    </div>
  )
}
