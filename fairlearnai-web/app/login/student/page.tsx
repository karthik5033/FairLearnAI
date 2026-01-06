import Link from "next/link";

export default function StudentLoginPage() {
  return (
    <section className="grid place-items-center py-10 sm:py-14">
      <div className="w-full max-w-sm">
        <div className="rounded-xl border bg-white shadow-sm">
          <div className="p-6 sm:p-7">
            <div className="space-y-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900"
              >
                <span className="inline-flex size-8 items-center justify-center rounded-lg border bg-zinc-50">
                  <span className="text-xs font-semibold">FL</span>
                </span>
                FairLearnAI
              </Link>
              <div>
                <h1 className="mt-4 text-xl">Student login</h1>
                <p className="mt-1 text-sm text-zinc-600">
                  Sign in to continue your learning.
                </p>
              </div>
            </div>

            <form className="mt-6 space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="student-email"
                  className="block text-sm font-medium text-zinc-900"
                >
                  Email or Student ID
                </label>
                <input
                  id="student-email"
                  name="email"
                  type="text"
                  autoComplete="username"
                  required
                  placeholder="name@school.edu"
                  className="h-11 w-full rounded-lg border bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-400/30"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="student-password"
                    className="block text-sm font-medium text-zinc-900"
                  >
                    Password
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-zinc-600 underline-offset-4 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <input
                  id="student-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="h-11 w-full rounded-lg border bg-white px-3 text-sm text-zinc-900 shadow-sm outline-none placeholder:text-zinc-400 focus-visible:ring-2 focus-visible:ring-zinc-400/30"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800 focus-visible:outline-none"
              >
                Sign in
              </button>
            </form>
          </div>

          <div className="border-t bg-zinc-50 p-4 text-center text-sm text-zinc-600">
            Are you a teacher?{" "}
            <Link
              href="/login/teacher"
              className="font-medium text-zinc-900 underline-offset-4 hover:underline"
            >
              Teacher login
            </Link>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-500">
          By signing in, you agree to your school’s acceptable use policy.
        </p>
      </div>
    </section>
  );
}
