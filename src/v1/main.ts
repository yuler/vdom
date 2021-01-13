import createElement from './createElement'
import render from './render'
import mount from './mount'
import diff from './diff'

const createVApp = (count: number) => createElement(
  'div', 
  {
    id: 'app',
  },
  [
    createElement(null, null, null, 'Hello world'),
    createElement(null, null, null, `Count: ${count}`),
    createElement(
      'img',
      {
        src: 'https://github.githubassets.com/pinned-octocat.svg',
        style: 'width: 100px;'
      }
    )
  ]
)

let vApp = createVApp(0)
const $app = render(vApp)
let $mountEl = mount($app, document.getElementById('app')) as HTMLElement

let count = 0
setInterval(() => {
  count++
  const newVApp = createVApp(count)
  const patch = diff(vApp, newVApp)
  $mountEl = patch($mountEl) as HTMLElement
  vApp = newVApp
}, 1000)