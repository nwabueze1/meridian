import type { Metadata } from "next"
import { ArticlePage } from "@/components/article-page"
import { DayFigure } from "@/components/page-figures"

export const metadata: Metadata = {
  title: "A morning on lot 12 — Meridian",
  description: "From first light to handoff. The instrument stays. The crew changes.",
}

const stations = [
  {
    time: "6:10",
    title: "Set on the corner",
    body: "The east side is soft. The legs go wider than the case suggests. The bubble comes home before anyone speaks.",
  },
  {
    time: "6:40",
    title: "The plate holds",
    body: "184° 12′ 20″. North face. Nobody writes it on a glove. The number is already where the next person will look.",
  },
  {
    time: "8:05",
    title: "The next crew arrives",
    body: "They do not set up again. They read the plate, check the bubble, and start from the mark that is already there.",
  },
  {
    time: "11:40",
    title: "Stowed",
    body: "The head comes off. The stake keeps the mark. The afternoon can begin without a second explanation.",
  },
]

export default function DayPage() {
  return (
    <ArticlePage
      kicker="Field"
      title="A morning on lot 12."
      lede="The instrument stays. The crew changes. This is one wet morning, from first light to handoff."
      figure={<DayFigure />}
    >
      <ol className="max-w-3xl space-y-12">
        {stations.map((station, index) => (
          <li key={station.time} className="grid gap-3 border-t border-white/10 pt-8 md:grid-cols-[6rem_minmax(0,1fr)]">
            <p className="text-sm tabular-nums text-mark">
              {index + 1} · {station.time}
            </p>
            <div>
              <h2 className="text-2xl tracking-tight text-text">{station.title}</h2>
              <p className="mt-3 max-w-[46ch] text-[17px] leading-7 text-muted">{station.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </ArticlePage>
  )
}
