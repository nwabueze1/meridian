import type { Metadata } from "next"
import { ArticlePage } from "@/components/article-page"
import { NotesFigure } from "@/components/page-figures"

export const metadata: Metadata = {
  title: "Notes on the stake — Meridian",
  description: "Readings left where the next crew will find them.",
}

const notes = [
  {
    place: "Lot 12, corner stake",
    reading: "184° 12′ 20″",
    body: "Wet morning, 6:40. Hold the north face. The ditch is soft. The afternoon crew started from this plate.",
  },
  {
    place: "Culvert B",
    reading: "92° 04′ 10″",
    body: "Gravel shifted overnight. The legs were reset. The mark was kept. Do not start a second angle.",
  },
  {
    place: "Bench mark 18",
    reading: "11° 48′ 00″",
    body: "Left as found. The afternoon crew used it without a new setup. Bubble was already home.",
  },
]

export default function NotesPage() {
  return (
    <ArticlePage
      kicker="Field"
      title="Notes left on the stake."
      lede="A reading is only useful if the next person can find it without asking."
      figure={<NotesFigure />}
    >
      <div className="grid gap-4">
        {notes.map((note) => (
          <article key={note.place} className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-10">
            <p className="text-sm text-faint">{note.place}</p>
            <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] text-text md:text-5xl">{note.reading}</h2>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-7 text-muted">{note.body}</p>
          </article>
        ))}
      </div>
    </ArticlePage>
  )
}
