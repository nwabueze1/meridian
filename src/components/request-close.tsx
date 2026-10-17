"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/motion"

const asks = [
  "The site, and whether the ground is soft.",
  "The week you need it on the stake.",
  "How many crews will share the one setup.",
]

export const RequestClose = () => {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const lines = root.querySelectorAll<HTMLElement>("[data-ask]")
    const context = gsap.context(() => {
      gsap.from(lines, {
        x: -16,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
        },
      })
    }, root)

    return () => context.revert()
  }, [])

  return (
    <section id="request" ref={rootRef} className="px-5 py-24 md:py-32" aria-labelledby="request-heading">
      <div className="mx-auto grid max-w-6xl gap-12 border-t border-white/10 pt-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end">
        <div>
          <h2 id="request-heading" className="max-w-[12ch] text-4xl font-medium tracking-[-0.04em] text-text md:text-5xl">
            Request a unit.
          </h2>
          <p className="mt-4 max-w-[36ch] text-[17px] leading-7 text-muted">
            We build them in small runs. Write with the site and the week you need it.
          </p>
          <a
            href="mailto:studio@meridian.field"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-mark px-6 text-sm font-medium text-[#10140a] transition-opacity hover:opacity-90"
          >
            Write to the studio
          </a>
        </div>
        <ul className="space-y-4">
          {asks.map((ask) => (
            <li key={ask} data-ask className="border-b border-white/10 pb-4 text-[16px] leading-7 text-muted">
              {ask}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
