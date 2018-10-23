const headReg = /<(h\d).*<\/\1>/g
const headLevelReg = /<h(\d)[^>]*id="(.*)"[^>]*>(.*)<\/h\1>/

export function geneCategoryFromHtml (html = '') {
  if (html === '') return html
  let heads = html.match(headReg)
  let category = { data: null, children: [] }
  let depth = 1

  function getLevelNnode (level) {
    let node = category
    let count = level
    let children
    if (count <= 0) return
    if (count === 1) return node
    while (count > 1) {
      children = node.children = node.children ? node.children : []
      let last = children.length > 0 ? children.length - 1 : 0
      node = children[last] = children[last]
        ? children[last]
        : {
          data: null,
          children: [],
        }
      count--
    }
    return node
  }
  if (heads) {
    console.log('heads', heads)
    heads.forEach((head, index) => {
      let [, level, id, text] = head.match(headLevelReg) || []
      let data = { level, text, id }
      let newNode = {
        data,
        children: [],
      }
      if (typeof level !== 'undefined' && level >= 0 && level <= 6) {
        if (index === 0) {
          depth = level
          if (depth === 1) {
            category = newNode
          } else {
            getLevelNnode(depth).data = {
              level,
              text,
            }
          }
        } else {
          if (level === depth) {
            getLevelNnode(level - 1).children.push(newNode)
          } else if (level > depth) {
            getLevelNnode(level).data = data
            depth = level
          } else {
            getLevelNnode(level - 1).children.push(newNode)
            depth = level
          }
        }
      }
    })
  }
  console.log('category', category)
  return `<div class="generated-category">${geneCategoryHtmlCode(
    category,
  )}</div>`
}

/**
 * data
{
  data: {
    level,
    text
  },
  children: [{
    data,
    children
  }]
}
 */
function geneCategoryHtmlCode ({ data, children }) {
  data = data || {}
  children = children || []
  if (!data.text && children.length === 0) return ''
  return `<ul>
            <li><a class="click-anchor" target-id="${data.id}">${data.text || ''}</a>
              ${children.map(item => geneCategoryHtmlCode(item)).join('')}
            </li>
          </ul>`
}

export function isUndefiend (obj) {
  return typeof obj === 'undefined'
}
