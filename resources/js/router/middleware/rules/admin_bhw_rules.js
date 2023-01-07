import store from "../../../store/store";

export default(to, from, next)=>{
    store.dispatch('currentUser').then(()=>{
        
        if(store.getters['authenticated']){
           
            if(store.getters['user'].role == 'administrator' || store.getters['user'].role == 'bhw')next(); 
            else next({name: 'PatientDashboard'});
        }else{
            next({name: 'login'});
        }
    }).catch(()=>{
        next({name: 'login'});
    })
}