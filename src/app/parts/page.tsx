import type { Metadata } from "next"
import { ArticlePage } from "@/components/article-page"
import { PartsFigure } from "@/components/page-figures"

export const metadata: Metadata = {
  title: "Parts — Meridian",
  description: "Six pieces. One setup. Tripod, tribrach, plate, telescope, bubble, and cell.",
}

const pieces = [
  { index: "01", name: "Tripod", body: "Three legs. They bite into soft ground, then they stay while the crews change." },
  { index: "02", name: "Tribrach", body: "The screws that bring the bubble home. Quiet adjustments, not a new setup." },
  { index: "03", name: "Plate", body: "The angle, written so a stranger can read it. Degrees, minutes, seconds." },
  { index: "04", name: "Telescope", body: "Thirty times, and a crosshair that locks when the instrument is sighted." },
  { index: "05", name: "Bubble", body: "Center is the only honest place. If it is home, the plate can be trusted." },
  { index: "06", name: "Cell", body: "A week of mornings on one charge, from the cold start to the hard sun." },
]

export default function PartsPage() {
  return (
    <ArticlePage
      kicker="Instrument"
      title="Six pieces. One setup."
      lede="Nothing extra in the case. Each piece has one job, and the next crew inherits all six."
      figure={<PartsFigure />}
    >
      <ol className="divide-y divide-white/10 border-y border-white/10">
        {pieces.map((piece) => (
          <li key={piece.name} className="grid gap-3 py-8 md:grid-cols-[4rem_12rem_minmax(0,1fr)] md:items-baseline">
            <span className="text-sm tabular-nums text-faint">{piece.index}</span>
            <h2 className="text-xl tracking-tight text-text">{piece.name}</h2>
            <p className="max-w-[46ch] text-[16px] leading-7 text-muted">{piece.body}</p>
          </li>
        ))}
      </ol>
    </ArticlePage>
  )
}
