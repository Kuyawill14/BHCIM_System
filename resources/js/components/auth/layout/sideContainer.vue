<template>
<v-col
    cols="12" md="7" :class="system_setting.color+' ma-0 pa-0 d-flex flex-column'"
    :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm  ? Smallbgdesign : Largebgdesign">
    
    
<!--  style="justify-content: center;background: linear-gradient(rgba(56, 142, 60, 0.85), rgba(56, 142, 60, 0.85)) 50% center / cover no-repeat, url('https://orangestr.sgp1.digitaloceanspaces.com/Assets/Assets/ISU-Gate-Copy.jpg');height: 100vh;background-position-x: center;background-repeat: no-repeat;background-size: cover;" -->

    <v-container v-if="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm"
        class="pb-0 mb-0 d-flex justify-center">
            
        <v-img height="70" width="70" max-height="70" max-width="70"
            :src="/storage/+system_setting.logo"></v-img>
    </v-container>
    <v-container v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm"
        class=" mb-0 pb-0 d-flex justify-center">
             <v-img height="230" width="230" max-height="230" max-width="230"
            :src="/storage/+system_setting.logo"></v-img>
    </v-container>

    <v-container  class="pt-0 mt-0" fluid
        :style="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm ? '' : 'padding-top: 0px;'">
        <v-card-text>
            <v-form class="text-center">
                <v-row align="center" justify="center">
                    <v-col cols="12">
                        <div v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm" class="text-h4 white--text font-weight-bold text-uppercase">
                           {{system_setting.system_short_name}}
                        </div>
                        <div v-else class="text-h5 white--text font-weight-bold text-uppercase">
                            {{system_setting.system_short_name}}
                        </div>

                        <div class="white--text text-uppercase px-10">
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
    props:['system_setting'],
    data() {
        return {
            Smallbgdesign: `height:35vh;justify-content: center;background: linear-gradient(rgba(56, 142, 60, 0.25), rgba(56, 142, 60, 0.25)) 50% center / cover no-repeat, url('/storage/${this.system_setting.login_bg};background-position-x: center;background-repeat: no-repeat;background-size: cover;`,
            Largebgdesign: `height:100vh;justify-content: center;background: linear-gradient(rgba(56, 142, 60, 0.25), rgba(56, 142, 60, 0.25)) 50% center / cover no-repeat, url('/storage/${this.system_setting.login_bg}');background-position-x: center;background-repeat: no-repeat;background-size: cover;`
        }
    },
}
</script>


