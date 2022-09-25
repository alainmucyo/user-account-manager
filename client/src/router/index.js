import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Register from "@/views/Register";
import LoginOTP from "@/views/LoginOTP";
import ResetPassword from "@/views/ResetPassword";
import ConfirmResetPassword from "@/views/ConfirmResetPassword";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/login-otp',
        name: 'LoginOTP',
        component: LoginOTP,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/reset-password',
        name: 'ResetPassword',
        component: ResetPassword,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/confirm-reset-password',
        name: 'ConfirmResetPassword',
        component: ConfirmResetPassword,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            requiresAuth: false
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        setTimeout(() => {
            if (router.app.$store.getters.isAuth)
                next();
            else
                next("login")
        }, 1)

    } else {
        setTimeout(() => {
            if (router.app.$store.getters.isAuth)
                next("/");
            else
                next()
        }, 1)
    }
})
export default router
