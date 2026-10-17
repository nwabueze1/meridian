import type { Metadata } from "next"
import { ArticlePage } from "@/components/article-page"
import { PlateFigure } from "@/components/page-figures"

export const metadata: Metadata = {
  title: "The plate — Meridian",
  description: "The angle stays on the plate, in numbers a stranger can read.",
}

const parts = [
  { name: "Degrees", detail: "The whole turn. On lot 12 that morning, 184." },
  { name: "Minutes", detail: "The finer cut. Twelve of them, held." },
  { name: "Seconds", detail: "Two arcseconds of honesty. Twenty, on that stake." },
]

export default function PlatePage() {
  return (
    <ArticlePage
      kicker="Instrument"
      title="The plate."
      lede="The angle is written in numbers. A person who was not there can still read it."
      figure={<PlateFigure />}
    >
      <p className="text-6xl font-medium tracking-[-0.05em] text-text md:text-8xl">184° 12′ 20″</p>
      <ul className="mt-14 grid gap-4 md:grid-cols-3">
        {parts.map((part) => (
          <li key={part.name} className="rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl tracking-tight text-text">{part.name}</h2>
            <p className="mt-3 text-[16px] leading-7 text-muted">{part.detail}</p>
          </li>
        ))}
      </ul>
      <div className="mt-16 max-w-[46ch] space-y-6 text-[17px] leading-7 text-muted">
        <p>Held means it does not drift while you look away, or while you leave for coffee.</p>
        <p>The next person does not need the number on a glove. They look at the plate and start.</p>
      </div>
    </ArticlePage>
  )
}
