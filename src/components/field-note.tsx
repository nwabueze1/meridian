"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/motion"

const notes = [
  {
    place: "Lot 12, corner stake",
    reading: "184° 12′ 20″",
    body: "Wet morning, 6:40. Hold the north face. The ditch is soft.",
    wide: true,
  },
  {
    place: "Culvert B",
    reading: "92° 04′ 10″",
    body: "Gravel shifted overnight. Reset the legs. Keep the same mark.",
    wide: false,
  },
  {
    place: "Bench mark 18",
    reading: "11° 48′ 00″",
    body: "The afternoon crew used it as they found it. No new setup.",
    wide: false,
  },
]

export const FieldNote = () => {
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return

    const cards = root.querySelectorAll<HTMLElement>("[data-card]")
    const context = gsap.context(() => {
      gsap.from(cards, {
        y: 36,
        opacity: 0,
        duration: 0.85,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
        },
      })
    }, root)

    return () => context.revert()
  }, [])

  return (
    <section id="field-notes" ref={rootRef} className="px-5 py-8 md:py-16" aria-labelledby="note-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="note-heading" className="max-w-[14ch] text-4xl font-medium tracking-[-0.04em] text-text md:text-5xl">
          Notes left on the stake.
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {notes.map((note) => (
            <article
              key={note.place}
              data-card
              className={`rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.14)] ${note.wide ? "md:col-span-2" : ""}`}
            >
              <p className="text-sm text-faint">{note.place}</p>
              <p className={`mt-5 font-medium tracking-[-0.04em] text-text ${note.wide ? "text-5xl md:text-6xl" : "text-3xl"}`}>
                {note.reading}
              </p>
              <p className="mt-5 max-w-[36ch] text-[17px] leading-7 text-muted">{note.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
