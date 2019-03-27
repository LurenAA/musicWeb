import lazy from './lazy'
export default function install (Vue, options) {
  let Lazy = lazy(Vue)
  let newLazy = new Lazy(options)

  Vue.directive('lazy', {
    bind: newLazy.add.bind(newLazy),
    update: newLazy.update.bind(newLazy),
    inserted: newLazy.inserted.bind(newLazy)
  })
}
