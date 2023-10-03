import 'theme/theme1.css';
import '@/assets/styles/global.less';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(router);
app.mount('#app');
