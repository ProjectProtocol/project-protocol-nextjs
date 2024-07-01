import Office from './Office'
import { Rating } from './Review'
import { Tag } from './Tag'

type Agent = {
  firstName?: string
  lastName: string
  fullName: string
  office: Office
  type: string
  id: string
  averageRating: number
  overallStats?: Rating[]
  topTags?: Tag[]
  isRateable?: boolean
}

export interface AgentDetail extends Agent {
  overallStats: Rating[]
  topTags: Tag[]
}

export default Agent
