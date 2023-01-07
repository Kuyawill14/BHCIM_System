import axios from 'axios';

const state = {
    user: null
};
const getters = {
    user: (state) => state.user,
    authenticated: (state) => state.user !== null,
};
const actions = {
   async CreateSession(){
        await axios.get(`/sanctum/csrf-cookie`)
   },
   async login({commit, dispatch }, user){
        dispatch('CreateSession');
        let data;
        await axios.post(`/api/login`, user)
        .then((res)=>{
            commit('SET_USER', res.data.details)
            data =  res;
        });
        return data;
   },
   async currentUser({commit}){
       if(!state.user){
        await axios.get(`/api/currentuser`)
        .then((res)=>{
            commit('SET_USER', res.data)
        }).catch((err)=>{
            /* alert('Database is not open!'); */
        })
       }
       
    },
    async clearCurrentUser(){
        state.user = null;
    }

};
const mutations = {
    SET_USER: (state, user) => (state.user = user),

};

export default {
    state,
    getters,
    actions,
    mutations
};