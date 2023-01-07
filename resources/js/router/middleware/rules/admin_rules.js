import store from "../../../store/store";

export default(to, from, next)=>{
    store.dispatch('currentUser').then(()=>{
        if(store.getters['authenticated']){
            if(store.getters['user'].role == 'administrator')next(); 
            else if((store.getters['user'].role == 'bhw')) next({name: 'Dashboard'});
        }else{
            next({name: 'login'});
        }
    }).catch(()=>{
        next({name: 'login'});
    })
}