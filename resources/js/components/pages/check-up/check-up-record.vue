<template>
    <div>
        <v-container fluid class="pa-5 d-flex justify-center align-center">
            <v-card width="100%" class="pa-2">
                <checkDetails v-if="isloaded" :patientDetails="patientDetails"></checkDetails>
                <v-row>
                    <v-col cols="12" class="px-3">
                        <v-data-table :search="search" :headers="headers" :items="recordList" :items-per-page="10" class="elevation-0">                                
                              <template v-slot:body="{ items }">
                                  <tbody>
                                      <tr v-for="(item, index) in items" :key="index">
                                          <td >{{item.date}}</td>
                                          <td>{{item.blood_pressure}}</td>
                                          <td>{{item.temperature}}</td>
                                          <td >{{item.medicine_given}}</td>
                                          <td>{{item.consultation_notes}}</td>
                                          <td >
                                             <v-btn small dark @click="viewPatient(item.id)" rounded color="primary">
                                                  <v-icon small>
                                                      mdi-eye
                                                  </v-icon>
                                                  View
                                              </v-btn>
                                              <v-btn small @click="openUpdateDialog(item.id)" rounded color="info">
                                                  <v-icon small>
                                                      mdi-pencil
                                                  </v-icon>
                                                  Edit
                                              </v-btn>
                                              <v-btn small @click="showDeletePrompt(item.id)" dark rounded color="danger" >
                                                  <v-icon small>
                                                      mdi-delete
                                                  </v-icon>
                                                  Delete
                                              </v-btn>
                                          </td>
                                      </tr>
                                      <tr v-if="recordList.length == 0">
                                          <td colspan="42" class="text-center"> No data available</td>
                                      </tr>
                                  </tbody>
                              </template>
                          </v-data-table>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import checkDetails from './check-up-details'
export default {
    components:{
        checkDetails
    },
    data() {
        return {
            recordList: [],
            patientDetails: [],
            isloaded: false,
            headers: [
                {text: 'Date', align: 'start', value: 'created_at'},
                { text: 'Blood Pressure', value: 'blood_pressure'},
                { text: 'Temperature', value: 'temperature'},
                { text: 'Medicine Given', value: 'medicine_given'},
                { text: 'Remarks', value: 'consultation_notes'},
                { text: 'Action', sortable: false},
            ],
            search: ''
        }
    },
    methods:{
        async getPatientDetails(){
            axios.get(`/api/patient_information/view/${this.$route.params.id}`)
            .then((res)=>{
                if(res.data.success){
                    this.patientDetails = res.data.data
                    this.isloaded = true;
                }
            })
        },
        async getCheckUpRecord(){
            axios.get(`/api/check_up/${this.$route.params.id}`)
            .then((res)=>{
                this.recordList = res.data;
                this.recordList.forEach(item => {
                    let date = new Date(item.created_at).toISOString().slice(0, 10);
                    item.date = date;
                });
            })
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
            await axios.delete(`/api/check_up/delete/${id}`)
            .then((res)=>{
                if(res.data.success){
                    this.showSuccess(res.data.message);
                    this.getCheckUpRecord();
                }else{
                    this.showError(res.data.message);
                }
            })
        },
    },
    beforeMount(){
       this.getPatientDetails();
       this.getCheckUpRecord();
    }
}
</script>