"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/motion"

const specs = [
  { value: "2″", label: "Held on the plate" },
  { value: "30×", label: "Through the telescope" },
  { value: "1.1 kg", label: "Head, on the shoulder" },
  { value: "7 days", label: "Between charges" },
  { value: "−20°", label: "Still honest in the cold" },
  { value: "50°", label: "And in the hard sun" },
]

export const PlateSection = () => {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const degrees = root.querySelector<HTMLElement>("[data-degrees]")
    const minutes = root.querySelector<HTMLElement>("[data-minutes]")
    const seconds = root.querySelector<HTMLElement>("[data-seconds]")
    const rule = root.querySelector<HTMLElement>("[data-rule]")
    const cards = root.querySelectorAll<HTMLElement>("[data-spec]")
    if (!degrees || !minutes || !seconds || !rule) return

    if (prefersReducedMotion()) {
      degrees.textContent = "184"
      minutes.textContent = "12"
      seconds.textContent = "20"
      rule.style.transform = "scaleX(1)"
      return
    }

    const context = gsap.context(() => {
      gsap.to(rule, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "center 40%",
          scrub: 0.6,
        },
      })

      ScrollTriggerSafe(root, degrees, minutes, seconds)

      gsap.from(cards, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cards[0],
          start: "top 88%",
        },
      })
    }, root)

    return () => context.revert()
  }, [])

  return (
    <section id="plate" ref={rootRef} className="px-5 py-24 md:py-32" aria-labelledby="plate-heading">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-end gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div>
            <h2 id="plate-heading" className="max-w-[12ch] text-4xl font-medium tracking-[-0.04em] text-text md:text-5xl">
              The number stays put.
            </h2>
            <p className="mt-5 max-w-[36ch] text-[17px] leading-7 text-muted">
              A crew can leave for coffee. The plate still holds the angle when they come back.
            </p>
          </div>
          <p className="text-6xl font-medium tracking-[-0.05em] text-text tabular-nums md:text-8xl">
            <span data-degrees>0</span>
            <span className="text-mark">°</span> <span data-minutes>00</span>
            <span className="text-muted">′</span> <span data-seconds>00</span>
            <span className="text-muted">″</span>
          </p>
        </div>
        <div className="relative mt-12 border-t border-white/10 pt-10">
          <span
            data-rule
            className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-mark"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {specs.map((spec) => (
              <li
                key={spec.label}
                data-spec
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
              >
                <p className="text-2xl tracking-tight text-text">{spec.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{spec.label}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

const ScrollTriggerSafe = (
  root: HTMLElement,
  degrees: HTMLElement,
  minutes: HTMLElement,
  seconds: HTMLElement,
) => {
  const state = { progress: 0 }
  gsap.to(state, {
    progress: 1,
    ease: "none",
    scrollTrigger: {
      trigger: root,
      start: "top 70%",
      end: "bottom 45%",
      scrub: 0.4,
    },
    onUpdate: () => {
      degrees.textContent = String(Math.round(184 * state.progress))
      minutes.textContent = String(Math.round(12 * state.progress)).padStart(2, "0")
      seconds.textContent = String(Math.round(20 * state.progress)).padStart(2, "0")
    },
  })
}
