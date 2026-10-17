"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    number: "1",
    title: "Set the tripod",
    body: "The legs bite. The bubble comes home and stays there.",
  },
  {
    number: "2",
    title: "Take the reading",
    body: "Two arcseconds on the plate. The number does not drift while you look away.",
  },
  {
    number: "3",
    title: "Leave it on the stake",
    body: "The next person starts from your mark, not from a guess.",
  },
]

export const Crew = () => {
  const listRef = useRef<HTMLOListElement>(null)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const items = Array.from(list.querySelectorAll<HTMLLIElement>("[data-step]"))
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      items.forEach((item) => item.classList.add("is-lit"))
      return
    }

    const context = gsap.context(() => {
      items.forEach((item) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 78%",
          toggleClass: { targets: item, className: "is-lit" },
        })
      })
    }, list)

    return () => context.revert()
  }, [])

  return (
    <section id="crew" className="border-t border-white/10" aria-labelledby="crew-heading">
      <div className="mx-auto grid max-w-6xl gap-16 px-5 py-24 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:py-32">
        <div>
          <h2 id="crew-heading" className="max-w-[12ch] text-3xl font-medium tracking-[-0.03em] text-text md:text-4xl">
            Three moves, then the stake can wait.
          </h2>
        </div>
        <div className="relative">
          <span className="absolute bottom-4 left-[15px] top-4 w-px bg-white/10" aria-hidden="true" />
          <ol ref={listRef} className="space-y-16">
          {steps.map((step) => (
            <li key={step.number} data-step className="relative grid grid-cols-[32px_minmax(0,1fr)] gap-5">
              <span className="stake relative z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-ink text-xs text-muted">
                {step.number}
              </span>
              <div className="max-w-[36ch]">
                <h3 className="text-xl tracking-tight text-text">{step.title}</h3>
                <p className="mt-2 text-[16px] leading-7 text-muted">{step.body}</p>
              </div>
            </li>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
