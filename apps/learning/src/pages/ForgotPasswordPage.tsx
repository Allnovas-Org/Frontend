import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthLayout } from '../components/auth/AuthLayout.tsx'

export function ForgotPasswordPage() {
  const navigate = useNavigate()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/email-sent')
  }

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Forgot Password</h2>
        <p className="mt-2 text-sm text-slate-500">Please enter your registered email ID</p>
      </div>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium">Email</label>
          <input
            type="email"
            required
            placeholder="Adeyemoaduke@gmail.com"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-1 focus:border-primary"
          />
        </div>
        <button type="submit" className="w-full rounded-lg bg-[#6B11B0] py-3.5 font-bold text-white">
          Continue
        </button>
      </form>
    </AuthLayout>
  )
}
