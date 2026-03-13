import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div>
      <h1>로그인 페이지</h1>
      <form
        action={async () => {
          "use server"
          await signIn("fisa", { redirectTo: "/dashboard" })
        }}
      >
        <button type="submit">FISA로 로그인</button>
      </form>
    </div>
  )
}