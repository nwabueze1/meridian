import { Crew } from "@/components/crew"
import { DayLog } from "@/components/day-log"
import { FieldNote } from "@/components/field-note"
import { Hero } from "@/components/hero"
import { Parts } from "@/components/parts"
import { PlateSection } from "@/components/plate-section"
import { RequestClose } from "@/components/request-close"
import { SiteMarquee } from "@/components/site-marquee"

export default function Home() {
  return (
    <main>
      <Hero />
      <SiteMarquee />
      <PlateSection />
      <Parts />
      <Crew />
      <DayLog />
      <FieldNote />
      <RequestClose />
    </main>
  )
}
