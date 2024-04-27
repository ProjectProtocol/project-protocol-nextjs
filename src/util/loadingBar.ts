import topbar from 'topbar'
import bootstrapVariables from './bootstrapVariables'

// Configuration options: https://buunguyen.github.io/topbar/
topbar.config({
  barColors: {
    '0': bootstrapVariables.primary,
    '.3': bootstrapVariables.secondary,
    '1.0': bootstrapVariables.rating3,
  },
  shadowBlur: 0,
})

const loadingBar = topbar

export default loadingBar
