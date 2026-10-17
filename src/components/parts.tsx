"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/motion"

const parts = [
  { name: "Tripod", body: "Three legs. They bite, then they stay." },
  { name: "Tribrach", body: "The screws that bring the bubble home." },
  { name: "Plate", body: "The angle, written in numbers a stranger can read." },
  { name: "Telescope", body: "Thirty times, and a crosshair that locks." },
  { name: "Bubble", body: "Center is the only honest place." },
  { name: "Cell", body: "A week of mornings on one charge." },
]

export const Parts = () => {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const rows = root.querySelectorAll<HTMLElement>("[data-part]")
    const rail = root.querySelector<HTMLElement>("[data-rail]")
    if (!rail) return

    if (prefersReducedMotion()) {
      rows.forEach((row) => row.classList.add("is-lit"))
      rail.style.transform = "scaleY(1)"
      return
    }

    const context = gsap.context(() => {
      gsap.to(rail, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 65%",
          end: "bottom 40%",
          scrub: 0.5,
        },
      })

      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0.35, y: 18 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: row,
              start: "top 80%",
              end: "top 55%",
              scrub: 0.4,
            },
          },
        )
      })
    }, root)

    return () => context.revert()
  }, [])

  return (
    <section id="parts" ref={rootRef} className="border-t border-white/10 px-5 py-24 md:py-32" aria-labelledby="parts-heading">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <h2 id="parts-heading" className="max-w-[10ch] text-4xl font-medium tracking-[-0.04em] text-text md:text-5xl">
          Six pieces. One setup.
        </h2>
        <div className="relative">
          <span
            data-rail
            className="absolute bottom-2 left-0 top-2 w-px origin-top scale-y-0 bg-mark"
            aria-hidden="true"
          />
          <ul>
            {parts.map((part, index) => (
              <li key={part.name} data-part className="border-b border-white/10 py-6 pl-6">
                <div className="flex items-baseline justify-between gap-6">
                  <h3 className="text-xl tracking-tight text-text">{part.name}</h3>
                  <span className="text-sm tabular-nums text-faint">0{index + 1}</span>
                </div>
                <p className="mt-2 max-w-[42ch] text-[16px] leading-7 text-muted">{part.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
