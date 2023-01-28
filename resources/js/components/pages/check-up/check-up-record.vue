<template>
    <div>
        <v-container fluid class="py-1 px-5 d-flex justify-center align-center">
            <v-card elevation="0" width="100%" class="pa-2">
                <checkDetails v-if="isloaded" :patientDetails="patientDetails"></checkDetails>
                <v-row v-if="!isViewing && !isEditing">
                    <v-col cols="12" class="px-3">
                        <v-data-table :search="search" :headers="headers" :items="recordList" :items-per-page="10" class="elevation-0">                                
                              <template v-slot:body="{ items }">
                                  <tbody>
                                      <tr v-for="(item, index) in items" :key="index">
                                          <td >{{item.created_at ? moment(item.created_at).format('MMMM DD, YYYY') : ''}}</td>
                                          <td>{{item.blood_pressure}}</td>
                                          <td>{{item.temperature}}</td>
                                          <td >{{joinArray(item.medicine)}}</td>
                                          <td>{{item.consultation_notes}}</td>
                                          <td >
                                             <v-btn small dark @click="viewPatient(item)" rounded color="primary">
                                                  <v-icon small>
                                                      mdi-eye
                                                  </v-icon>
                                                  View
                                              </v-btn>
                                              <v-btn small @click="updatePatient(item.id)" rounded color="info">
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
                <v-row v-else-if="isViewing">
                    <v-col cols="12" class="px-3 px-md-12">
                        <viewRecord @closeView="isViewing = false,viewdata = []" :viewdata="viewdata"></viewRecord>
                    </v-col>
                </v-row>
                 <v-row v-else-if="isEditing">
                    <v-col cols="12" class="px-3 px-md-12">
                        <updateRecord @updatedRecord="isEditing = false,editdata = [],getCheckUpRecord()"  @closeView="isEditing = false,editdata = []" :editdata="editdata"></updateRecord>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import checkDetails from './check-up-details'
import viewRecord from './viewRecord'
import updateRecord from './updateRecord'
export default {
    components:{
        checkDetails,
        viewRecord,
        updateRecord

    },
    data() {
        return {
            recordList: [],
            patientDetails: [],
            isloaded: false,
            headers: [
                {text: 'Date', align: 'start', value: 'created_at'},
                { text: 'Blood Pressure', value: 'blood_pressure', sortable: false},
                { text: 'Temperature', value: 'temperature', sortable: false},
                { text: 'Medicine Given', value: 'medicine_given', sortable: false},
                { text: 'Remarks', value: 'consultation_notes', sortable: false},
                { text: 'Action', sortable: false},
            ],
            search: '',
            isViewing: false,
            isEditing: false,
            viewdata: [],
            editdata: [],
        }
    },
    methods:{
        joinArray(data){
            if(data){
                let arrayData = [];
                data.forEach(item => {
                    arrayData.push(item.name)
                });
                return arrayData.join(',');
            }
        },
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
            axios.get(`/api/check_up/check/${this.$route.params.id}`)
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
        viewPatient(data){
            this.viewdata = data;
            this.isViewing = true;
        },
        async updatePatient(id){
             await axios.get(`/api/check_up/edit/${id}`)
            .then((res)=>{
                if(res.data.success){
                    this.editdata = res.data.data;
                    this.isEditing = true;
                }else{
                    this.showError(res.data.message);
                }
            })
        }
    },
    beforeMount(){
       this.getPatientDetails();
       this.getCheckUpRecord();
    }
}
</script>