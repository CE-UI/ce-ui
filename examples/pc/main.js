// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import i18n from './i18n'
import demoBlock from './components/demo-block'
import CeUi from '@lib/index'
import '@theme/lib/index.css'
import '@pc/assets/css/index.styl'

Vue.config.productionTip = false
Vue.use(CeUi)

function importDemos(r) {
  // 在遍历的时候多注册一个 demoBlock组件
  return [
    demoBlock,
    ...r.keys().map((key) => {
      return r(key).default
    })
  ]
}

importDemos(require.context('@examples/demos', true, /\.vue$/)).map(
  (component) => {
    return Vue.component(component.name, component)
  }
)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  ...App
})
