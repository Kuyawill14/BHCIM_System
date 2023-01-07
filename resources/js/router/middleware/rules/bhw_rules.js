import store from "../../../store/store";

export default(to, from, next)=>{
    store.dispatch('currentUser').then(()=>{
        if(store.getters['authenticated']){
           next(); 
        }else{
            next({name: 'login'});
        }
    }).catch(()=>{
        next({name: 'login'});
    })
}