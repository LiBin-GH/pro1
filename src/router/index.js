import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login'
import { checktoken } from '@/api/apis'
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login,
            meta:{role:['normal','super']},
        },
        
        {
            path: '/index',
            name: 'index',
            component: () => import('../pages/Index'),
            children: [
                {
                    path: '/index/personal',
                    name: 'personal',
                    component:  () => import('../pages/Personal'),
                    meta:{role:['normal','super']},
                },
                {
                    path: '/index/home',
                    name: 'home',
                    component: () => import('../pages/index/Home'),
                    meta:{role:['normal','super']},
                },
                {
                    path: '/index/order',
                    name: 'order',
                    component: () => import('../pages/index/Order'),
                    meta:{role:['normal','super']},
                },
                {
                    path: '/index/store',
                    name: 'store',
                    component: () => import('../pages/index/Store'),
                    meta:{role:['super']},
                },
                {
                    path: '/index/goods/goodslist',
                    name: 'goodslist',
                    component: () => import('../pages/index/goods/GoodsList'),
                    meta:{role:['normal','super']},
                },
                {
                    path: '/index/goods/goodsadd',
                    name: 'goodsadd',
                    component: () => import('../pages/index/goods/GoodsAdd'),
                    meta:{role:['normal','super']},
                },
                {
                    path: '/index/goods/goodsclass',
                    name: 'goodsclass',
                    component: () => import('../pages/index/goods/GoodsClass'),
                    meta:{role:['normal','super']},
                },
                {
                    path: '/index/accounts/accadd',
                    name: 'accadd',
                    component: () => import('../pages/index/accounts/AccAdd'),
                    meta:{role:['super']},
                },
                {
                    path: '/index/accounts/acclist',
                    name: 'acclist',
                    component: () => import('../pages/index/accounts/AccList'),
                    meta:{role:['super']},
                },
                {
                    path: '/index/accounts/pwdchange',
                    name: 'pwdchange',
                    component: () => import('../pages/index/accounts/PwdChange'),
                    meta:{role:['super']},
                },
                {
                    path: '/index/sales/salesgoods',
                    name: 'salesgoods',
                    component: () => import('../pages/index/sales/SalesGoods'),
                    meta:{role:['super']},
                },
                {
                    path: '/index/sales/salesorder',
                    name: 'salesorder',
                    component: () => import('../pages/index/sales/SalesOrder'),
                    meta:{role:['super']},
                },

            ],
        },

    ],
})

router.beforeEach(( to, from , next) =>{
    // console.log(to.meta.role.includes(localStorage.getItem('role')))
    // console.log(to)
    if(to.path != '/'){
        checktoken(localStorage.getItem('token')).then(res=>{
            if(res.data.code != 0){
                next('/')
            }else{
                
                if(to.meta.role.includes(localStorage.getItem('role'))){
                    next()
                }else{
                    next(from.path)
                }
                
                
            }
        })
    }else{
        next()
    }
})

export default router