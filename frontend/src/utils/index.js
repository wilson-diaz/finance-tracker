export const getMaxDate = () => {
  const today = new Date()
  const dayString = today.getDate() < 10 ? '0' + today.getDate() : today.getDate()
  const monthString = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : today.getMonth() + 1
  return `${today.getFullYear()}-${monthString}-${dayString}`
}