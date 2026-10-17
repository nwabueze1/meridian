import type { Metadata } from "next"
import { ArticlePage } from "@/components/article-page"
import { CrewFigure } from "@/components/page-figures"

export const metadata: Metadata = {
  title: "How a crew uses it — Meridian",
  description: "Set the tripod, take the reading, leave it on the stake.",
}

const moves = [
  {
    number: "1",
    title: "Set the tripod",
    body: "The legs bite. On soft ground they go wider. The bubble comes home and stays there before anyone takes a number.",
  },
  {
    number: "2",
    title: "Take the reading",
    body: "Sight the face you mean to hold. The plate keeps two arcseconds. The number does not drift while you look away, or while you leave.",
  },
  {
    number: "3",
    title: "Leave it on the stake",
    body: "Say the face, if you are still there. You do not have to be. The next person starts from your mark, not from a guess and not from a new setup.",
  },
]

export default function CrewPage() {
  return (
    <ArticlePage
      kicker="Field"
      title="How a crew uses it."
      lede="Three moves. Then the stake can wait for whoever comes next."
      figure={<CrewFigure />}
    >
      <ol className="max-w-3xl space-y-12">
        {moves.map((move) => (
          <li key={move.number} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-5 border-t border-white/10 pt-8">
            <span className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-mark text-sm font-medium text-[#10140a]">
              {move.number}
            </span>
            <div>
              <h2 className="text-2xl tracking-tight text-text">{move.title}</h2>
              <p className="mt-3 max-w-[46ch] text-[17px] leading-7 text-muted">{move.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </ArticlePage>
  )
}
