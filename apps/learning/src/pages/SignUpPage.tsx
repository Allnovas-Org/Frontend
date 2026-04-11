import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeOff, Eye } from 'lucide-react'
import { AuthLayout } from '../components/auth/AuthLayout.tsx'

export function SignUpPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Start your Tech journey with Allnova</h2>
        <p className="mt-2 text-sm text-slate-500">Build skills and become job-ready</p>
      </div>

      <div className="mt-8 space-y-3">
        <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 py-3 font-medium transition hover:bg-slate-50" type="button">
          <img src="/google.png" alt="Google logo" className="h-5 w-5" />
          Continue with Google
        </button>
        <button className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 py-3 font-medium transition hover:bg-slate-50" type="button">
          <img src="/linkedin.png" alt="LinkedIn logo" className="h-5 w-5" />
          Continue with LinkedIn
        </button>
      </div>

      <div className="relative my-8 text-center text-sm">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-slate-200" />
        </div>
        <span className="relative bg-white px-4 text-slate-400">or sign up with email</span>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            required
            placeholder="Adeyemoaduke@gmail.com"
            className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-1 focus:ring-primary"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Enter password"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              placeholder="Confirm password"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none ring-1 ring-slate-200 focus:ring-1 focus:ring-primary"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
        </div>

        <button className="w-full rounded-lg bg-primary py-3.5 text-white transition hover:bg-primary" type="submit">
          Continue
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{' '}
        <Link to="/signin" className="font-bold text-[#6B11B0] hover:underline">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  )
}
