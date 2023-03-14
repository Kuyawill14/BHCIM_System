<template>
    <v-row class="mt-2 pb-2">
        <v-col cols="12" md="12"  >
            <v-card >
                <v-card-title class="align-start mb-0 pb-0">
                    <v-card light elevation="6" rounded color="primary" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                        <div class="pa-5 white--text">
                            <div class="d-flex">
                                <div class="pr-2">
                                    <v-icon dark :style="$vuetify.breakpoint.mdAndUp ? 'font-size: 36px' : 'font-size: 20px'">mdi-calendar-check</v-icon>
                                </div>
                                <div  style="width:100%">
                                    <div :class="$vuetify.breakpoint.mdAndUp ? 'text-h5 font-weight-light' : ' font-weight-light'">Health Center Events</div>
                                    <div class="text-caption">Current and incoming barangay health center events</div>
                                </div>
                            </div>
                        </div>
                    </v-card>
                </v-card-title>
                
                <v-card elevation="0" class="pt-5 px-2 px-md-5" width="100%" min-height="70vh">
                    <div>
                         <v-row>
                            <v-col v-for="item in eventList" cols="12" :key="item.id">
                                <v-card class="pa-5">
                                    <div class="d-flex">
                                        <div>
                                            <v-icon color="red" :style="$vuetify.breakpoint.mdAndUp ? 'font-size: 60px' : 'font-size: 35px'">mdi-bullhorn-variant-outline</v-icon>
                                        </div>
                                        <div class="pl-2 mt-2">
                                            <h4 v-if="$vuetify.breakpoint.mdAndUp" style="line-height:20px">{{item.name}}</h4>
                                            <div class="font-weight-bold" v-else>{{item.name}}</div>
                                            <div :style="$vuetify.breakpoint.mdAndUp ? 'font-size: 14px' : 'font-size: 12px'"> <v-icon color="primary">mdi-calendar-month</v-icon> 
                                            {{formateDate(item.date)}}</div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="px-md-3" :style="$vuetify.breakpoint.mdAndUp ? 'font-size: 14px' : 'font-size: 10px'">
                                        <v-textarea flat solo  readonly v-model="item.description" auto-grow ></v-textarea>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </div>
                </v-card>
            </v-card>
        </v-col>
    </v-row>
</template>
<script>
export default {
    data() {
        return {
            eventList: [],
        }
    },
    methods: {
        async fetchHealthCenterEvents(){
            await axios.get(`/api/services/active-events`)
            .then((res)=>{
                this.eventList = res.data;
            })
        },
        formateDate(date){
            if(date){
                return this.moment(date).format('LLLL');
            }
        }
    },
    mounted(){
        this.fetchHealthCenterEvents();
    }
}
</script>
<style>
.v-input.v-textarea>.v-input__control>.v-input__slot:before {
    border: none;
    border-style: none !important;
}
.v-input--is-focused .v-input__slot {
  outline: none;
}

</style>