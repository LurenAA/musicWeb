export default function json (url, methods) {
  if (methods === 'GET') {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest()
      let fn = (xhr, timer, err) => {
        if (err) {
          return reject(err)
        } else {
          console.log(xhr)
          clearTimeout(timer)
          xhr.removeEventListener('readystatechange', fn)
          return resolve(xhr['responseText'])
        }
      }
      let timer = setTimeout(() => {
        xhr.abort()
        xhr.removeEventListener('readystatechange', fn)
        fn('', '', 1)
      }, 5000)
      xhr.open(methods, url, true)
      xhr.addEventListener('readystatechange', fn(xhr, timer))
      xhr.send()
    })
  }
}
