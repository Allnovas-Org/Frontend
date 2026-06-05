import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { EyeOff, Eye } from 'lucide-react'
import { AuthLayout } from '../components/auth/AuthLayout.tsx'

export function SignInPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate('/dashboard')
  }

  return (
		<AuthLayout>
			<div className="text-center">
				<h2 className="text-2xl font-bold text-slate-900">
					Sign In to Allnova
				</h2>
				<p className="mt-2 text-sm text-slate-400">
					Continue your learning journey
				</p>
			</div>

			<div className="mt-8 space-y-3">
				<button
					className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 py-3 font-medium transition hover:bg-slate-50"
					type="button"
				>
					<img src="/google.png" alt="Google logo" className="h-5 w-5" />
					Continue with Google
				</button>
				<button
					className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 py-3 font-medium transition hover:bg-slate-50"
					type="button"
				>
					<img src="/linkedin.png" alt="LinkedIn logo" className="h-5 w-5" />
					Continue with LinkedIn
				</button>
			</div>

			<div className="relative my-8 text-center text-sm">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t border-slate-100" />
				</div>
				<span className="relative bg-white px-4 text-slate-400">
					or sign in with email
				</span>
			</div>

			<form className="space-y-5" onSubmit={handleSubmit}>
				<div className="space-y-2">
					<label className="block text-sm font-medium text-slate-700">
						Email
					</label>
					<input
						type="email"
						required
						placeholder="Adeyemoaduke@gmail.com"
						className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition-all focus:border focus:ring-1 focus:ring-primary"
					/>
				</div>

				<div className="space-y-2">
					<label className="block text-sm font-medium text-slate-700">
						Password
					</label>
					<div className="relative">
						<input
							type={showPassword ? "text" : "password"}
							required
							placeholder="Enter your password"
							className="w-full rounded-lg border border-slate-200 px-4 py-3 outline-none transition-all focus:border focus:ring-1 focus:ring-primary"
						/>
						<button
							type="button"
							onClick={() => setShowPassword(!showPassword)}
							className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
							aria-label={showPassword ? "Hide password" : "Show password"}
						>
							{showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
						</button>
					</div>
				</div>

				<div className="flex items-center justify-between py-1">
					<label className="flex cursor-pointer items-center gap-2">
						<input
							type="checkbox"
							className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
						/>
						<span className="text-xs font-medium text-slate-600">
							Keep me logged in
						</span>
					</label>
					<Link
						to="/forgot-password"
						className="text-xs font-bold text-primary hover:underline"
					>
						Forgot Password?
					</Link>
				</div>

				<button
					type="submit"
					className="w-full rounded-xl bg-primary py-4 text-sm font-bold text-white transition-all hover:bg-primary active:scale-[0.98]"
				>
					Continue
				</button>
			</form>

			<p className="mt-8 text-center text-sm text-slate-600">
				Do not have an account?{" "}
				<Link to="/signup" className="font-bold text-primary hover:underline">
					Sign up
				</Link>
			</p>
		</AuthLayout>
	);
}
