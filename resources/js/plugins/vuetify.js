import Vue from 'vue'
import '@mdi/font/css/materialdesignicons.css'
import Vuetify from 'vuetify/dist/vuetify.min.js'
import 'vuetify/dist/vuetify.min.css'
Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#388E3C',
                secondary: '#E8F5E9',
                accent: '#8c9eff',
                error: '#b71c1c',
                grey_active: '#F5F5F5',
                info:'#1565C0',
                danger: '#B71C1C',
                warning: '#B71C1C'
               
            },
        },
    },
})