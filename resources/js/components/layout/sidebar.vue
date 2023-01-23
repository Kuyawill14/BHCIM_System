<template>
    <div >

    <v-app-bar  class="pl-3 pr-3" color="white" app>
 
      <v-app-bar-nav-icon v-if="currentRouteName != 'CheckUp' && currentRouteName != 'CheckUpRecord' && currentRouteName != 'CheckUpAdd'" @click="nav = !nav">
          <v-btn v-if="$vuetify.breakpoint.mdAndUp"  fab small>
               <v-icon> {{ !nav ? 'mdi-dots-vertical' : 'mdi-format-list-bulleted'}}  </v-icon>
          </v-btn>
      </v-app-bar-nav-icon>

    <div v-else >
       <v-btn color="danger" v-if="currentRouteName == 'CheckUp'" dark class="ml-0 mr-3" @click="$router.push({name: 'Dashboard'})"  rounded >
              <v-icon left>mdi-arrow-left</v-icon>
              Back
      </v-btn>
       <v-btn color="danger" v-if="currentRouteName == 'CheckUpRecord' || currentRouteName == 'CheckUpAdd'" dark class="ml-0 mr-3" @click="$router.push({name: 'CheckUp'})"  rounded >
              <v-icon left>mdi-arrow-left</v-icon>
              Back
      </v-btn>
    </div>

        <p style="width:50%;line-height:20px" class="pl-3 pt-5">{{$vuetify.breakpoint.mdAndUp ? system_setting.system_long_name : system_setting.system_short_name}}</p>
      <v-spacer></v-spacer>
      <div>
         <span>Hi! {{userDetails.name}} </span>
      </div>
      <v-menu min-width="150" offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon text v-bind="attrs"  v-on="on">
             <v-avatar v-if="userDetails.picture" color="brown" size="35">
                <v-img :src="'/storage/'+userDetails.picture"></v-img>
              </v-avatar>
              <v-avatar v-else color="brown" size="35">
                <v-img :src="userDetails.gender == 1 ? '/storage/upload/pp_1.png' : '/storage/upload/pp_2.png'"></v-img>
              </v-avatar>
          </v-btn>
        
        </template>
        <v-list nav >
          <v-list-item link :to="{name: 'Profile'}">
            <v-list-item-title><v-icon left>mdi-account</v-icon> Profile</v-list-item-title>
          </v-list-item>
           <v-list-item link @click="logout()">
            <v-list-item-title> <v-icon left>mdi-logout</v-icon> Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

   <!--  Navigation -->
    <v-navigation-drawer width="220" v-if="currentRouteName != 'CheckUp' && currentRouteName != 'CheckUpRecord' && currentRouteName != 'CheckUpAdd'" v-model="nav" dark :color="system_setting.color"  app>
      <v-list class="mb-0 pb-0 ">
          <v-list-item class="d-flex justify-center pt-3">
              <v-img height="110" width="110" max-height="110" max-width="110"
                :src="'/storage/'+system_setting.logo"></v-img>
          </v-list-item>
          <v-list-item  link>
            <v-list-item-content class="text-uppercase text-center font-weight-bold" style="font-size: 17px">
                {{system_setting.system_short_name}}
            </v-list-item-content>
          </v-list-item>
        </v-list>
      
       <mainNavbar v-if="userDetails.role == 'administrator' || userDetails.role == 'bhw'" :userDetails="userDetails"></mainNavbar>
       <patientNavbar v-else :userDetails="userDetails"></patientNavbar>
    </v-navigation-drawer>
    
    </div>
</template>
<script>
const mainNavbar = () => import( /* webpackChunkName: "layout" */ "./navigation/main-nav")
const patientNavbar = () => import( /* webpackChunkName: "layout" */ "./navigation/patient-nav")

export default {
    props:['system_setting'],
    components:{
        mainNavbar,
        patientNavbar
    },
    data(){
        return{
            mini: true,
            nav: true,
            hasSidebar: true,
            noSideBarRoutes:['CheckUpAdd', 'CheckUpRecord', 'CheckUpAdd'],
            bgdesign: `background: linear-gradient(rgba(56, 142, 60, 0.25), rgba(56, 142, 60, 0.25)) 50% center / cover no-repeat, url('/storage/${this.system_setting.login_bg};background-position-x: center;background-repeat: no-repeat;background-size: cover;`,
        }
    },
    computed: {
      currentRouteName() {
             /*  let str = this.$route.meta.name;
              return str; */
              
              return this.$route.name;
              //this.checkRouteName()
          },
        userDetails() {
              return this.$store.getters.user;
          }
    },
    methods:{
      checkRouteName(){
        this.noSideBarRoutes.every(item => {
          if(item == this.$route.name){
            this.hasSidebar = false;
          }
        });
      },
      async logout(){
          this.$store.dispatch('clearCurrentUser');
          axios.post('/api/logout')
          .then(()=>{
              this.$router.push({name: 'login'});
          })
      }, 
    }
  
 
 
}
</script>
<style scoped >
    .navigation_list .v-list-item--active{
        background: red !important;
    }
</style>