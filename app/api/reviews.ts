import { IRateAgentFormState } from 'src/components/RateAgentModal/form-types'
import apiClient from './client'

export function list(agentId: string) {
  return apiClient
    .get(`agents/${agentId}/reviews`)
    .then((r) => r.data)
    .catch(() => false)
}

export function create(agentId: string, review: IRateAgentFormState) {
  return apiClient
    .post(`agents/${agentId}/reviews`, { review })
    .then((r) => r.data)
    .catch(() => false)
}
