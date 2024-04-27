import Comment from './Comment'
import { Tag } from './Tag'

export const RatingCategories = [
  'Helpful',
  'Caring',
  'Respectful',
  'Availability',
] as const

export type RatingCategory = (typeof RatingCategories)[number]

export type Rating = {
  label: RatingCategory
  value: number
}

export type Review = {
  id: number
  ratings: Rating[]
  comment?: Comment
  overallRating: number
  tags: Tag[]
  type: 'Review'
}
