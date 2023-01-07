import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import user from './modules/user'
import setting from './modules/setting'

export default new Vuex.Store({
    modules: {
        user,
        setting
    },
})