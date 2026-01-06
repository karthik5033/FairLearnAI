import Link from "next/link";

export default function TeacherDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl">Teacher dashboard</h1>
          <p className="text-sm text-zinc-600">
            Monitor AI usage, tune classroom rules, and track learning progress.
          </p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/login/teacher"
            className="inline-flex h-10 items-center justify-center rounded-lg border bg-white px-4 text-sm font-medium text-zinc-900 shadow-sm transition-colors hover:bg-zinc-50"
          >
            Switch account
          </Link>
          <Link
            href="/"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-zinc-800"
          >
            Back to home
          </Link>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-zinc-900">
            AI prompt filtering
          </div>
          <p className="mt-2 text-sm text-zinc-600">
            Safety and fairness rules applied to student prompts.
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-zinc-500">Status</span>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
              Enabled
            </span>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-zinc-900">
            Adaptive quizzes
          </div>
          <p className="mt-2 text-sm text-zinc-600">
            Practice adjusts by mastery level with consistent grading.
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-zinc-500">This week</span>
            <span className="text-sm font-semibold text-zinc-900">24</span>
          </div>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="text-sm font-medium text-zinc-900">
            Teacher controls
          </div>
          <p className="mt-2 text-sm text-zinc-600">
            Set classroom rules for citation, allowed tools, and tone.
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xs text-zinc-500">Rule sets</span>
            <span className="text-sm font-semibold text-zinc-900">3</span>
          </div>
        </div>
      </section>

      <section className="rounded-xl border bg-white shadow-sm">
        <div className="border-b px-5 py-4">
          <h2 className="text-sm font-semibold text-zinc-900">Recent flags</h2>
          <p className="mt-1 text-sm text-zinc-600">
            A quick view of prompts that may need review.
          </p>
        </div>
        <div className="divide-y">
          <div className="flex items-start justify-between gap-4 px-5 py-4">
            <div>
              <div className="text-sm font-medium text-zinc-900">
                Potential plagiarism request
              </div>
              <div className="mt-1 text-sm text-zinc-600">
                &quot;Write my essay for me&quot; — blocked by policy.
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
              Blocked
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 px-5 py-4">
            <div>
              <div className="text-sm font-medium text-zinc-900">
                Biased framing
              </div>
              <div className="mt-1 text-sm text-zinc-600">
                Suggest rephrasing and require sources.
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
              Review
            </span>
          </div>
          <div className="flex items-start justify-between gap-4 px-5 py-4">
            <div>
              <div className="text-sm font-medium text-zinc-900">
                Unsafe content
              </div>
              <div className="mt-1 text-sm text-zinc-600">
                Automatically filtered for student safety.
              </div>
            </div>
            <span className="shrink-0 rounded-full bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-700">
              Filtered
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
