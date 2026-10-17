import type { Metadata } from "next"
import { ArticlePage } from "@/components/article-page"
import { RequestFigure } from "@/components/page-figures"

export const metadata: Metadata = {
  title: "Request a unit — Meridian",
  description: "Write with the site and the week you need the Meridian 4.",
}

const asks = [
  { name: "The site", detail: "Name the ground. Say if it is soft, wet, or already staked." },
  { name: "The week", detail: "The week you need it on the stake, not a vague season." },
  { name: "The crews", detail: "How many people will share the one setup." },
]

export default function RequestPage() {
  return (
    <ArticlePage
      kicker="Instrument"
      title="Request a unit."
      lede="We build them in small runs. The note you send is the brief."
      figure={<RequestFigure />}
    >
      <ul className="grid gap-4 md:grid-cols-3">
        {asks.map((ask) => (
          <li key={ask.name} className="rounded-2xl border border-white/10 p-6">
            <h2 className="text-xl tracking-tight text-text">{ask.name}</h2>
            <p className="mt-3 text-[16px] leading-7 text-muted">{ask.detail}</p>
          </li>
        ))}
      </ul>
      <div className="mt-16 max-w-[46ch] space-y-6 text-[17px] leading-7 text-muted">
        <p>We reply with a week. That unit is built for the site you named, not pulled from a shelf.</p>
        <p>If the week will not work, we say so in the same note.</p>
      </div>
      <a
        href="mailto:studio@meridian.field"
        className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-mark px-6 text-sm font-medium text-[#10140a] transition-opacity hover:opacity-90"
      >
        Write to the studio
      </a>
    </ArticlePage>
  )
}
