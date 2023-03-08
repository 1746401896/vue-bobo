import { createI18n } from 'vue-i18n'
import { getLang } from '@/utils/lang'



// js方法
// const context = require.context("./modules", true, /\.js$/);

//ts 方法
// const context = import.meta.glob('./modules/*.ts',{ eager: true }); // 异步方式
const modulesFiles = import.meta.globEager('./modules/*.js');


const messages = {}
for (const [key, value] of Object.entries(modulesFiles)) {
    //名称  因为这里拿到的是  ./modules/app.js ，所以需要两层处理
    const moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
    const name = moduleName.split('/')[1]

    //具体的内容，都是每个js中返回值  value.default
    messages[name] = value.default;
}


// const messages = context
//     .keys()
//     .map((key) => ({ key, locale: key.match(/[a-z0-9-_]+/i)[0] }))
//     .reduce(
//         (messages, { key, locale }) => ({
//             ...messages,
//             [locale]: context(key),
//         }),
//         {}
//     );



// 使用语言包
const i18n = createI18n({
    legacy: false,  // 修复组件引入i18n时vite脚手架报错的问题
    locale: messages[getLang()] ? getLang() : "en-us", //没有就默认切换英文
    globalInjection: true, // 全局注入 $t 函数
    silentTranslationWarn: true, // 去掉警告
    missingWarn: false,
    silentFallbackWarn: true, //抑制警告
    // locale: VueCookie.get('language') || 'zh-cn', // 使用vueCookie动态切换语言环境，默认中文
    messages
})


export default i18n;