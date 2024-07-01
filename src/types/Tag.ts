const I18NPATH = 'tags.values'

export const tagsTranslationMap = {
  Communicative: `${I18NPATH}.communicative`,
  Supportive: `${I18NPATH}.supportive`,
  'Goes above and beyond': `${I18NPATH}.aboveAndBeyond`,
  'Works around my schedule': `${I18NPATH}.flexible`,
  'Trusts me': `${I18NPATH}.trustsMe`,
  'Trauma-informed': `${I18NPATH}.traumaInformed`,
  Unresponsive: `${I18NPATH}.unresponsive`,
  'Doesn’t provide resources': `${I18NPATH}.noResources`,
  'Not on-time': `${I18NPATH}.notOnTime`,
  'Disrespects my home': `${I18NPATH}.disrespectsHome`,
  'Disrespects my family': `${I18NPATH}.disrespectsFamily`,
  Racist: `${I18NPATH}.racist`,
  Sexist: `${I18NPATH}.sexist`,
  'Short-tempered': `${I18NPATH}.shortTempered`,
  'Inappropriate comments': `${I18NPATH}.inappropriateComments`,
  'Unpredictable attitude': `${I18NPATH}.unpredictable`,
  Indifferent: `${I18NPATH}.indifferent`,
  'Threatens with retaliation': `${I18NPATH}.retaliatory`,
  'Unannounced visits': `${I18NPATH}.unannouncedVisits`,
  'Allows participation with community organizations': `${I18NPATH}.communityOrgSupport`,
} as const

export type TagKey = keyof typeof tagsTranslationMap

export type Tag = {
  name: TagKey
}
