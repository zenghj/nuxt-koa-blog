import { geneCategoryFromHtml } from '../../assets/js/utils'
const tocReg = /\[toc\]/
// import marked from 'marked'
// import hljs from 'highlight.js'
// import 'highlight.js/styles/default.css'

// var renderer = new marked.Renderer()

// // Override function
// renderer.heading = function (text, level) {
//   var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

//   return `
//           <h${level}>
//             <a name="${escapedText}" class="anchor" href="#${escapedText}">
//               <span class="header-link"></span>
//             </a>
//             ${text}
//           </h${level}>`
// }

// marked.setOptions({
//   sanitize: true,
//   // smartLists: true,
//   highlight (code) {
//     return hljs.highlightAuto(code).value
//   },
//   // renderer: renderer
// })

let markedCache
function asyncMarked (rawStr) {
  return Promise.all([
    import(/* webpackChunkName: "marked" */ 'marked'),
    import(/* webpackChunkName: "highlightjs" */ 'highlight.js'),
    import(/* webpackChunkName:"highlightjsCSS" */ 'highlight.js/styles/default.css'),
  ]).then(([marked, hljs]) => {
    if (!markedCache) {
      let renderer = new marked.Renderer()

      // Override function
      renderer.heading = function (text, level) {
        let id = Math.random()
        return `<h${level} id="${id}">${text}</h${level}>\n`
      }
      marked.setOptions({
        sanitize: false,
        headerIds: true,
        highlight (code) {
          return hljs.highlightAuto(code).value
        },
        renderer: renderer
      })
      markedCache = marked
    }

    let addCategory = tocReg.test(rawStr)
    let str = addCategory ? rawStr.replace(tocReg, '') : rawStr
    let markedHtml = markedCache(str)
    let category = ''
    try {
      addCategory && (category = geneCategoryFromHtml(markedHtml))
    } catch (err) {}
    return (addCategory ? category : '') + markedHtml
  })
}

export default asyncMarked
