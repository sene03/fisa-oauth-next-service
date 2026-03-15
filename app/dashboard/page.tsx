import { auth, signOut } from "@/auth"

async function fetchFromResource<T>(path: string, accessToken: string): Promise<T | null> {
  try {
    const res = await fetch(`http://localhost:8080${path}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

interface Profile {
  subject: string
  email: string
  username: string
  status: string
  message: string
  scopes: string[]
}

interface Posts {
  posts: unknown
}

interface Data {
  data: unknown
}

export default async function DashboardPage() {
  const session = await auth()
  const accessToken = session?.accessToken

  const [profile, posts, data] = await Promise.all([
    accessToken ? fetchFromResource<Profile>("/api/profile", accessToken) : null,
    accessToken ? fetchFromResource<Posts>("/api/posts", accessToken) : null,
    accessToken ? fetchFromResource<Data>("/api/data", accessToken) : null,
  ])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto space-y-6">

        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">
            안녕하세요, {profile?.username ?? "사용자"}님 👋
          </h1>
          <form
            action={async () => {
              "use server"
              await signOut({ redirectTo: "/login" })
            }}
          >
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
            >
              로그아웃
            </button>
          </form>
        </div>

        {/* 프로필 카드 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h2 className="text-lg font-semibold text-gray-700">👤 프로필</h2>
          {profile ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-24 text-sm text-gray-400">이름</span>
                <span className="text-gray-800 font-medium">{profile.username}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-24 text-sm text-gray-400">이메일</span>
                <span className="text-gray-800">{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-24 text-sm text-gray-400">Subject</span>
                <span className="text-gray-500 text-sm font-mono">{profile.subject}</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-24 text-sm text-gray-400 pt-0.5">스코프</span>
                <div className="flex flex-wrap gap-2">
                  {profile.scopes.map((scope) => (
                    <span
                      key={scope}
                      className="px-2 py-0.5 text-xs font-medium bg-blue-50 text-blue-600 rounded-full border border-blue-100"
                    >
                      {scope}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mt-2 p-3 bg-green-50 rounded-lg text-sm text-green-700">
                ✅ {profile.message}
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-400">프로필 정보를 불러올 수 없습니다.</p>
          )}
        </div>

        {/* 게시글 카드 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">📝 게시글 목록</h2>
          {posts ? (
            <pre className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 overflow-auto">
              {JSON.stringify(posts, null, 2)}
            </pre>
          ) : (
            <p className="text-sm text-gray-400">목록이 비어있습니다.</p>
          )}
        </div>

        {/* 비즈니스 데이터 카드 */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-3">
          <h2 className="text-lg font-semibold text-gray-700">📊 비즈니스 데이터</h2>
          {data ? (
            <pre className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          ) : (
            <p className="text-sm text-gray-400">데이터가 없습니다.</p>
          )}
        </div>

      </div>
    </div>
  )
}
