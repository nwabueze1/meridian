import type { Metadata } from "next"
import { ArticlePage } from "@/components/article-page"
import { InstrumentFigure } from "@/components/page-figures"

export const metadata: Metadata = {
  title: "The Meridian 4 — Meridian",
  description: "A site level you set once. The angle stays on the plate for the next crew.",
}

const carried = [
  { name: "Head", detail: "1.1 kg. The plate, the telescope, and the bubble." },
  { name: "Tripod", detail: "Carbon. The legs bite and then they stay." },
  { name: "Case", detail: "One case. The next person can carry it without a briefing." },
]

export default function InstrumentPage() {
  return (
    <ArticlePage
      kicker="Instrument"
      title="The Meridian 4."
      lede="A site level you set once. The angle stays on the plate for whoever works the stake after you."
      figure={<InstrumentFigure />}
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {carried.map((item) => (
          <li key={item.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-xl tracking-tight text-text">{item.name}</h2>
            <p className="mt-3 text-[16px] leading-7 text-muted">{item.detail}</p>
          </li>
        ))}
      </ul>
      <div className="mt-16 max-w-[46ch] space-y-6 text-[17px] leading-7 text-muted">
        <p>You do not re-explain the corner. The plate already has it.</p>
        <p>Two arcseconds. Thirty times through the telescope. A week on one charge, in the cold and in the hard sun.</p>
        <p>When the head comes off, the stake keeps the mark. The next crew starts there.</p>
      </div>
    </ArticlePage>
  )
}
