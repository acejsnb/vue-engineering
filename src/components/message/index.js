import Vue from 'vue';
import Msg from './Message';
let MessageConstructor = Vue.extend(Msg);

let instance;
let instances = [];
let seed = 1;

const Message = (options) => {
    if (Vue.prototype.$isServer) return;
    options = options || {};
    if (typeof options === 'string') {
        options = {
            message: options
        };
    }
    let userOnClose = options.onClose;
    let id = 'message_' + seed++;

    options.onClose = function() {
        Message.close(id, userOnClose);
    };
    instance = new MessageConstructor({
        data: options
    });
    instance.id = id;
    instance.vm = instance.$mount();
    // instance.vm.$el.style.top=seed*32+(seed*10)+'px';
    instance.vm.$el.style.zIndex=seed;
    document.body.appendChild(instance.vm.$el);
    instance.vm.visible = true;
    instance.dom = instance.vm.$el;
    instances.push(instance);
    return instance.vm;
};

['success', 'warning', 'info', 'error'].forEach(type => {
    Message[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            };
        }
        options.type = type;
        return Message(options);
    };
});
Message.close = (id, userOnClose) => {
    for (let i = 0, len = instances.length; i < len; i++) {
        if (id === instances[i].id) {
            if (typeof userOnClose === 'function') {
                userOnClose(instances[i]);
            }
            instances.splice(i, 1);
            break;
        }
    }
};
Message.closeAll = () => {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close();
    }
};

export default Message;
