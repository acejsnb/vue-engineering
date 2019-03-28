import 'stylus/main';

import Button from './button/Button';
import Alert from './alert/Alert';
import Message from './message'; // 函数式组件
// import Message from './message/Message';
import List from './list';
import Carousel from './carousel';
import Select from './select';
import Input from './input';
import Datepicker from './datepicker';
import Toggle from './toggle';

const Components = {
    Button
    ,Alert
    ,Message
    ,List
    ,Carousel
    ,Select
    ,Input
    ,Datepicker
    ,Toggle
};

const install = Vue => Object.keys(Components).forEach(name => {
    if (name === 'Message') Vue.prototype.$message = Message;
    else Vue.component(name, Components[name]);
});

/* 支持使用标签的方式引入 */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

Components.install=install;

export default Components;
