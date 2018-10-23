import moment from 'moment'

export default function formatTime (str, format = 'YYYY/MM/DD HH:mm:ss') {
  if (!str) return ''
  return moment(str).format(format)
}
