import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/allnova-logo.png'

const landingHeaderLinks = [
  { title: "Paths", url: "/courses" },
  { title: "Features", url: "/features" },
  { title: "How It Works", url: "/how-it-works" },
  
  { title: "About Us", url: "/about" },
] as const;

export function LandingNavbar() {
  const [openMobileNav, setOpenMobileNav] = useState(false)

  const toggleMobileNav = () => {
    setOpenMobileNav((prev) => !prev)
  }

  const closeMobileNav = () => {
    setOpenMobileNav(false)
  }

  return (
    <header className="rounded-[18px] px-4 py-3 md:px-5 md:py-3.5">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between" aria-label="Primary navigation">
        <Link to="/" className="shrink-0" aria-label="Allnova Learning home" onClick={closeMobileNav}>
          <img src={logo} alt="Allnova Logo" className="h-9 w-auto md:h-10" />
        </Link>

        <ul className="hidden items-center gap-7 lg:gap-10 md:flex">
          {landingHeaderLinks.map((link) => (
            <li key={link.title} className="cursor-pointer">
              <NavLink
                to={link.url}
                className={({ isActive }) =>
                  isActive
                    ? 'font-semibold text-primary transition-colors'
                    : 'font-semibold text-neutral-900 transition-colors hover:text-secondary'
                }
              >
                {link.title}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2.5 md:flex">
          <NavLink
            to="/signin"
            className="bg-primary p-4 text-lg font-semibold text-neutral-50 transition-colors hover:bg-primary"
          >
            Start Learning
          </NavLink>
        </div>

        <button
          type="button"
          onClick={toggleMobileNav}
          className="grid h-10 w-10 place-items-center rounded-[10px] border border-subtle text-neutral-900 transition-colors hover:bg-surface-soft md:hidden"
          aria-label="Toggle mobile menu"
          aria-expanded={openMobileNav}
        >
          {openMobileNav ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {openMobileNav ? (
        <nav className="mt-3 border-t border-subtle pt-3 md:hidden" aria-label="Mobile navigation">
          <ul className="flex flex-col gap-1.5">
            {landingHeaderLinks.map((link) => (
              <li key={link.title}>
                <NavLink
                  to={link.url}
                  onClick={closeMobileNav}
                  className={({ isActive }) =>
                    isActive
                      ? 'block rounded-[10px] bg-primary/10 px-3.5 py-2.5 font-semibold text-primary'
                      : 'block rounded-[10px] px-3.5 py-2.5 font-semibold text-neutral-900 transition-colors hover:bg-surface-soft'
                  }
                >
                  {link.title}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <NavLink
              to="/signin"
              onClick={closeMobileNav}
              className="rounded-[10px] bg-primary border border-primary px-3 py-2 text-center text-sm font-semibold text-neutral-900"
            >
              Start Learning
            </NavLink>
            {/* <NavLink
              to="/dashboard"
              onClick={closeMobileNav}
              className="rounded-[10px] bg-primary px-3 py-2 text-center text-sm font-semibold text-white"
            >
              Get Started
            </NavLink> */}
          </div>
        </nav>
      ) : null}
    </header>
  )
}
