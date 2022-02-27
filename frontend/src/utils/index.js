// formats date obj to string for use as date input value: YYYY-MM-DD
export const formatDateForInput = (date) => {
  const dayString = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const monthString = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  return `${date.getFullYear()}-${monthString}-${dayString}`
}