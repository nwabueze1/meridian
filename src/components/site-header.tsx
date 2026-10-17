"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const links = [
  { href: "/plate", label: "Plate", className: "hidden md:inline" },
  { href: "/day", label: "The day", className: "hidden sm:inline" },
  { href: "/notes", label: "Notes", className: "" },
]

export const SiteHeader = () => {
  const pathname = usePathname()
  const isRequest = pathname === "/request"

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-white/10 bg-ink/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="text-sm font-medium tracking-tight text-text">
          Meridian
        </Link>
        <nav aria-label="Pages" className="flex items-center gap-4 text-sm sm:gap-5">
          {links.map((link) => {
            const isCurrent = pathname === link.href
            const tone = isCurrent ? "text-text" : "text-muted hover:text-text"

            return (
              <Link key={link.href} href={link.href} className={`transition-colors ${tone} ${link.className}`}>
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/request"
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-opacity hover:opacity-90 ${isRequest ? "bg-mark text-[#10140a]" : "bg-text text-ink"}`}
            aria-current={isRequest ? "page" : undefined}
          >
            Request a unit
          </Link>
        </nav>
      </div>
    </header>
  )
}
