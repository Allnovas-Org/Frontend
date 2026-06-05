import { useNavigate } from 'react-router-dom'
import { Button } from '../shared/ui/index.ts'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <section className="rounded-[20px] border border-subtle bg-surface-elevated p-6 shadow-soft">
      <p className="m-0 text-[0.78rem] font-bold uppercase tracking-[0.08em] text-primary">404</p>
      <h1 className="mb-3 mt-2 font-display text-[clamp(1.9rem,4vw,3.1rem)] font-bold tracking-[-0.02em]">
        Page not found
      </h1>
      <p className="m-0 max-w-[68ch] text-secondary">
        The page you requested does not exist or has moved.
      </p>

      <div className="mt-5">
        <Button variant="primary" onClick={() => navigate('/')}>
          Return home
        </Button>
      </div>
    </section>
  )
}
