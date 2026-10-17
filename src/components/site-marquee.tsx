"use client"

import { useEffect, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/motion"

const places = [
  "Lot 12",
  "North ditch",
  "Pier 4",
  "Ridge stake",
  "Culvert B",
  "Bench mark 18",
  "East abutment",
  "Wet corner",
  "Pier cap",
  "South fence",
]

export const SiteMarquee = () => {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track || prefersReducedMotion()) return

    const distance = track.scrollWidth / 2
    const tween = gsap.to(track, {
      x: -distance,
      duration: 36,
      ease: "none",
      repeat: -1,
    })

    const handlePause = () => tween.pause()
    const handlePlay = () => tween.play()
    track.addEventListener("mouseenter", handlePause)
    track.addEventListener("mouseleave", handlePlay)

    return () => {
      track.removeEventListener("mouseenter", handlePause)
      track.removeEventListener("mouseleave", handlePlay)
      tween.kill()
    }
  }, [])

  const marks = [...places, ...places]

  return (
    <section aria-label="Sites in the book" className="overflow-hidden border-y border-white/10">
      <div ref={trackRef} className="flex w-max gap-8 py-5">
        {marks.map((place, index) => (
          <span key={`${place}-${index}`} className="flex items-center gap-8 text-sm text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-mark" aria-hidden="true" />
            {place}
          </span>
        ))}
      </div>
    </section>
  )
}
