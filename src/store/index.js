import {createStore} from 'vuex'
import getters from './getters'


// const modulesFiles = require.context("./modules", true, /\.js$/);
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//     const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
//     const value = modulesFiles(modulePath);
//     modules[moduleName] = value.default;
//     return modules;
// }, {});
const modulesFiles = import.meta.globEager('./modules/*.js'); // 异步方式


// let modules = []

// for(let key in modulesFiles){
//     if (Object.prototype.hasOwnProperty.call(modulesFiles, key)) {
//         let valKey = key.replace(/modules\//, '')
//         console.log(modulesFiles[key].default)
//         modules[valKey.replace(/^\.\/(.*)\.\w+$/, '$1')] = modulesFiles[key].default
//     }
// }



// Object.keys(modules).forEach(item => {
//   // 为每个模块添加一个前缀名，保证模块命明不冲突 
//     modules[item]['namespaced'] = true
// })

const modules = {}
for (const [key, value] of Object.entries(modulesFiles)) {
    //名称  因为这里拿到的是  ./modules/app.js ，所以需要两层处理
  const moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
  const name = moduleName.split('/')[1]
  //具体的内容，都是每个js中返回值  value.default
  modules[name] = value.default;
  
}




const store = createStore(
    {
        modules,
        getters
    }
);
export default store;
