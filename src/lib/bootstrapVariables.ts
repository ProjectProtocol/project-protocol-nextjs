import rawBootstrapVariables from '../styles/bootstrap-theme/export.module.scss'

// Dasherized theme color names as they appear in the sass stylesheets
export const themeColors = [
  'primary',
  'secondary',
  'success',
  'info',
  'warning',
  'danger',
  'light',
  'lightCobalt',
  'dark',
  'white',
  'cobalt',
  'loquat',
  'meyerLemon',
  'mediumGray',
  'rating1',
  'rating2',
  'rating3',
  'rating4',
  'rating5',
] as const

export type ThemeColor = (typeof themeColors)[number]
type BootstrapVariables = Record<ThemeColor, string>

const bootstrapVariables: BootstrapVariables =
  rawBootstrapVariables as BootstrapVariables

export const ratingColors = [
  bootstrapVariables.rating1,
  bootstrapVariables.rating2,
  bootstrapVariables.rating3,
  bootstrapVariables.rating4,
  bootstrapVariables.rating5,
]

export default bootstrapVariables
