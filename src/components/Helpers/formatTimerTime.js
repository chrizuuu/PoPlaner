function pad2(num) {
  return num > 9 ? num : `0${num}`
}

function formatTimerTime(time) {
  const minutes = pad2(Math.floor(time / 60))
  const seconds = pad2(Math.floor(time % 60))

  return `${minutes}:${seconds}`
}

export default formatTimerTime
