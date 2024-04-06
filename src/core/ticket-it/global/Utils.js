import dayjs from 'dayjs'

export const formatDate = (date) => {
  return dayjs(date).format('ddd DD/MM/YYYY')
}

export const formatNormalDate = (date) => {
  return date.toISOString().slice(0, 10)
}

export const getOneMonthAgo = () => {
  return dayjs().subtract(1, 'month').format('YYYY-MM-DD')
}

export const formatDateTime = (dateTime) => {
  return dayjs(dateTime).format('ddd DD/MM/YYYY hh:mm A')
}

export const ApiformatDate = (date) => {
  return dayjs(date).format('YYYY-MM-DD')
}

export const ApiformatTime = (time) => {
  return dayjs(time).format('HH:mm:ss')
}

export const getCurrentYear = () => {
  const currentDateTime = new Date()
  return currentDateTime.getFullYear()
}

export const getCurrentMonth = () => {
  const currentDateTime = new Date()
  const currentMonth = currentDateTime.getMonth() + 1
  return currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`
}
