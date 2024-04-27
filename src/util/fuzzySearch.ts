export default function fuzzySearch(name: string, input: string) {
  if (input === '') return true
  const regex = new RegExp(`\\b${input}.*`, 'i')
  return regex.test(name)
}
