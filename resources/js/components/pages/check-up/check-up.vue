<template>
   <div>
        <v-container flat class="pa-5 d-flex justify-center align-center">
            <v-card elevation="0" :width="$vuetify.breakpoint.mdAndUp ? '90%' : '100%'" class="pa-2">
                <v-row>
                    <v-col class="text-center pt-5" cols="12">
                        <v-avatar  tile size="120">
                            <v-img
                                alt="image"
                                src="/storage/upload/checkIcon.png">
                            </v-img>
                        </v-avatar>
                    </v-col>
                    <v-col class="text-center pt-2" cols="12">
                        <h2>CHECK UP PATIENT</h2>
                    </v-col>
                    <v-col class="text-center pl-12 pr-12 mb-0 pb-0" cols="12">
                        <v-text-field v-model="search"  
                        @click:clear="changeSelected(123, true)"
                        rounded hide-details  class="mb-0 pb-0" clearable  placeholder="Search Patient Name"  
                            color="primary" outlined />
                    </v-col>
                    <v-col class=" pl-12 pr-12 mb-0 pb-0" cols="12">
                 
                       <v-list style="overflow-y:auto" height="230px" subheader>
                       <!--  <v-subheader>Patient List</v-subheader> -->
                    
                          
                                <v-list-item  color="red" :class="selectedPatient_Id != item.id ? 'rounded-lg' : 'grey_active rounded-lg'"  link 
                                @click="selectedPatient_Id != item.id ? changeSelected(item, false) : changeSelected(item, true)" v-for="item in getPatient" :key="item.id">
                                    <v-list-item-avatar>
                                        
                                        <v-img
                                            v-if="item.account"
                                            :alt="`${item.f_name} ${item.l_name} avatar`"
                                            :src="item.account.picture ? '/storage/'+item.account.picture : 
                                            item.gender == 1 ? '/storage/upload/pp_1.png' : '/storage/upload/pp_2.png'">
                                        </v-img>
                                         <v-img
                                            v-else
                                            :alt="`${item.f_name} ${item.l_name} avatar`"
                                            :src="item.gender == 1 ? '/storage/upload/pp_1.png' : '/storage/upload/pp_2.png'">
                                        </v-img>
                                    </v-list-item-avatar>

                                    <v-list-item-content>
                                        <v-list-item-title>
                                            {{item.f_name+" "+item.m_name+" "+item.l_name}}
                                        </v-list-item-title>
                                    </v-list-item-content>

                                    <v-list-item-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                  
                        </v-list>
                    </v-col>
                     <v-col class="text-center pt-8 pb-8" cols="12">
                        <div v-if="selectedPatient_Id">
                            <v-btn class="mx-3 mb-2 pl-11 pr-11" @click="$router.push({name: 'CheckUpAdd', params:{id: selectedPatient_Id}})"  large dark rounded color="primary">
                                <v-icon left>mdi-account-heart</v-icon>
                                Check Up Patient
                            </v-btn>
                             <v-btn class="mx-3 mb-2" @click="$router.push({name: 'CheckUpRecord', params:{id: selectedPatient_Id}})" large dark rounded color="info">
                                <v-icon left>mdi-eye</v-icon>
                                View Check-Up History
                            </v-btn>
                            
                          
                        </div>
                          <div v-else>
                            <v-btn class="mx-3 mb-2 pl-11 pr-11" large rounded disabled>
                                <v-icon left>mdi-account-heart</v-icon>
                                Check Up Patient
                            </v-btn>
                             <v-btn class="mx-3 mb-2"  large rounded disabled >
                                <v-icon left>mdi-eye</v-icon>
                                View Check-Up History
                            </v-btn>
                            
                        </div>
                           
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>
<script>
  export default {
    data () {
      return {
        loading: false,
        search: '',
        selectedPatient: '',
        selectedPatient_Id: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
          },
          { text: 'Gender', value: 'gender'},
          { text: 'Purok', value: 'purok'},
          { text: 'Action', },
        ],
        patientList: [],
        purokList: [],
        search: '',
        type:'add',
        dialog: false,
        valid: true,
        form: '',
      }
    },
     computed: {
        getPatient() {
            if (this.search) {
                return this.patientList.filter((item) => {
                    return this.search.toLowerCase().split(' ').every(v => item.f_name.toLowerCase()
                    .includes(v) || item.m_name.toLowerCase() || item.l_name.toLowerCase()
                    .includes(v))
                })
            } else {
                return this.patientList;
            }
        }
    },
    methods: {
        changeSelected(item ,check){
            if(check){
                this.search = null;
                this.selectedPatient_Id = null;
            }else{
                this.search = item.f_name+' '+item.m_name+' '+item.l_name;
                this.selectedPatient_Id = item.id
            }
        },
        async fetchPatientList(){
            await axios.get(`/api/patient_information`)
            .then((res)=>{
                this.patientList = res.data;
            })
        },
        async openUpdateDialog(id){
            this.loading = true;
            await axios.get(`/api/patient_information/edit/${id}`)
            .then((res)=>{
                this.type = 'update';
                this.form = res.data.data;
                this.loading = false;
                this.dialog = true;  
            })
        },
        async updatePatientInformation(){
            this.type = 'add';
            this.dialog = false;
            this.fetchPatientList();
        },
        async addPatientInformation(data){
            this.recordList.push(data);
            this.dialog = false;
        },
        async showDeletePrompt(id){
            this.showDelete((confirmed) => {
               let vm = this;
               if(confirmed) {
                   vm.deletePatient(id);                
                }
            });  
        },
        async deletePatient(id){
            await axios.delete(`/api/patient_information/delete/${id}`)
            .then((res)=>{
                this.fetchPatientList();
                this.showSuccess(res.data.message);
            })
        },
        async fetchPurokList(){
            await axios.get(`/api/purok`)
            .then((res)=>{
                this.purokList = res.data;
            })
        },
    },
    beforeMount() {
        this.fetchPatientList();
        //this.fetchPurokList();
    },
  }
</script>