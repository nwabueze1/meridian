"use client"

import { useEffect, useRef } from "react"
import { Theodolite } from "@/components/theodolite"
import {
  FEET,
  formatPlate,
  HUB,
  legPath,
  mix,
  mixFoot,
  scopeAngle,
  SCOPE_PIVOT,
} from "@/lib/instrument"
import { gsap, prefersReducedMotion } from "@/lib/motion"

const paint = (svg: SVGSVGElement, progress: number) => {
  const leg = (name: string) => svg.querySelector<SVGPathElement>(`[data-leg='${name}']`)
  const foot = (name: string) => svg.querySelector<SVGCircleElement>(`[data-foot='${name}']`)
  const leftLeg = leg("left")
  const rightLeg = leg("right")
  const frontLeg = leg("front")
  const leftFoot = foot("left")
  const rightFoot = foot("right")
  const frontFoot = foot("front")
  const scope = svg.querySelector<SVGGElement>("[data-scope]")
  const hair = svg.querySelector<SVGGElement>("[data-hair]")
  const plate = svg.querySelector<SVGTextElement>("[data-read]")
  const bubble = svg.querySelector<SVGCircleElement>("[data-bubble]")
  const lamp = svg.querySelector<SVGCircleElement>("[data-lamp]")
  const shadow = svg.querySelector<SVGEllipseElement>("[data-shadow]")
  const hasParts = Boolean(
    leftLeg && rightLeg && frontLeg && leftFoot && rightFoot && frontFoot && scope && hair && plate && bubble && lamp && shadow,
  )
  if (!hasParts || !leftLeg || !rightLeg || !frontLeg || !leftFoot || !rightFoot || !frontFoot) return
  if (!scope || !hair || !plate || !bubble || !lamp || !shadow) return

  const left = mixFoot(FEET.left.stowed, FEET.left.sighted, progress)
  const right = mixFoot(FEET.right.stowed, FEET.right.sighted, progress)
  const front = mixFoot(FEET.front.stowed, FEET.front.sighted, progress)
  const [pivotX, pivotY] = SCOPE_PIVOT

  leftLeg.setAttribute("d", legPath(HUB, left, 13))
  rightLeg.setAttribute("d", legPath(HUB, right, 13))
  frontLeg.setAttribute("d", legPath(HUB, front, 12))
  leftFoot.setAttribute("cx", String(left[0]))
  leftFoot.setAttribute("cy", String(left[1]))
  rightFoot.setAttribute("cx", String(right[0]))
  rightFoot.setAttribute("cy", String(right[1]))
  frontFoot.setAttribute("cx", String(front[0]))
  frontFoot.setAttribute("cy", String(front[1]))
  leftFoot.setAttribute("stroke-opacity", String(progress))
  rightFoot.setAttribute("stroke-opacity", String(progress))
  scope.setAttribute("transform", `rotate(${scopeAngle(progress)} ${pivotX} ${pivotY})`)
  hair.setAttribute("opacity", String(Math.max(0, (progress - 0.62) / 0.38)))
  lamp.setAttribute("opacity", String(mix(0.15, 1, progress)))
  shadow.setAttribute("opacity", String(mix(0.2, 0.5, progress)))
  shadow.setAttribute("cx", String((left[0] + right[0] + front[0]) / 3))
  shadow.setAttribute("cy", String((left[1] + right[1] + front[1]) / 3 + 10))
  bubble.setAttribute("cx", String(mix(16, 32, progress)))
  plate.textContent = formatPlate(progress)
}

const loopValue = (onUpdate: (value: number) => void, reducedAt = 1) => {
  const state = { value: 0 }
  if (prefersReducedMotion()) {
    onUpdate(reducedAt)
    return () => {}
  }

  const timeline = gsap.timeline({ repeat: -1 })
  timeline.to(state, { value: 1, duration: 2.6, ease: "power2.inOut", onUpdate: () => onUpdate(state.value) })
  timeline.to({}, { duration: 0.8 })
  timeline.to(state, { value: 0, duration: 2.6, ease: "power2.inOut", onUpdate: () => onUpdate(state.value) })
  timeline.to({}, { duration: 0.45 })

  return () => {
    timeline.kill()
  }
}

export const InstrumentFigure = () => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    return loopValue((value) => paint(svg, value))
  }, [])

  return <Theodolite svgRef={svgRef} />
}

