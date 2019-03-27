export function jsonp (baseUrl, params, fn = '_jp0', callback = 'callback') {
  return new Promise(function (resolve, reject) {
    let url = baseUrl.indexOf('?') === -1 ? baseUrl + '?' : baseUrl + '&'
    url += sliceUrl(params) + `&${encodeURIComponent(callback)}=${encodeURIComponent(fn)}`

    let parent = document.querySelector('head')
    window[fn] = function (e) {
      window[fn] = () => {}
      newNode.remove()
      clearTimeout(timer)
      return resolve(e)
    }

    let newNode = document.createElement('script')
    newNode.src = url
    parent.prepend(newNode)

    let timer = setTimeout(() => {
      window[fn] = () => {}
      newNode.remove()
      return reject(new Error('outOfTime'))
    }, 3000)
  })
}

export function sliceUrl (params) {
  if (typeof params !== 'object') {
    console.error('sliceUrl need a object param')
    return ''
  }
  let res = ''
  for (let x in params) {
    res += `&${encodeURIComponent(x)}=${encodeURIComponent(params[x])}`
  }
  return res.substring(1)
}

export function mvParams (vid) {
  return {
    data: `{"getMvUrl":{"module":"gosrf.Stream.MvUrlProxy","method":"GetMvUrls","param":{"vids":["${vid}"],"request_typet":10001}}}`,
    'g_tk': 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'jsonp',
    inCharset: 'utf8',
    outCharset: 'GB2312',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0
  }
}
