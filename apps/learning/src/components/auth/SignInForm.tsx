import type { FormEvent } from 'react'
import { Button } from '../../shared/ui/index.ts'

export function SignInForm() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md rounded-2xl border border-subtle bg-surface p-6 shadow-soft md:p-8"
    >
      <h2 className="m-0 text-center font-display text-3xl font-semibold text-neutral-900">Welcome Back</h2>
      <p className="mb-6 mt-2 text-center text-secondary">Please sign in to continue learning.</p>

      <Button type="button" variant="ghost" fullWidth className="mb-4">
        Continue with Google
      </Button>

      <p className="mb-4 text-center text-sm text-secondary">or sign in with email</p>

      <div className="space-y-4">
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-neutral-900">Email</span>
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="w-full rounded-[11px] border border-subtle bg-surface-elevated px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:ring-1 focus:ring-primary"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold text-neutral-900">Password</span>
          <input
            type="password"
            required
            placeholder="Enter your password"
            className="w-full rounded-[11px] border border-subtle bg-surface-elevated px-3.5 py-2.5 text-sm text-neutral-900 outline-none transition-colors focus:ring-1 focus:ring-primary"
          />
        </label>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3 text-sm">
        <label className="inline-flex items-center gap-2 text-secondary">
          <input type="checkbox" className="h-4 w-4 rounded border-subtle" />
          Remember me
        </label>
        <button type="button" className="font-semibold text-primary">
          Forgot Password?
        </button>
      </div>

      <Button type="submit" fullWidth className="mt-6">
        Continue
      </Button>

      <p className="mt-4 text-center text-sm text-secondary">
        Don&apos;t have an account? <button type="button" className="font-semibold text-primary">Sign up</button>
      </p>
    </form>
  )
}
