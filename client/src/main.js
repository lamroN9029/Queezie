import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import FomanticUI from 'vue-fomantic-ui'
import 'fomantic-ui-css/semantic.min.css'

import './index.css'

createApp(App).use(router, FomanticUI).mount('#app')
