import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Inter } from "next/font/google"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Meridian 4 — a site level for the next crew",
  description:
    "Set the Meridian 4 once. The angle stays on the plate for whoever works the stake after you.",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full`}>
      <body className={`${inter.className} min-h-full bg-ink text-text antialiased`}>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
