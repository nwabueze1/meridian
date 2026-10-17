import { memo, type RefObject } from "react"
import { initialLegs, SCOPE_PIVOT } from "@/lib/instrument"

type TheodoliteProps = {
  svgRef: RefObject<SVGSVGElement | null>
}

export const Theodolite = memo(function Theodolite({ svgRef }: TheodoliteProps) {
  const [pivotX, pivotY] = SCOPE_PIVOT

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 560 680"
      className="h-auto w-full overflow-visible"
      role="img"
      aria-label="Meridian 4 site level, stowed on its tripod"
    >
      <ellipse cx="283" cy="430" rx="120" ry="18" fill="#000" opacity="0.35" data-shadow />
      <ellipse
        cx="280"
        cy="250"
        rx="210"
        ry="210"
        fill="none"
        stroke="rgba(255,255,255,0.045)"
        strokeWidth="1"
      />
      <ellipse
        cx="280"
        cy="250"
        rx="150"
        ry="150"
        fill="none"
        stroke="rgba(255,255,255,0.04)"
        strokeWidth="1"
      />

      <path data-leg="left" d={initialLegs.left} fill="#12161c" stroke="#2c323a" strokeWidth="1" />
      <path data-leg="right" d={initialLegs.right} fill="#181d24" stroke="#3a414b" strokeWidth="1" />
      <path data-leg="front" d={initialLegs.front} fill="#1c222a" stroke="#4a525c" strokeWidth="1" />
      <circle data-foot="left" cx="206" cy="392" r="5" fill="#0e1116" stroke="#6fdc11" strokeOpacity="0.0" />
      <circle data-foot="right" cx="356" cy="398" r="5" fill="#0e1116" stroke="#6fdc11" strokeOpacity="0.0" />
      <circle data-foot="front" cx="288" cy="456" r="5.5" fill="#10141a" stroke="#8a9099" />

      <ellipse cx="280" cy="346" rx="74" ry="22" fill="#10141a" stroke="#2a3038" />
      <ellipse cx="248" cy="352" rx="8" ry="4" fill="#1a1f26" stroke="#3a414b" />
      <ellipse cx="312" cy="356" rx="8" ry="4" fill="#1a1f26" stroke="#3a414b" />
      <ellipse cx="280" cy="338" rx="8" ry="4" fill="#222830" stroke="#4a525c" />

      <ellipse cx="280" cy="324" rx="96" ry="36" fill="#161b22" stroke="#3a414b" />
      <ellipse
        cx="280"
        cy="324"
        rx="78"
        ry="28"
        fill="none"
        stroke="#5c626b"
        strokeWidth="1"
        strokeDasharray="2 6"
      />
      <ellipse cx="280" cy="312" rx="52" ry="18" fill="#1c232c" stroke="#4a525c" />

      <rect x="256" y="214" width="14" height="92" rx="4" fill="#141920" stroke="#3a414b" />
      <rect x="292" y="214" width="14" height="92" rx="4" fill="#1c232c" stroke="#4a525c" />
      <circle cx="236" cy="286" r="22" fill="#12171d" stroke="#3a414b" />
      <circle cx="236" cy="286" r="14" fill="none" stroke="#5c626b" strokeDasharray="2 4" />

      <g data-scope transform={`rotate(-68 ${pivotX} ${pivotY})`}>
        <rect x="268" y="246" width="36" height="22" rx="8" fill="#10151b" stroke="#3a414b" />
        <rect x="300" y="244" width="150" height="28" rx="14" fill="#1a212a" stroke="#4a525c" />
        <rect x="438" y="238" width="34" height="40" rx="10" fill="#222a34" stroke="#5c626b" />
        <circle cx="470" cy="258" r="12" fill="#0c1015" stroke="#8a9099" />
        <circle cx="348" cy="242" r="6" fill="#10151b" stroke="#5c626b" />
        <g data-hair opacity="0" transform="translate(470 258)">
          <circle r="18" fill="none" stroke="#6fdc11" strokeWidth="1.25" />
          <path d="M -11 0 H 11 M 0 -11 V 11" stroke="#6fdc11" strokeWidth="1.25" />
          <circle r="1.6" fill="#6fdc11" />
        </g>
      </g>

      <g transform="translate(248 308)">
        <rect x="0" y="0" width="64" height="18" rx="9" fill="#0c1015" stroke="#3a414b" />
        <circle data-bubble cx="16" cy="9" r="4" fill="#9ec8ff" />
      </g>

      <circle data-lamp cx="214" cy="318" r="4" fill="#6fdc11" opacity="0.15" />

      <g data-plate>
        <rect x="196" y="332" width="168" height="36" rx="8" fill="#0b0e12" stroke="#2e353e" />
        <text
          data-read
          x="280"
          y="356"
          textAnchor="middle"
          fill="#edeff2"
          fontSize="16"
          fontFamily="Inter, ui-sans-serif, sans-serif"
          style={{ fontVariantNumeric: "tabular-nums" }}
        >
          — —
        </text>
      </g>

      <text
        x="280"
        y="392"
        textAnchor="middle"
        fill="#5c626b"
        fontSize="11"
        letterSpacing="0.14em"
        fontFamily="Inter, ui-sans-serif, sans-serif"
      >
        MERIDIAN 4
      </text>
    </svg>
  )
})
