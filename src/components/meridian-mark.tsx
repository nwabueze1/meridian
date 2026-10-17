"use client"

import { useEffect, useId, useRef } from "react"
import { gsap, prefersReducedMotion } from "@/lib/motion"

export const MeridianMark = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const clipId = useId().replace(/:/g, "")
  const sweepId = `${clipId}-sweep`

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || prefersReducedMotion()) return

    const sweep = svg.querySelector("[data-sweep]")
    const level = svg.querySelector("[data-level]")
    const dash = svg.querySelector("[data-dash]")
    const bead = svg.querySelector("[data-bead]")
    if (!sweep || !level || !dash || !bead) return

    const context = gsap.context(() => {
      gsap.fromTo(
        sweep,
        { attr: { x: -220 } },
        { attr: { x: 1280 }, duration: 3.8, ease: "none", repeat: -1 },
      )
      gsap.fromTo(
        level,
        { attr: { y: 46 } },
        { attr: { y: 118 }, duration: 2.6, ease: "sine.inOut", yoyo: true, repeat: -1 },
      )
      gsap.to(dash, {
        strokeDashoffset: -280,
        duration: 9,
        ease: "none",
        repeat: -1,
      })
      gsap.fromTo(
        bead,
        { x: 0 },
        { x: 1120, duration: 5.2, ease: "sine.inOut", yoyo: true, repeat: -1 },
      )
    }, svg)

    return () => context.revert()
  }, [])

  const sharedText = {
    x: 8,
    y: 132,
    fontSize: 148,
    fontWeight: 600,
    letterSpacing: "-0.04em",
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    textLength: 1184,
    lengthAdjust: "spacing" as const,
  }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1200 168"
      className="h-auto w-full"
      role="img"
      aria-label="Meridian"
    >
      <defs>
        <clipPath id={clipId}>
          <text {...sharedText}>MERIDIAN</text>
        </clipPath>
        <linearGradient id={sweepId} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#6fdc11" stopOpacity="0" />
          <stop offset="45%" stopColor="#6fdc11" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#edeff2" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#6fdc11" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6fdc11" stopOpacity="0" />
        </linearGradient>
      </defs>

      <text {...sharedText} fill="rgba(237,239,242,0.72)">
        MERIDIAN
      </text>
      <text
        {...sharedText}
        data-dash
        fill="none"
        stroke="rgba(111,220,17,0.55)"
        strokeWidth="1.25"
        strokeDasharray="6 18"
      >
        MERIDIAN
      </text>

      <g clipPath={`url(#${clipId})`}>
        <rect data-sweep x="-220" y="0" width="180" height="168" fill={`url(#${sweepId})`} />
        <rect data-level x="0" y="78" width="1200" height="1.5" fill="#6fdc11" opacity="0.85" />
        <g data-bead>
          <circle cx="40" cy="84" r="7" fill="none" stroke="#6fdc11" strokeWidth="1.4" />
          <path d="M33 84 H47 M40 77 V91" stroke="#6fdc11" strokeWidth="1.2" />
        </g>
      </g>
    </svg>
  )
}
