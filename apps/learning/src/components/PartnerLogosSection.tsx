type Partner = {
  name: string
  logo: string
}

type PartnerLogosSectionProps = {
  partners: readonly Partner[]
}

export function PartnerLogosSection({ partners }: PartnerLogosSectionProps) {
  const topRowPartners = [...partners, ...partners]
  const bottomRowPartners = [...partners].reverse()
  const loopedBottomRowPartners = [...bottomRowPartners, ...bottomRowPartners]

  return (
    <section className="mt-8 mb-20 overflow-hidden py-12 md:py-16">
      {/* <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.08em] text-secondary">
          Trusted by learners and teams from
        </p>
      </div> */}

      <div className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 overflow-hidden">
        {/* Top Row: anchored left, overflows right */}
        <div className="partner-marquee mb-6">
          <div className="flex w-full justify-start pl-[max(1rem,calc((100vw-80rem)/2))]">
            <div
              className="partner-marquee-track items-center gap-8 md:gap-12 lg:gap-16"
              style={{ animationDirection: 'reverse' }}
              aria-label="Partner logos"
            >
              {topRowPartners.map((partner, index) => (
                <img
                  key={`${partner.name}-${index}`}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-8 shrink-0 object-contain transition-opacity hover:opacity-75 md:h-12"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row: anchored right, overflows left */}
        <div className="partner-marquee opacity-50 grayscale">
          <div className="flex w-full justify-end pr-[max(1rem,calc((100vw-80rem)/2))]">
            <div
              className="partner-marquee-track items-center gap-8 md:gap-12 lg:gap-16"
              aria-label="Muted partner logos"
            >
              {loopedBottomRowPartners.map((partner, index) => (
                <img
                  key={`${partner.name}-muted-${index}`}
                  src={partner.logo}
                  alt={partner.name}
                  className="h-7 shrink-0 object-contain md:h-12"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
