function xrThrottle(fn, delay, leading = true, trailing = true) {

  let startTime = 0
  let timer = null

  return function (...args) {
    const nowTime = new Date().valueOf()

    if (!leading && startTime === 0) {
      startTime = nowTime
    }

    // 仅在首次时调用
    const waitTime = delay - (nowTime - startTime)
    if (waitTime <= 0) {
      if (timer) clearTimeout(timer)
      fn.apply(this, args)
      startTime = nowTime
      timer = null
      return
    }

    // startTime关键设置，后续节流执行以及最后一次的执行
    if (trailing && !timer) {
      timer = setTimeout(() => {
        fn.apply(this, args)
        startTime = new Date().valueOf()
        timer = null
      }, waitTime)
    }
  }
}