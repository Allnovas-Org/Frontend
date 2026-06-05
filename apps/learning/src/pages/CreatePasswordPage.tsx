import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeOff, Eye } from 'lucide-react'
import { AuthLayout } from '../components/auth/AuthLayout.tsx'

export function CreatePasswordPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/signin')
  }

  return (
    <AuthLayout>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Create a new Password</h2>
        <p className="mt-2 text-sm text-slate-400">Let us sign you in</p>
      </div>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="Enter your Password"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-400 placeholder:text-slate-300 transition-all focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-400"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <Eye size={20} strokeWidth={1.5} /> : <EyeOff size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-700">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              required
              placeholder="Re-enter your Password"
              className="w-full rounded-lg border border-slate-200 px-4 py-3 text-slate-400 placeholder:text-slate-300 transition-all focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-400"
              aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
            >
              {showConfirmPassword ? <Eye size={20} strokeWidth={1.5} /> : <EyeOff size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-xl bg-[#6B11B0] py-4 text-sm font-bold text-white transition-all hover:bg-[#5a0e94] active:scale-[0.98]"
        >
          Continue
        </button>
      </form>
    </AuthLayout>
  )
}
