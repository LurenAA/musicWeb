export default function json (url, methods) {
  if (methods === 'GET') {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      let fn = function () {
        if (xhr.readyState === 4) {
          resolve(xhr.responseText)
          clearTimeout(timer)
          xhr.removeEventListener('readystatechange', fn)
        }
      }
      let timer = setTimeout(() => {
        console.error('json: out of time ')
        xhr.abort()
        xhr.removeEventListener('readystatechange', fn)
      }, 15000)
      xhr.open(methods, url, true)
      xhr.addEventListener('readystatechange', fn)
      xhr.send()
    })
  }
}
