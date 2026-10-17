"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import { MeridianMark } from "@/components/meridian-mark"
import { gsap, prefersReducedMotion } from "@/lib/motion"

const columns = [
  {
    title: "Instrument",
    links: [
      { href: "/instrument", label: "The Meridian 4" },
      { href: "/plate", label: "The plate" },
      { href: "/parts", label: "Parts" },
      { href: "/request", label: "Request a unit" },
    ],
  },
  {
    title: "Field",
    links: [
      { href: "/day", label: "A morning on lot 12" },
      { href: "/notes", label: "Notes on the stake" },
      { href: "/crew", label: "How a crew uses it" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: "mailto:studio@meridian.field", label: "studio@meridian.field" },
      { href: "/runs", label: "Small runs" },
    ],
  },
]

export const SiteFooter = () => {
  const rootRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const columns = root.querySelectorAll<HTMLElement>("[data-col]")
    const context = gsap.context(() => {
      gsap.from(columns, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 90%",
        },
      })
    }, root)

    return () => context.revert()
  }, [])

  return (
    <footer ref={rootRef} className="border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-4">
        <div data-col>
          <p className="text-sm font-medium text-text">Meridian</p>
          <p className="mt-3 max-w-[22ch] text-sm leading-6 text-muted">
            Site levels for crews who hand the stake to someone else.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title} data-col>
            <p className="text-sm text-faint">{column.title}</p>
            <ul className="mt-4 space-y-3">
              {column.links.map((link) => {
                const isMail = link.href.startsWith("mailto:")
                const isCurrent = pathname === link.href
                const tone = isCurrent ? "font-medium text-mark" : "text-muted hover:text-text"

                return (
                  <li key={link.label}>
                    {isMail ? (
                      <a href={link.href} className="text-sm text-muted transition-colors hover:text-text">
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`text-sm transition-colors ${tone}`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-6xl px-5 pb-4">
        <MeridianMark />
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Meridian</p>
          <p>Built for the next person on the stake.</p>
        </div>
      </div>
    </footer>
  )
}
