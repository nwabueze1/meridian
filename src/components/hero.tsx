"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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

gsap.registerPlugin(ScrollTrigger)

type Pose = "stowed" | "sighted"

const readInstrument = (svg: SVGSVGElement) => {
  const leftLeg = svg.querySelector<SVGPathElement>("[data-leg='left']")
  const rightLeg = svg.querySelector<SVGPathElement>("[data-leg='right']")
  const frontLeg = svg.querySelector<SVGPathElement>("[data-leg='front']")
  const leftFoot = svg.querySelector<SVGCircleElement>("[data-foot='left']")
  const rightFoot = svg.querySelector<SVGCircleElement>("[data-foot='right']")
  const frontFoot = svg.querySelector<SVGCircleElement>("[data-foot='front']")
  const scope = svg.querySelector<SVGGElement>("[data-scope]")
  const hair = svg.querySelector<SVGGElement>("[data-hair]")
  const plate = svg.querySelector<SVGTextElement>("[data-read]")
  const bubble = svg.querySelector<SVGCircleElement>("[data-bubble]")
  const lamp = svg.querySelector<SVGCircleElement>("[data-lamp]")
  const shadow = svg.querySelector<SVGEllipseElement>("[data-shadow]")

  const hasInstrumentParts = Boolean(
    leftLeg &&
      rightLeg &&
      frontLeg &&
      leftFoot &&
      rightFoot &&
      frontFoot &&
      scope &&
      hair &&
      plate &&
      bubble &&
      lamp &&
      shadow,
  )

  if (!hasInstrumentParts) return null
  if (!leftLeg || !rightLeg || !frontLeg || !leftFoot || !rightFoot || !frontFoot) return null
  if (!scope || !hair || !plate || !bubble || !lamp || !shadow) return null

  return {
    leftLeg,
    rightLeg,
    frontLeg,
    leftFoot,
    rightFoot,
    frontFoot,
    scope,
    hair,
    plate,
    bubble,
    lamp,
    shadow,
  }
}

