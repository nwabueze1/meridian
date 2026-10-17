import type { ReactNode } from "react"

type ArticlePageProps = {
  kicker: string
  title: string
  lede: string
  figure?: ReactNode
  children: ReactNode
}

export const ArticlePage = ({ kicker, title, lede, figure, children }: ArticlePageProps) => {
  return (
    <article className="px-5 pb-24 pt-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(260px,0.9fr)]">
          <div>
            <p className="text-sm text-mark">{kicker}</p>
            <h1 className="mt-4 max-w-[14ch] text-4xl font-medium tracking-[-0.045em] text-text md:text-6xl">
              {title}
            </h1>
            <p className="mt-6 max-w-[42ch] text-[17px] leading-7 text-muted">{lede}</p>
          </div>
          {figure ? <div className="mx-auto w-full max-w-md">{figure}</div> : null}
        </div>
        <div className="mt-16">{children}</div>
      </div>
    </article>
  )
}
