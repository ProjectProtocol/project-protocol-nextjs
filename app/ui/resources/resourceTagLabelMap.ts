/**
 * Maps contentful tag ID to name for display.
 *
 * This may need to be refreshed when updates are made to tags,
 * for displaying.
 */

export const resourceTagLabelMap = {
  resourceTypeJobTraining: 'Job training',
  resourceTypeMentalHealthSupport: 'Mental health support',
  resourceTypeEducation: 'Education',
  resourceTypeLifeSkills: 'Life skills',
  resourceTypeFamilyReunification: 'Family reunification',
  resourceTypeHousing: 'Housing',
  resourceTypeLegalHelp: 'Legal help',
  resourceTypeReentryProgram: 'Reentry program',
  resourceTypeAdvocacy: 'Advocacy',
  resourceTypeIdentityBasedSupport: 'Identity-based support',
  resourceTypeServiceProviders: 'Service providers',
} as const

export type ResourceTagId = keyof typeof resourceTagLabelMap
