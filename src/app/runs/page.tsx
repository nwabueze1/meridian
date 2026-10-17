import type { Metadata } from "next"
import { ArticlePage } from "@/components/article-page"
import { RunsFigure } from "@/components/page-figures"

export const metadata: Metadata = {
  title: "Small runs — Meridian",
  description: "Meridian builds a few units at a time, each one spoken for.",
}

const steps = [
  { name: "You write", detail: "The site, the week, and how many crews will share the setup." },
  { name: "We answer", detail: "A week it can be on the stake, or a plain no if that week will not work." },
  { name: "We build", detail: "That unit, for that handoff. Not a spare pulled from a warehouse." },
]

export default function RunsPage() {
  return (
    <ArticlePage
      kicker="Studio"
      title="Small runs."
      lede="We do not keep a shelf of them. A run is a few units, each one already spoken for."
      figure={<RunsFigure />}
    >
      <ol className="grid gap-4 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.name} className="rounded-2xl border border-white/10 p-6">
            <p className="text-sm tabular-nums text-mark">0{index + 1}</p>
            <h2 className="mt-4 text-xl tracking-tight text-text">{step.name}</h2>
            <p className="mt-3 text-[16px] leading-7 text-muted">{step.detail}</p>
          </li>
        ))}
      </ol>
      <p className="mt-16 max-w-[46ch] text-[17px] leading-7 text-muted">
        Write to studio@meridian.field. The reply is the schedule.
      </p>
    </ArticlePage>
  )
}
