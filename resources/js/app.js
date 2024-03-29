/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');


window.Vue = require('vue').default;
import '../css/app.css';
import vuetify from './plugins/vuetify';
import store from "./store/store";
import router from "./router/router";
import VueSweetalert2 from 'vue-sweetalert2';
import moment from 'moment';
Vue.prototype.moment = moment;

Vue.prototype.$capitalizeFormLetter = function(inputName) {
    this.form[inputName] =  this.form[inputName][0].toUpperCase() +  this.form[inputName].slice(1);
};
  

import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
import globalMixin from './mixins/globalMixins'
Vue.mixin(globalMixin);

Vue.component('main-app', require('./components/App.vue').default);

const app = new Vue({
    el: '#app',
    store,
    vuetify,
    router
});
