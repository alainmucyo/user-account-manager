import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import axios from "axios";
import VModal from 'vue-js-modal'

axios.defaults.baseURL = "http://localhost:3000/api/v1/"
import VueToast from 'vue-toast-notification';
// Import one of the available themes
//import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';

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
Vue.use(VModal)
Vue.use(VueToast);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
