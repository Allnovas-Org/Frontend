import { Outlet } from 'react-router-dom'
import { AllNovaFooter } from '../components/AllNovaFooter.tsx'
import { LandingNavbar } from '../components/LandingNavbar.tsx'

export function PublicLayout() {
  return (
    <div className="pt-5">
      <div className="mx-auto w-[min(1120px,94vw)] pb-10">
        <LandingNavbar />

        <main className="mt-5">
          <Outlet />
        </main>
      </div>

      <AllNovaFooter />
    </div>
  )
}
