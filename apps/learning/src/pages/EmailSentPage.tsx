import { useNavigate } from 'react-router-dom'
import { MailCheck } from 'lucide-react'
import { AuthLayout } from '../components/auth/AuthLayout.tsx'

export function EmailSentPage() {
  const navigate = useNavigate()

  return (
    <AuthLayout>
      <div className="py-10 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-orange-50 text-[#F08E6E]">
          <MailCheck size={48} />
        </div>
        <h2 className="text-2xl font-bold">Email Sent</h2>
        <p className="mt-2 text-sm text-slate-500">Check your mail</p>
        <button
          type="button"
          onClick={() => navigate('/create-password')}
          className="mt-10 w-full rounded-lg bg-[#6B11B0] py-3.5 font-bold text-white"
        >
          Continue
        </button>
      </div>
    </AuthLayout>
  )
}
