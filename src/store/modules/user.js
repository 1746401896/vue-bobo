import { getInfo, updateLoginPwd, updateSafePwd } from '@/api/user'
import CryptoJS from 'crypto-js';

const state = {
    userInfo: {},
    
}

const mutations = {


    SET_USER_INFO: (state, data) => {
        state.userInfo = data
    },
}

const actions = {


    userInfo({ commit}, data) {
        commit('SET_USER_INFO', data);
    },

    // 获取用户信息
    getInfo({ commit }) {
        return new Promise((resolve, reject) => {
            getInfo().then(res => {
                commit('SET_USER_INFO', res.data.result)
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })
        })
    },
    //    更改安全密码
    updateSafePwd({ commit }, data) {
        // deviceId= 0b07a868db269792a4528edb81527795 最好带这个数据传输  防止爆破
        const key = CryptoJS.enc.Utf8.parse('1234567890654321'); //为了避免补位，直接用16位的秘钥
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); //16位初始向量
        const { password, new_password, new_confirm_password } = data
        return new Promise((resolve, reject) => {
            updateSafePwd({
                password: CryptoJS.AES.encrypt(password, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(),
                new_password: CryptoJS.AES.encrypt(new_password, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(),
                new_confirm_password: CryptoJS.AES.encrypt(new_confirm_password, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(),
            }).then(res => {
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })
        })
    },
    //更改登录密码
    updateLoginPwd({ commit }, data) {
        // deviceId= 0b07a868db269792a4528edb81527795 最好带这个数据传输  防止爆破
        const key = CryptoJS.enc.Utf8.parse('1234567890654321'); //为了避免补位，直接用16位的秘钥
        const iv = CryptoJS.enc.Utf8.parse('1234567890123456'); //16位初始向量

        const { password, new_password, new_confirm_password } = data

        return new Promise((resolve, reject) => {
            updateLoginPwd({
                password: CryptoJS.AES.encrypt(password, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(),
                new_password: CryptoJS.AES.encrypt(new_password, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(),
                new_confirm_password: CryptoJS.AES.encrypt(new_confirm_password, key, {
                    iv: iv,
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7
                }).toString(),
            }).then(res => {
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })
        })
    },
    

}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}

