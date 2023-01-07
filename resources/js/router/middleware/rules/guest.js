import store from "../../../store/store";

export default(to, from, next)=>{
    
    store.dispatch('currentUser').then(()=>{
        if(store.getters['authenticated']){
            next({name: 'Dashboard'});
        }else{
            next();
        }
    }).catch(()=>{
        next();
    })
}