export const PlateFigure = () => {
  const needleRef = useRef<SVGGElement>(null)
  const labelRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    const needle = needleRef.current
    const label = labelRef.current
    if (!needle || !label) return

    if (prefersReducedMotion()) {
      needle.setAttribute("transform", "rotate(128 160 160)")
      label.textContent = "184°"
      return
    }

    const state = { turn: 0 }
    const tween = gsap.to(state, {
      turn: 360,
      duration: 14,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        needle.setAttribute("transform", `rotate(${state.turn} 160 160)`)
        label.textContent = `${Math.round(state.turn % 360)}°`
      },
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <svg viewBox="0 0 320 320" className="h-auto w-full" role="img" aria-label="Rotating survey plate">
      <circle cx="160" cy="160" r="148" fill="none" stroke="rgba(255,255,255,0.08)" />
      <circle cx="160" cy="160" r="118" fill="#10141a" stroke="#3a414b" />
      <circle cx="160" cy="160" r="96" fill="none" stroke="#5c626b" strokeDasharray="2 7" />
      <g ref={needleRef}>
        <line x1="160" y1="168" x2="160" y2="58" stroke="#6fdc11" strokeWidth="2" />
        <circle cx="160" cy="160" r="5" fill="#6fdc11" />
      </g>
      <text ref={labelRef} x="160" y="206" textAnchor="middle" fill="#edeff2" fontSize="28" fontFamily="Inter, sans-serif">
        0°
      </text>
    </svg>
  )
}

const partNames = ["Tripod", "Tribrach", "Plate", "Scope", "Bubble", "Cell"]

