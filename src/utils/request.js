import axios from 'axios'; // 引入axios
import store from '@/store';
import {showToast,closeToast,showLoadingToast,showDialog} from 'vant';
// import QS from 'qs'; // 引入qs模块，用来序列化post类型的数据，后面会提到
import router from '@/router'
import {getToken} from  '@/utils/auth'
import {getLang} from  '@/utils/lang'
import settings from "@/settings";
import i18n from '@/lang'
const { t } = i18n.global
const BASEAPI = import.meta.env.MODE === 'development' ? '' : settings.web

const service = axios.create({
    timeout: 10000, // 请求超时时间
    baseURL:BASEAPI,
    // headers :{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
})


// 请求拦截器
service.interceptors.request.use(
    config => {
         // config.baseURL = process.env.NODE_ENV ==='development' ?
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        config.params = {
            lang:getLang(),//获得语言 以get形式发送给服务器
            ...config.params,
        };
        if (getToken()) { //判断token是否存在
            config.params = {
                rd: Date.parse(new Date().toString())/1000,
                token:getToken(),//将token设置成请求头 以get形式发送给服务器
                ...config.params,
            };
            // config.headers.common['Authorization'] = localStorage.token;  //将token设置成请求头A
            // config.headers['Authorization'] = store.getters.token;  //将token设置成请求头A
        }

        
        // config.headers['Origin'] = 'https://www.ray51.com';
        // config.headers[':authority'] = 'esportsgamelink.com';
        // console.log(config);
        if(config.method == 'post'){
            showLoadingToast({
                message: t('common.loading'),
                overlay:true,
                forbidClick:true,
                duration:0,
            });
        }
        // console.log(config);
        // config.data = QS.stringify(config.data)
        return config;
    },
    error => {
        return Promise.reject(error);

    }
    );

// 响应拦截器
service.interceptors.response.use(
    response => {

        if(response.config.method == 'post'){
            closeToast();
        }
        if (response.data.code !== 200) {
            showToast({
                message: response.data.message,
                duration: 1000,
                forbidClick: true
            });
            // 403:需要登录或者重新登录;
            if (response.data.code === 401) {
                store.dispatch('login/logout').then(()=>{
                    store.dispatch('user/resetUserInfo').then(()=>{

                        //弹出错误提示 并且跳转URL 到登录窗口
                        showDialog({
                            message: response.data.message,
                        }).then(() => {
                            router.push('/login');
                        });
                        
                    })
                })
            }

            //抛出错误
            return Promise.reject(response.data.message || 'Error');
            // return Promise.reject(new Error (response.data.message || 'Error'));
            // return response;
        }else {
            //等于200都算成功
            return response;
        }
    },
    error => {
        showToast({
            message: t('common.loading'),
            duration: 1500,
            forbidClick: true
        });


        return Promise.reject(error);



    }

);

export default service


