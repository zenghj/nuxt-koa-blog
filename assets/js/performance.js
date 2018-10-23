const NAVIGATION_TYPES = {
  0: 'TYPE_NAVIGATE', // 用户通过常规导航方式访问页面，比如点一个链接，或者一般的get方式
  1: 'TYPE_RELOAD', // 用户通过刷新，包括JS调用刷新接口等方式访问页面
  2: 'TYPE_BACK_FORWARD', // 用户通过后退按钮访问本页面
}
const SUPPORTS = {
  performance: !!window.performance,
}

const firstScreenTimeoutMS = 6000
function collectPerformanceInfo () {
  let performance = window.performance
  let ua = window.navigator.userAgent
  let computed
  if (!SUPPORTS.performance) {
    return {
      raw: null,
      computed: null,
      ua,
      msg: 'not support window.performance',
    }
  }

  let { navigation, timing } = performance
  computed = {
    type: NAVIGATION_TYPES[navigation.type],
    redirectCount: navigation.redirectCount,
    dnsLookupTimeMS: timing.domainLookupEnd - timing.domainLookupStart,
    tcpConnectTimeMS: timing.connectEnd - timing.connectStart,
    responseTimeMS: timing.responseEnd - timing.requestStart,
    domParseTimeMS: timing.domComplete - timing.domInteractive,
    whiteScreenTimeMS: timing.domLoading - timing.fetchStart, // vue 客户端渲染的话这个就不准了
    firstScreenTimeMS: window.PerformancePaintTiming
      ? (performance.getEntriesByType('paint')[0] || {}).startTime
      : null,
    domReadyTimeMS: timing.domContentLoadedEventEnd - timing.fetchStart,
    onloadTimeMS: timing.loadEventEnd - timing.fetchStart,
  }
  return {
    raw: performance,
    computed,
    ua,
  }
}

export function asyncCollectPerformance () {
  return new Promise(resolve => {
    let onloaded = false
    let firstScreen = false
    let performance
    let isResolved = false
    let firstScreenTimeMS
    ;(function obeserverFirstPaint () {
      const observer = new PerformanceObserver(list => {
        firstScreenTimeMS = list.getEntries()[0].startTime
        firstScreen = true
        resolvePerformance()
      })
      observer.observe({ entryTypes: ['paint'] })
    })()

    function resolvePerformance () {
      if (onloaded && firstScreen) {
        performance.computed.firstScreenTimeMS = firstScreenTimeMS
        resolve(performance)
        isResolved = true
      }
    }

    window.onload = () => {
      setTimeout(() => { // load事件触发时 timing.loadEventEnd还没被初始化，因为事件还没结束
        onloaded = true
        performance = collectPerformanceInfo()
        // if (performance.computed.firstScreenTimeMS) {
        //   firstScreen = true
        // }
        resolvePerformance()
        ;(function timeout (delay) {
          setTimeout(() => {
            if (!isResolved) {
              firstScreen = true
              resolvePerformance()
            }
          }, delay)
        })(firstScreenTimeoutMS)
      }, 0)
    }
  })
}

export function calcAppMountedTimeMS (now) {
  if (SUPPORTS.performance && now) {
    return now - window.performance.timing.fetchStart
  }
}