export const PartsFigure = () => {
  const ringRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const ring = ringRef.current
    if (!ring || prefersReducedMotion()) return

    const tween = gsap.to(ring, {
      rotation: 360,
      svgOrigin: "160 160",
      duration: 22,
      ease: "none",
      repeat: -1,
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <svg viewBox="0 0 320 320" className="h-auto w-full" role="img" aria-label="The six parts turning past a mark">
      <circle cx="160" cy="160" r="108" fill="none" stroke="rgba(255,255,255,0.1)" />
      <circle cx="160" cy="28" r="5" fill="#6fdc11" />
      <g ref={ringRef}>
        {partNames.map((name, index) => {
          const angle = (Math.PI * 2 * index) / partNames.length - Math.PI / 2
          const x = 160 + Math.cos(angle) * 108
          const y = 160 + Math.sin(angle) * 108

          return (
            <g key={name} transform={`translate(${x} ${y})`}>
              <circle r="16" fill="#10141a" stroke="#6fdc11" />
              <text y="4" textAnchor="middle" fill="#edeff2" fontSize="9" fontFamily="Inter, sans-serif">
                {name}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}

export const RequestFigure = () => {
  const lineRef = useRef<SVGPathElement>(null)

  useEffect(() => {
    const line = lineRef.current
    if (!line) return
    const length = line.getTotalLength()
    line.style.strokeDasharray = `${length}`
    if (prefersReducedMotion()) {
      line.style.strokeDashoffset = "0"
      return
    }
    line.style.strokeDashoffset = `${length}`
    const tween = gsap.to(line, {
      strokeDashoffset: 0,
      duration: 2.8,
      ease: "power1.inOut",
      repeat: -1,
      repeatDelay: 0.6,
      yoyo: true,
    })
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <svg viewBox="0 0 320 220" className="h-auto w-full" role="img" aria-label="A note being written">
      <rect x="36" y="24" width="248" height="172" rx="18" fill="#10141a" stroke="#3a414b" />
      <text x="56" y="62" fill="#5c626b" fontSize="13" fontFamily="Inter, sans-serif">
        To the studio
      </text>
      <path
        ref={lineRef}
        d="M56 92 H250 M56 118 H210 M56 144 H236 M56 170 H168"
        fill="none"
        stroke="#6fdc11"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export const DayFigure = () => {
  const sunRef = useRef<SVGCircleElement>(null)
  const clockRef = useRef<SVGTextElement>(null)

  useEffect(() => {
    const sun = sunRef.current
    const clock = clockRef.current
    if (!sun || !clock) return

    const place = (amount: number) => {
      const angle = Math.PI * (1 - amount)
      sun.setAttribute("cx", String(160 + Math.cos(angle) * 112))
      sun.setAttribute("cy", String(188 - Math.sin(angle) * 100))
      const minute = Math.round(amount * (11 * 60 + 40 - (6 * 60 + 10)) + (6 * 60 + 10))
      const hours = Math.floor(minute / 60)
      const mins = String(minute % 60).padStart(2, "0")
      clock.textContent = `${hours}:${mins}`
    }

    if (prefersReducedMotion()) {
      place(0.35)
      return
    }

    const state = { amount: 0 }
    const tween = gsap.to(state, {
      amount: 1,
      duration: 8,
      ease: "none",
      repeat: -1,
      onUpdate: () => place(state.amount),
    })
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <svg viewBox="0 0 320 240" className="h-auto w-full" role="img" aria-label="The sun moving over a stake">
      <path d="M48 188 A112 100 0 0 1 272 188" fill="none" stroke="rgba(255,255,255,0.14)" />
      <circle ref={sunRef} cx="48" cy="188" r="7" fill="#6fdc11" />
      <line x1="160" y1="188" x2="160" y2="214" stroke="#edeff2" strokeWidth="2" />
      <circle cx="160" cy="214" r="4" fill="#6fdc11" />
      <text ref={clockRef} x="160" y="40" textAnchor="middle" fill="#edeff2" fontSize="28" fontFamily="Inter, sans-serif">
        6:10
      </text>
    </svg>
  )
}

const readings = ["184° 12′", "92° 04′", "11° 48′"]

export const NotesFigure = () => {
  const cardsRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const cards = cardsRef.current
    if (!cards || prefersReducedMotion()) return
    const panels = cards.querySelectorAll<SVGRectElement>("rect")
    const tween = gsap.to(panels, {
      opacity: 0.25,
      duration: 1.2,
      stagger: { each: 0.4, repeat: -1, yoyo: true },
      ease: "sine.inOut",
    })
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <svg viewBox="0 0 320 240" className="h-auto w-full" role="img" aria-label="Three stake notes">
      <g ref={cardsRef}>
        {readings.map((reading, index) => (
          <g key={reading} transform={`translate(${28 + index * 18} ${36 + index * 22})`}>
            <rect width="230" height="92" rx="16" fill="#10141a" stroke="#3a414b" />
            <text x="18" y="38" fill="#5c626b" fontSize="12" fontFamily="Inter, sans-serif">
              Note {index + 1}
            </text>
            <text x="18" y="68" fill="#edeff2" fontSize="22" fontFamily="Inter, sans-serif">
              {reading}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}

const crewMarks = ["Set", "Sight", "Leave"]

export const CrewFigure = () => {
  const rootRef = useRef<SVGGElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root || prefersReducedMotion()) return
    const marks = root.querySelectorAll<SVGCircleElement>("circle")
    const tween = gsap.to(marks, {
      fill: "#6fdc11",
      duration: 0.45,
      stagger: { each: 0.9, repeat: -1, yoyo: true },
    })
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <svg viewBox="0 0 320 180" className="h-auto w-full" role="img" aria-label="Set, sight, and leave">
      <g ref={rootRef}>
        {crewMarks.map((mark, index) => (
          <g key={mark}>
            <circle cx={60 + index * 100} cy="64" r="22" fill="#10141a" stroke="#6fdc11" strokeWidth="1.5" />
            <text x={60 + index * 100} y="130" textAnchor="middle" fill="#8a9099" fontSize="14" fontFamily="Inter, sans-serif">
              {mark}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}

export const RunsFigure = () => {
  const sweepRef = useRef<SVGRectElement>(null)

  useEffect(() => {
    const sweep = sweepRef.current
    if (!sweep || prefersReducedMotion()) return
    const tween = gsap.fromTo(
      sweep,
      { attr: { x: 16 } },
      { attr: { x: 214 }, duration: 2.4, ease: "power1.inOut", repeat: -1, yoyo: true },
    )
    return () => {
      tween.kill()
    }
  }, [])

  return (
    <svg viewBox="0 0 320 180" className="h-auto w-full" role="img" aria-label="Three units in a small run">
      {[0, 1, 2].map((index) => (
        <g key={index} transform={`translate(${28 + index * 98} 36)`}>
          <rect width="72" height="96" rx="12" fill="#10141a" stroke="#3a414b" />
          <text x="36" y="56" textAnchor="middle" fill="#edeff2" fontSize="16" fontFamily="Inter, sans-serif">
            0{index + 1}
          </text>
        </g>
      ))}
      <rect ref={sweepRef} x="16" y="28" width="96" height="112" rx="16" fill="none" stroke="#6fdc11" strokeWidth="2" />
    </svg>
  )
}
