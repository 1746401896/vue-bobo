import { user, register } from '@/api/login'
import { setToken, removeToken } from '@/utils/auth'
import CryptoJS from 'crypto-js';


const state = {}

const mutations = {

    //设置token
    SET_TOKEN: (state, token) => {
        state.token = token
    },

}

const actions = {
    // 用户登录
    user({ commit }, data) {
        // deviceId= 0b07a868db269792a4528edb81527795 最好带这个数据传输  防止爆破
        const key = CryptoJS.enc.Utf8.parse('1234567890654321'); //为了避免补位，直接用16位的秘钥
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); //16位初始向量
        const { username, password } = data
        return new Promise((resolve, reject) => {
            user({
                username: username.trim(),
                password: CryptoJS.AES.encrypt(password, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(),
                // area:area.trim(),
            }).then(res => {
                setToken(res.data.token)
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })
        })
    },

    //注册
    register({ commit }, data) {
        // deviceId= 0b07a868db269792a4528edb81527795 最好带这个数据传输  防止爆破
        const key = CryptoJS.enc.Utf8.parse('1234567890654321'); //为了避免补位，直接用16位的秘钥
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); //16位初始向量
        const { username,password,confirm_password,invite } = data
        return new Promise((resolve, reject) => {
            register({
                username: username.trim(),
                // email: email.trim(),
                password: CryptoJS.AES.encrypt(password, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(),
                confirm_password: CryptoJS.AES.encrypt(confirm_password, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(),
                // code:code.trim(),
                // area:area.trim(),
                // invite: invite.trim(),
            }).then(res => {
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })
        })
    },
    // 退出登录
    logout() {
        return new Promise((resolve) => {
            removeToken()
            resolve()
        })
    },

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

