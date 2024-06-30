export const resourceTags = {
  ADVOCACY: 'advocacy',
  EDUCATION: 'education',
  FAMILY_REUNIFICATION: 'familyReunification',
  HOUSING: 'housing',
  IDENTITY_BASED_SUPPORT: 'identityBasedSupport',
  JOB_TRAINING: 'jobTraining',
  LEGAL_HELP: 'legalHelp',
  LIFE_SKILLS: 'lifeSkills',
  MENTAL_HEALTH_SUPPORT: 'mentalHealthSupport',
  REENTRY_PROGRAM: 'reentryProgram',
  SERVICE_PROVIDERS: 'serviceProviders',
} as const

export type ResourceTag = (typeof resourceTags)[keyof typeof resourceTags]

type Resource = {
  id: number
  description: string
  name: string
  isOnline: boolean
  email?: string
  state?: string
  street?: string
  city?: string
  zip?: string
  phone?: string
  url?: string
  instagram?: string
  facebook?: string
  twitter?: string
  linkedin?: string
  tagList: ResourceTag[]
  isCurrentUserLiked?: boolean
  isCurrentUserDisliked?: boolean
  votesScore: number
  votesUp: number
  votesDown: number
  commentsCount: number
  type: 'Resource'
}

export default Resource
