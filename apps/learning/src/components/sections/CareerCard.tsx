import { Button } from '../../shared/ui/index.ts'

type CareerCardProps = {
  title: string
  description: string
  duration: string
}

export function CareerCard({ title, description, duration }: CareerCardProps) {
  return (
    <article className="flex h-full flex-col rounded-[16px] border border-subtle bg-surface-elevated p-5 shadow-soft">
      <p className="m-0 inline-flex w-fit items-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.06em] text-primary">
        {duration}
      </p>
      <h3 className="mb-0 mt-3 font-display text-xl font-semibold text-neutral-900">{title}</h3>
      <p className="mt-2 flex-1 text-secondary">{description}</p>
      <Button variant="secondary" size="sm" className="mt-4 w-full">
        View Path
      </Button>
    </article>
  )
}
