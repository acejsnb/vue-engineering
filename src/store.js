import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        backShow: false // 返回按钮是否显示
    },
    mutations: {
        backShowM(state){
            state.backShow = !state.backShow
        }
    },
    actions: {
        backShowA({commit}) {
            commit('backShowM')
        }
    },
    getters: {
        backShowG(state){
            return state.backShow
        }
    }
});
