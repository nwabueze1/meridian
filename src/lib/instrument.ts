export type Foot = readonly [number, number]

export const HUB: Foot = [280, 318]

export const SCOPE_PIVOT: Foot = [280, 258]

export const FEET = {
  left: { stowed: [206, 392] as Foot, sighted: [92, 540] as Foot },
  right: { stowed: [356, 398] as Foot, sighted: [472, 524] as Foot },
  front: { stowed: [288, 456] as Foot, sighted: [304, 612] as Foot },
}

export const mix = (start: number, end: number, progress: number) =>
  start + (end - start) * progress

export const mixFoot = (start: Foot, end: Foot, progress: number): Foot => [
  mix(start[0], end[0], progress),
  mix(start[1], end[1], progress),
]

export const legPath = (from: Foot, to: Foot, width: number) => {
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const length = Math.hypot(dx, dy) || 1
  const normalX = (-dy / length) * width
  const normalY = (dx / length) * width
  const tip = 0.32

  return [
    `M ${from[0] + normalX} ${from[1] + normalY}`,
    `L ${to[0] + normalX * tip} ${to[1] + normalY * tip}`,
    `L ${to[0] - normalX * tip} ${to[1] - normalY * tip}`,
    `L ${from[0] - normalX} ${from[1] - normalY}`,
    "Z",
  ].join(" ")
}

export const scopeAngle = (progress: number) => mix(-68, -8, progress)

export const formatPlate = (progress: number) => {
  const hasSettled = progress >= 0.14
  if (!hasSettled) return "— —"

  const amount = Math.min(1, (progress - 0.14) / 0.86)
  const degrees = Math.floor(184 * amount)
  const minutes = Math.round(12 * amount)

  return `${degrees}° ${String(minutes).padStart(2, "0")}′`
}

export const initialLegs = {
  left: legPath(HUB, FEET.left.stowed, 13),
  right: legPath(HUB, FEET.right.stowed, 13),
  front: legPath(HUB, FEET.front.stowed, 12),
}
