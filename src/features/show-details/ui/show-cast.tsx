import { UserIcon } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { CastMember } from '@/services/show'

export const ShowCast = ({ cast }: { cast: CastMember[] }) => {
  const { t } = useTranslation()

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{t('showDetails.cast')}</h2>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cast.map((member) => (
          <li key={`${member.personId}-${member.characterName}`} className="flex items-center gap-3">
            {member.photoUrl ? (
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
              <p className="truncate text-sm text-muted-foreground">
                {t('showDetails.asCharacter', { name: member.characterName })}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
