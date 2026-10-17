"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/motion"

const stations = [
  {
    time: "6:10",
    title: "Set on the corner",
    body: "The east side is soft. The legs go wider than the case suggests.",
  },
  {
    time: "6:40",
    title: "The plate holds",
    body: "184° 12′ 20″. North face. Nobody writes it on a glove.",
  },
  {
    time: "8:05",
    title: "The next crew arrives",
    body: "They start from the plate. They do not set up again.",
  },
  {
    time: "11:40",
    title: "Stowed",
    body: "The head comes off. The stake keeps the mark.",
  },
]

export const DayLog = () => {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const rail = root.querySelector<HTMLElement>("[data-rail]")
    const clock = root.querySelector<HTMLElement>("[data-clock]")
    const items = root.querySelectorAll<HTMLElement>("[data-station]")
    if (!rail || !clock) return

    if (prefersReducedMotion()) {
      items.forEach((item) => item.classList.add("is-lit"))
      rail.style.transform = "scaleY(1)"
      clock.textContent = "11:40"
      return
    }

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 15%",
          end: "bottom 20%",
          scrub: 0.6,
          onUpdate: (self) => {
            const index = Math.min(stations.length - 1, Math.floor(self.progress * stations.length))
            clock.textContent = stations[index].time
            items.forEach((item, itemIndex) => {
              const isReached = itemIndex <= index
              item.classList.toggle("is-lit", isReached)
            })
          },
        },
      })

      timeline.fromTo(rail, { scaleY: 0 }, { scaleY: 1, ease: "none" }, 0)
      timeline.from(
        items,
        { y: 24, opacity: 0.2, stagger: 0.18, ease: "none" },
        0,
      )
    }, root)

    return () => context.revert()
  }, [])

  return (
    <section id="day" ref={rootRef} className="border-t border-white/10 px-5 py-24 md:py-36" aria-labelledby="day-heading">
      <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="md:sticky md:top-28 md:self-start">
          <p data-clock className="text-sm tabular-nums text-mark">
            6:10
          </p>
          <h2 id="day-heading" className="mt-4 max-w-[12ch] text-4xl font-medium tracking-[-0.04em] text-text md:text-5xl">
            A morning on lot 12.
          </h2>
          <p className="mt-5 max-w-[32ch] text-[17px] leading-7 text-muted">
            The instrument stays. The crew changes. Scroll the morning.
          </p>
        </div>
        <div className="relative">
          <span
            data-rail
            className="absolute bottom-3 left-[15px] top-3 w-px origin-top scale-y-0 bg-mark"
            aria-hidden="true"
          />
          <ol className="space-y-12">
            {stations.map((station, index) => (
              <li key={station.time} data-station className="grid grid-cols-[32px_minmax(0,1fr)] gap-5">
                <span className="stake relative z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-ink text-xs text-muted">
                  {index + 1}
                </span>
                <div className="max-w-[40ch]">
                  <p className="text-sm tabular-nums text-faint">{station.time}</p>
                  <h3 className="mt-1 text-xl tracking-tight text-text">{station.title}</h3>
                  <p className="mt-2 text-[16px] leading-7 text-muted">{station.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
