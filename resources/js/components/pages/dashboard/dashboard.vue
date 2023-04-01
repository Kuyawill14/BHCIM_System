<template>
    <div class="pt-7 px-3">
        <v-row >
            <v-col cols="12" md="4">
                <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="#B71C1C" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;">
                            <div class="pa-8">
                                <v-icon dark style="font-size: 36px;">mdi-account-group</v-icon>
                            </div>
                        </v-card>
                    </v-card-title>
                     <v-card-subtitle class="text-right mt-n13">
                        <span class="text-h5">{{dashboardData.patient}}</span><br>
                        <span> Total Patients</span>
                    </v-card-subtitle>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="blue" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;">
                            <div class="pa-8">
                                <v-icon dark style="font-size: 36px;">mdi-human-male</v-icon>
                            </div>
                        </v-card>
                    </v-card-title>
                     <v-card-subtitle class="text-right  mt-n13">
                          <span class="text-h5">{{dashboardData.malePatient}}</span><br>
                          <span>Male Patients</span> 
                    </v-card-subtitle>
                </v-card>
            </v-col>
            <v-col cols="12" md="4">
                <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="pink" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;">
                            <div class="pa-8">
                                <v-icon dark style="font-size: 36px;">mdi-human-female</v-icon>
                            </div>
                        </v-card>
                    </v-card-title>
                    <v-card-subtitle class="text-right  mt-n13">
                          <span class="text-h5">{{dashboardData.femalePatient}}</span><br>
                          <span>Female Patients</span>
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>
        <v-row class="mt-7">
            <v-col cols="12" md="6">
                <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="#0D47A1" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;">
                            <div class="pa-8">
                                <v-icon dark style="font-size: 36px;">mdi-account-heart</v-icon>
                            </div>
                        </v-card>
                    </v-card-title>
                     <v-card-subtitle class="text-right  mt-n13">
                          <span class="text-h5">{{dashboardData.checkUp}}</span><br>
                          <span> Check-Up Record</span> 
                    </v-card-subtitle>
                </v-card>
            </v-col>
            <v-col cols="12" md="6">
                <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="success" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;">
                            <div class="pa-8">
                                <v-icon dark style="font-size: 36px;">mdi-account-lock</v-icon>
                            </div>
                        </v-card>
                    </v-card-title>
                    <v-card-subtitle class="text-right  mt-n13">
                          <span class="text-h5">{{dashboardData.account}}</span><br>
                          <span>Accounts</span>
                    </v-card-subtitle>
                </v-card>
            </v-col>
        </v-row>


        <v-row class="mt-7">
            <v-col cols="12" md="12"  >
               <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="primary" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                           <div class="pa-5 white--text">
                                <div class="d-flex">
                                    <div class="pr-2">
                                        <v-icon dark style="font-size: 36px;">mdi-emoticon-sick-outline</v-icon>
                                    </div>
                                    <div  style="width:100%">
                                        <div class="text-h5 font-weight-light">Illness</div>
                                        <div class="text-caption"> Chart showing summary of patient illnesses</div>
                                    </div>
                                </div>
                            </div>
                      </v-card>
                    </v-card-title>
                    
                      <v-card elevation="0" class="text-center d-flex justify-center" width="100%" height="60vh">
                        <PieChart :illnessData="dashboardData.illness" v-if="isLoaded" />
                    </v-card>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
import PieChart from './illnessChart'
export default {
    components: {
        PieChart
    },
    data() {
        return {
            dashboardData: [],
            isLoaded: false,
        }
    },
    methods:{
        async fetchDashboardData(){
            await axios.get(`/api/dashboard`)
            .then((res)=>{
                this.dashboardData = res.data;
                this.isLoaded = true;
            })
        }
    },
    beforeMount(){
        this.fetchDashboardData();
    }
}
</script>