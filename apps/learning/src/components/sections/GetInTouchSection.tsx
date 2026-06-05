import type { FormEvent } from 'react'
import { Button } from '../../shared/ui/index.ts'

export function GetInTouchSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
		<section className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 pt-16">
			<div className="mx-auto max-w-3xl overflow-hidden p-8">
				<div className="space-y-4 text-center">
					<h2 className="m-0 font-display text-2xl font-semibold text-secondary md:text-5xl">
						Get In touch
					</h2>
					<p className="m-0 text-center text-xl text-secondary">
						Have questions, feedback, or partnership ideas? We'd love to hear
						from you.
					</p>
				</div>

				<form onSubmit={handleSubmit} className=" p-6 md:p-8">
					<div className="">
						<label className="block mb-3">
							{/* <span className="mb-2.5 block text-sm font-semibold text-neutral-700">
								Full Name
							</span> */}
							<input
								type="text"
								name="fullName"
								placeholder="Enter your full name"
								className="w-full rounded-[11px] border border-neutral-600 px-3.5 py-3 text-sm text-neutral-900 outline-none transition-colors focus:border-primary"
							/>
						</label>

						<label className="block mb-3">
							{/* <span className="mb-1.5 block text-sm font-semibold text-neutral-900">
								Email
							</span> */}
							<input
								type="email"
								name="email"
								placeholder="Enter your email"
								className="w-full rounded-[11px] border border-neutral-600 px-3.5 py-3 text-sm text-neutral-900 outline-none transition-colors focus:border-primary"
							/>
						</label>

						<label className="block mb-3">
							{/* <span className="mb-1.5 block text-sm font-semibold text-neutral-900">
								Subject
							</span> */}
							<input
								type="text"
								name="subject"
								placeholder="What would you like to discuss?"
								className="w-full rounded-[11px] border border-subtle bg-surface px-3.5 py-3 text-sm text-neutral-900 outline-none transition-colors focus:border-primary"
							/>
						</label>

						<label className="block md:col-span-2">
							{/* <span className="mb-1.5 block text-sm font-semibold text-neutral-900">
								Message
							</span> */}
							<textarea
								name="message"
								rows={6}
								placeholder="Share a few details so we can point you in the right direction."
								className="w-full resize-y rounded-[11px] border border-neutral-600 px-3.5 py-3 text-sm text-neutral-900 outline-none transition-colors focus:border-primary"
							/>
						</label>
					</div>

					<Button
						type="submit"
						size="lg"
						className="mt-6 min-w-40 rounded-none"
					>
						Send Message
					</Button>
				</form>
			</div>
		</section>
	);
}