import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import Vant from 'vant';
import _ from 'lodash';//数字插件
import i18n from '@/lang'  //加载语言包



import '@/styles/index.css';//样式

const app = createApp(App)

//vue3全局挂载
app.config.globalProperties._ = _;


import '@/permission'; 

app.use(router);
app.use(store);
app.use(Vant);
app.use(i18n);
app.mount('#app')
