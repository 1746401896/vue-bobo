import {getConfig} from '@/api/config'


const state = {
    webConfig: [],
}

const mutations = {
    SET_WEB_CONFIG: (state, data) => {
        state.webConfig = data;
    },
}

const actions = {

    // 获得网站配置
    getConfig({commit}) {
        return new Promise((resolve, reject) => {
            getConfig().then(res => {
                const {result} = res.data
                commit('SET_WEB_CONFIG', result)
                resolve(res.data)
            }).catch(error => {
                reject(error)
            })
        })
    },
    setConfig({commit},data){

        commit('SET_WEB_CONFIG', data)

    }

}

export default {namespaced: true, state, mutations, actions}

