import Vue from 'vue';

import 'stylus/main';

import router from './router';
import store from './store';

import App from './App';
import Components from 'index';

// console.log(Components);
Vue.use(Components);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
