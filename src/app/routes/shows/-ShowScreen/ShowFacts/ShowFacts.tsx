import { type ShowFactsProps, usePresenter } from './logic/usePresenter'

export const ShowFacts = (props: ShowFactsProps) => {
  const { facts } = usePresenter(props)

  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
      {facts.map((fact) => (
        <div key={fact.label} className="contents">
          <dt className="text-muted-foreground">{fact.label}</dt>
          <dd className="font-medium">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
