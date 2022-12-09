<template>
<v-col
    :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm  ? 'height:35vh;':'height:100vh'"
    cols="12" md="7" class="primary ma-0 pa-0 d-flex flex-column"
    style="justify-content: center;background: linear-gradient(rgba(56, 142, 60, 0.85), rgba(56, 142, 60, 0.85)) 50% center / cover no-repeat;height: 100vh;">
    
    
<!--  style="justify-content: center;background: linear-gradient(rgba(56, 142, 60, 0.85), rgba(56, 142, 60, 0.85)) 50% center / cover no-repeat, url('https://orangestr.sgp1.digitaloceanspaces.com/Assets/Assets/ISU-Gate-Copy.jpg');height: 100vh;background-position-x: center;background-repeat: no-repeat;background-size: cover;" -->

    <v-container v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
        class="pb-0 mb-0 d-flex justify-center">

        <!--  <v-img height="70" width="70" max-height="70" max-width="70"
            src="../images/ccsict_logo_2.png"></v-img>
            
        <v-img height="70" width="70" max-height="70" max-width="70"
            src="../images/isu_logo1.png"></v-img> -->
        <v-icon style="font-size:10rem">mdi-laptop</v-icon>
       
    </v-container>
    <v-container v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
        class=" mb-0 pb-0 d-flex justify-center">
      
             <v-icon color="white" style="font-size:10rem">mdi-laptop</v-icon>

          <!--   <v-img class="float-right" height="100" width="100" max-height="100" max-width="100"
                src="../images/ccsict_logo_2.png"></v-img>

                <v-img  height="100" width="100" max-height="100" max-width="100"
                src="../images/isu_logo1.png"></v-img> -->
     
    </v-container>

    <v-container  class="pt-0 mt-0" fluid
        :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? '' : 'padding-top: 0px;'">
        <v-card-text>
            <v-form class="text-center">
                <v-row align="center" justify="center">
                    <v-col cols="12">
                        <div v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm" class="text-h2 white--text font-weight-bold text-uppercase">
                           {{system_setting.system_short_name}}
                        </div>
                        <div v-else class="text-h3 white--text font-weight-bold text-uppercase">
                            {{system_setting.system_short_name}}
                        </div>

                        <div class="white--text text-uppercase">
                            {{system_setting.system_long_name}}
                        </div>

                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
    </v-container>
</v-col>
</template>
<script>
export default {
    props:['system_setting']
}
</script>