export const Hero = () => {
  const stageRef = useRef<HTMLElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const ruleRef = useRef<HTMLSpanElement>(null)
  const choosePoseRef = useRef<(target: 0 | 1) => void>(() => {})
  const [pose, setPose] = useState<Pose>("stowed")

  useEffect(() => {
    const stage = stageRef.current
    const svg = svgRef.current
    const rule = ruleRef.current
    if (!stage || !svg || !rule) return

    const parts = readInstrument(svg)
    if (!parts) return

    const [pivotX, pivotY] = SCOPE_PIVOT
    let progress = 0

    const applyPose = (nextProgress: number) => {
      progress = nextProgress
      const left = mixFoot(FEET.left.stowed, FEET.left.sighted, nextProgress)
      const right = mixFoot(FEET.right.stowed, FEET.right.sighted, nextProgress)
      const front = mixFoot(FEET.front.stowed, FEET.front.sighted, nextProgress)

      parts.leftLeg.setAttribute("d", legPath(HUB, left, 13))
      parts.rightLeg.setAttribute("d", legPath(HUB, right, 13))
      parts.frontLeg.setAttribute("d", legPath(HUB, front, 12))
      const shadowX = (left[0] + right[0] + front[0]) / 3
      const shadowY = (left[1] + right[1] + front[1]) / 3 + 10
      parts.shadow.setAttribute("cx", String(shadowX))
      parts.shadow.setAttribute("cy", String(shadowY))
      parts.leftFoot.setAttribute("cx", String(left[0]))
      parts.leftFoot.setAttribute("cy", String(left[1]))
      parts.rightFoot.setAttribute("cx", String(right[0]))
      parts.rightFoot.setAttribute("cy", String(right[1]))
      parts.frontFoot.setAttribute("cx", String(front[0]))
      parts.frontFoot.setAttribute("cy", String(front[1]))
      parts.leftFoot.setAttribute("stroke-opacity", String(nextProgress))
      parts.rightFoot.setAttribute("stroke-opacity", String(nextProgress))

      parts.scope.setAttribute(
        "transform",
        `rotate(${scopeAngle(nextProgress)} ${pivotX} ${pivotY})`,
      )

      const hairOpacity = Math.max(0, (nextProgress - 0.62) / 0.38)
      parts.hair.setAttribute("opacity", String(hairOpacity))
      parts.lamp.setAttribute("opacity", String(mix(0.15, 1, nextProgress)))
      parts.shadow.setAttribute("opacity", String(mix(0.2, 0.5, nextProgress)))
      parts.bubble.setAttribute("cx", String(mix(16, 32, nextProgress)))
      parts.plate.textContent = formatPlate(nextProgress)
      rule.style.transform = `scaleX(${nextProgress})`

      const nextPose = nextProgress >= 0.5 ? "sighted" : "stowed"
      setPose((current) => (current === nextPose ? current : nextPose))
      svg.setAttribute(
        "aria-label",
        nextPose === "sighted"
          ? "Meridian 4 site level, sighted, plate reading 184 degrees 12 minutes"
          : "Meridian 4 site level, stowed on its tripod",
      )
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReducedMotion) {
      applyPose(1)
      return
    }

    const state = { value: progress }
    let loop: gsap.core.Timeline | null = null
    let buttonTween: gsap.core.Tween | null = null
    let isHeroInView = true

    const syncPose = () => applyPose(state.value)

    const playCycle = (fromSighted: boolean) => {
      loop?.kill()
      loop = gsap.timeline({ repeat: -1, paused: !isHeroInView })

      const swingToSight = () => {
        loop?.to(state, {
          value: 1,
          duration: 2.6,
          ease: "power2.inOut",
          onUpdate: syncPose,
        })
      }

      const swingToStow = () => {
        loop?.to(state, {
          value: 0,
          duration: 2.6,
          ease: "power2.inOut",
          onUpdate: syncPose,
        })
      }

      if (fromSighted) {
        loop.to({}, { duration: 0.9 })
        swingToStow()
        loop.to({}, { duration: 0.5 })
        swingToSight()
        return
      }

      swingToSight()
      loop.to({}, { duration: 0.9 })
      swingToStow()
      loop.to({}, { duration: 0.5 })
    }

    choosePoseRef.current = (target) => {
      buttonTween?.kill()
      loop?.pause()
      buttonTween = gsap.to(state, {
        value: target,
        duration: 0.8,
        ease: "power2.inOut",
        onUpdate: syncPose,
        onComplete: () => playCycle(target === 1),
      })
    }

    const context = gsap.context(() => {
      playCycle(false)
      ScrollTrigger.create({
        trigger: stage,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => {
          isHeroInView = self.isActive
          if (isHeroInView) loop?.play()
          else loop?.pause()
        },
      })
    }, stage)

    return () => {
      buttonTween?.kill()
      loop?.kill()
      context.revert()
    }
  }, [])

  const handleChooseStowed = () => {
    choosePoseRef.current(0)
  }

  const handleChooseSighted = () => {
    choosePoseRef.current(1)
  }

  const stowedClass =
    pose === "stowed" ? "bg-text text-ink" : "text-muted hover:text-text"
  const sightedClass =
    pose === "sighted" ? "bg-mark text-[#10140a]" : "text-muted hover:text-text"

  return (
    <section id="instrument" ref={stageRef} className="relative md:min-h-screen">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 pb-20 pt-28 md:min-h-screen md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-6 md:pb-10 md:pt-24">
        <div>
          <h1 className="max-w-[11ch] text-[2.6rem] font-medium leading-[1.02] tracking-[-0.045em] text-text sm:text-[3.25rem] lg:text-[3.75rem]">
            A reading the next crew can trust.
          </h1>
          <p className="mt-6 max-w-[36ch] text-[17px] leading-7 text-muted">
            Set the Meridian 4 once. The angle stays on the plate for whoever works the stake after you.
          </p>
          <div
            role="group"
            aria-label="Instrument pose"
            className="mt-8 inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1"
          >
            <button
              type="button"
              onClick={handleChooseStowed}
              aria-pressed={pose === "stowed"}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${stowedClass}`}
            >
              Stowed
            </button>
            <button
              type="button"
              onClick={handleChooseSighted}
              aria-pressed={pose === "sighted"}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${sightedClass}`}
            >
              Sighted
            </button>
          </div>
          <div className="relative mt-12 border-t border-white/10 pt-6">
            <span
              ref={ruleRef}
              className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-mark"
            />
            <dl className="grid grid-cols-3 gap-4">
              <div>
                <dt className="text-[1.35rem] tracking-tight text-text">1.1 kg</dt>
                <dd className="mt-1 text-sm leading-5 text-muted">On the shoulder</dd>
              </div>
              <div>
                <dt className="text-[1.35rem] tracking-tight text-text">2″</dt>
                <dd className="mt-1 text-sm leading-5 text-muted">On the plate</dd>
              </div>
              <div>
                <dt className="text-[1.35rem] tracking-tight text-text">7 days</dt>
                <dd className="mt-1 text-sm leading-5 text-muted">On one charge</dd>
              </div>
            </dl>
          </div>
        </div>
        <Theodolite svgRef={svgRef} />
      </div>
    </section>
  )
}
