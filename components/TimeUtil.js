function formatTimeHHMMSS(d) {
  const z = n => (n < 10 ? '0' : '') + n
  const h = d.getHours()
  return `${h % 24 || 24}:${z(d.getMinutes())}:${d.getSeconds()}` // It might be here jef
}

function stringToSeconds(s) {
  const splitted = s.split(':')

  return (
    parseInt(splitted[0], 10) * 3600 +
    parseInt(splitted[1], 10) * 60 +
    parseInt(splitted[2], 10)
  )
}

function secondsToString(totalsec) {
  let hrs = Math.floor(totalsec / 3600)
  totalsec %= 3600
  const min = Math.floor(totalsec / 60)
  const sec = totalsec % 60

  while (hrs > 12) {
    hrs -= 12
  }

  const time = `${hrs}:${min}:${sec}`
  return time
}

function getDate() {
  const d = new Date()

  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
}

function isWeekend() {
  const d = new Date()

  if (d.getDay() === 0 || d.getDay() === 6) {
    return true
  }

  return false
}

module.exports.formatTimeHHMMSS = formatTimeHHMMSS
module.exports.stringToSeconds = stringToSeconds
module.exports.secondsToString = secondsToString
module.exports.getDate = getDate
module.exports.isWeekend = isWeekend
