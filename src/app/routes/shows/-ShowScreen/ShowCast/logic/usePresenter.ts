import { useTranslation } from 'react-i18next'
import type { CastMember } from '../../show-details'

export type ShowCastProps = {
  cast: CastMember[]
}

export const usePresenter = ({ cast }: ShowCastProps) => {
  const { t } = useTranslation()

  return {
    title: t('showDetails.cast'),
    members: cast.map((member) => ({
      key: `${member.personId}-${member.characterName}`,
      personName: member.personName,
      characterText: t('showDetails.asCharacter', { name: member.characterName }),
      photoUrl: member.photoUrl ?? undefined,
      hasPhoto: Boolean(member.photoUrl),
    })),
  }
}
