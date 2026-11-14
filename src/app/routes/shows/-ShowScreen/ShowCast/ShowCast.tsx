import { UserIcon } from 'lucide-react'
import { type ShowCastProps, usePresenter } from './usePresenter'

export const ShowCast = (props: ShowCastProps) => {
  const { title, members } = usePresenter(props)

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <li key={member.key} className="flex items-center gap-3">
            {member.hasPhoto ? (
              <img
                src={member.photoUrl}
                alt={member.personName}
                loading="lazy"
                className="size-14 shrink-0 rounded-full bg-muted object-cover"
              />
            ) : (
              <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-muted">
                <UserIcon className="size-6 text-muted-foreground" />
              </div>
            )}
            <div className="min-w-0">
              <p className="truncate font-medium">{member.personName}</p>
              <p className="truncate text-sm text-muted-foreground">{member.characterText}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
