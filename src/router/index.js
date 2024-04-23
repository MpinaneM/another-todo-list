import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginView from '@/views/LoginView/LoginView.vue';
import store from '@/store';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    base: import.meta.env.BASE_URL,
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/HomeView/HomeView.vue'),
            meta: {
                requiresAuth: true
            }
        },  
        {
            path: '/about',
            name: 'about',
            component: () => import('@/views/AboutView.vue')
        }
    ]
});


router.beforeEach((to,from,next) => {
    if(to.matched.some(record => record.meta.requiresAuth)){
        if(!store.getters.isLoggedIn){
            next({
                name: 'login'
            });
        }else{
            next();
        }
    } else {
        next();
    }
});
export default router;
