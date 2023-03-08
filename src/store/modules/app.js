const state = {
    
    isChinese: true,//中文
    isLeftMenu: false, //左边菜单打开
    isSiteClose: false,//网站关闭
    tabbarIndex:"/",//首页TAB选项
    version:0.01,//版本
    language:{
        'en-us':'English',
        'ko-kr':'한국인',
        'ja-jp':'日本',
        'vi-vn':'Tiếng Việt',
        'th-th':'ไทย',
        'zh-tw':'繁體中文(臺灣)',
        'hi-in':'عربي',
    },
    isZhang:false,
    isDie:false,
    // isSkeleton:false,//华骨架
    isCharts:false,



}

const mutations = {

    UPDATA_IS_LEFT_MENU: (state, show) => {
        state.isLeftMenu = show;
    },

    UPDATE_IS_SITE_CLOSE: (state, show) => {
        state.isSiteClose = show
    },
    UPDATE_TABBAR_INDEX:(state, data) => {
        state.tabbarIndex = data
    },
    UPDATE_IS_ZHANG:(state, show) => {
        state.isZhang = show
    },
    UPDATE_IS_DIE:(state, show) => {
        state.isDie = show
    },
    // UPDATE_IS_SKELETON:(state, show) => {
    //     state.isSkeleton = show
    // },
    UPDATE_IS_CHARTS:(state, show)=>{
        state.isCharts = show
    }



}
const actions = {
    isLeftMenu({ commit }, data) {
        commit('UPDATA_IS_LEFT_MENU', data);
    },

    isSiteClose({ commit }, data) {
        commit('UPDATE_IS_SITE_CLOSE', data);
    },
    tabbarIndex({ commit }, data) {
        commit('UPDATE_TABBAR_INDEX', data);
    },
    isZhang({ commit}, data) {
        commit('UPDATE_IS_ZHANG', data);
    },
    isDie({ commit }, data) {
        commit('UPDATE_IS_DIE', data);
    },
    // isSkeleton({ commit }, data) {
    //     commit('UPDATE_IS_SKELETON', data);
    // },
    isCharts({ commit }, data){
        commit('UPDATE_IS_CHARTS', data);
    }

}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}
