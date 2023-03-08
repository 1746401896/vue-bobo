import router from '@/router'
import { getToken } from '@/utils/auth'
import store from '@/store'
import { showLoadingToast,closeToast } from "vant";
import i18n from '@/lang'
const { t } = i18n.global

//定义完路由后，我们主要是利用vue-router提供的钩子函数beforeEach()对路由进行判断。
router.beforeEach(async (to, from, next) => {
    // store.dispatch('app/isSkeleton', true); //切换路由中打开华骨架
    showLoadingToast({
        message: t('common.loading'),
        overlay: true,
        forbidClick: true,
        duration: 0,
    });

    // console.log(store.getters)
    // 确定用户是否已登录
    const hasToken = getToken();

    //判断该路由是否需要验证
    if (to.meta.requireAuth) {
        //是否有token
        if (hasToken) {
            //有就直接可以访问
            
            // if (Object.keys(store.getters.currencySelected).length == 0 && (to.name =='/currency/option/detail' || to.name =='/currency/trade/kline' || to.name =='/currency/lever/detail')) {
            //     next({
            //         path: '/',
                   
            //     })
            // } else {
            //     next();
            // }



        } else {
            //没有就跳转到登录界面
            next({
                path: '/login',
                // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {

        //不需要登录验证直接给与同行
        next();
    }


});

router.afterEach(() => {
    // store.dispatch('app/isSkeleton', false); //切换完毕关闭华骨架
    // store.dispatch('app/isLeftMenu', false); //切换任何页面都取消右侧菜单打开状态
    closeToast();
})
