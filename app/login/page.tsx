import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-sm space-y-8">

        {/* 로고 / 타이틀 */}
        <div className="text-center space-y-2">
          <div className="text-4xl">🔐</div>
          <h1 className="text-2xl font-bold text-gray-800">FISA OAuth</h1>
          <p className="text-sm text-gray-400">계속하려면 로그인하세요</p>
        </div>

        {/* 로그인 버튼 */}
        <form
          action={async () => {
            "use server"
            await signIn("fisa", { redirectTo: "/dashboard" })
          }}
        >
          <button
            type="submit"
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold rounded-xl transition-colors text-sm"
          >
            FISA 계정으로 로그인
          </button>
        </form>

      </div>
    </div>
  )
}
