<template>
    <div >

    <v-app-bar class="pl-3 pr-3" color="transparent"  flat app>
      <v-app-bar-nav-icon @click="nav = !nav">
          <v-btn v-if="$vuetify.breakpoint.mdAndUp"  fab small>
               <v-icon> {{ !nav ? 'mdi-dots-vertical' : 'mdi-format-list-bulleted'}}  </v-icon>
          </v-btn>
      </v-app-bar-nav-icon>
      <v-toolbar-title >{{currentRouteName}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
         <span>Adminstrator </span>
      </div>
      <v-menu min-width="150" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon text v-bind="attrs"  v-on="on">
           <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list nav    >
          <v-list-item link >
            <v-list-item-title><v-icon left>mdi-account</v-icon> Profile</v-list-item-title>
          </v-list-item>
           <v-list-item link @click="$router.push({name: 'login'})">
            <v-list-item-title> <v-icon left>mdi-logout</v-icon> Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

   <!--  Navigation -->
    <v-navigation-drawer  v-model="nav" dark   app>
      <v-list class="mb-0 pb-0">
          <v-list-item class="">
                <h2>LOGO</h2>
          </v-list-item>
          <v-list-item link>
            <v-list-item-content class="text-uppercase" style="font-size: 17px">
                {{system_setting.system_short_name}}
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
       <mainNavbar></mainNavbar>
    </v-navigation-drawer>
    
    </div>
</template>
<script>
const mainNavbar = () => import( /* webpackChunkName: "layout" */ "./navigation/main-nav")
export default {
    props:['system_setting'],
    components:{
        mainNavbar
    },
    data(){
        return{
            mini: true,
            nav: true,
        }
    },
    computed: {
    currentRouteName() {
            let str = this.$route.meta.preview_name;
            return str;
        }
    },
  
 
 
}
</script>
<style scoped >
    .navigation_list .v-list-item--active{
        background: red !important;
    }
</style>