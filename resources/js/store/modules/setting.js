import axios from 'axios';

const state = {
    setting: null
};
const getters = {
    setting: (state) => state.setting,
};
const actions = {
   async systemSetting({commit}){
        await axios.get(`/api/settings`)
        .then((res)=>{
            commit('SET_SETTING', res.data)
        })
    },
};
const mutations = {
    SET_SETTING: (state, setting) => (state.setting = setting),
};

export default {
    state,
    getters,
    actions,
    mutations
};