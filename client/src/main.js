import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/"

const token = localStorage.getItem("token");
if (token && token.trim() !== "") {
    store.dispatch("setAuth", true);
    store.dispatch("setToken", token);
}

if (store.getters.isAuth && store.getters.token != '') {
    axios.interceptors.request.use(function (config) {
        config.headers.Authorization = `Bearer ${store.getters.token}`;
        return config;
    });
}

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
