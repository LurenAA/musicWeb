export default function (content) {
  let head = document.querySelector('head')
  if (!head) {
    head = document.createElement('head')
    document.querySelector('body').before(head)
  }
  let index = -1
  let obj = head.children
  for (let x in obj) {
    if (obj[x].tagName === 'STYLE' && obj[x].dataset['style'] !== undefined) {
      index = x
    }
  }
  if (index === -1) {
    let newStyle = document.createElement('style')
    newStyle.type = 'text/css'
    newStyle.innerHTML = ''
    newStyle.dataset['style'] = 1
    head.append(newStyle)
    newStyle.append(content)
    return newStyle
  } else {
    obj[index].sheet.insertRule(content, obj[index].sheet.rules.length)
    return obj[index].sheet.rules.length - 1
  }
}
