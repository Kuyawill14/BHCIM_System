<template>
   <div class="pt-7 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="primary" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                            <div class="pa-4">
                                <v-icon dark style="font-size: 25px;">mdi-account-group</v-icon>
                                <span class="white--text">Patient Record List</span> 
                            </div>
                        </v-card>
                    </v-card-title>
                 
                   <div class="px-10 py-10">
                    <v-row>
                        <v-col cols="12 d-flex justify-end">
                            <div class="mt-5">
                                <v-btn @click="addNewPatient()" dark rounded color="primary">
                                    <v-icon left>mdi-plus</v-icon>
                                    Add New Patient
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-card elevation="0">
                          <v-card-title>
                            <v-text-field  v-model="search" placeholder="eg. name" dense append-icon="mdi-magnify" label="Search" single-line
                                hide-details>
                            </v-text-field>
                            <v-spacer v-show="$vuetify.breakpoint.mdAndUp" v-for="item in 10" :key="item"></v-spacer>
                          </v-card-title>

                          <v-data-table :search="search" :headers="headers" :items="recordList" :items-per-page="10" class="elevation-0">                                
                              <template v-slot:body="{ items }">
                                  <tbody>
                                      <tr v-for="(item, index) in items" :key="index">
                                          <td width="20%">{{item.l_name+" "+item.m_name+" "+item.f_name}}</td>
                                          <td>
                                            <v-chip v-if="item.gender == 1" small dark class="ma-2" color="blue" >
                                              Male
                                            </v-chip>
                                             <v-chip v-else small dark class="ma-2" color="red" >
                                              Female
                                            </v-chip>
                                          </td>
                                          <td>{{item.status}}</td>
                                          <td width="10%">{{item.b_date}}</td>
                                          <td>{{item.age}}</td>
                                          <td>{{item.purok ? item.purok.name : ''}}</td>
                                           <td>{{item.cell_number}}</td>
                                          <td width="30%">
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
                      </v-card>
                   </div>
                </v-card>
            </v-col>
        </v-row>


        <v-dialog persistent fullscreen hide-overlay transition="dialog-bottom-transition"  v-model="dialog" >
            <PatientForm
            v-if="dialog"
            :formData="form"
            v-on:AddPatient="addPatientInformation"
            v-on:UpdatePatient="updatePatientInformation"
            v-on:closeDialog="dialog = false, form = []"
            :purokList="purokList"
            :type="type"/>
        </v-dialog>

         <v-overlay :value="loading">
            <v-progress-circular
                indeterminate
                size="64"
            ></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import PatientForm from './patient-add_edit-form'
  export default {
    components:{
        PatientForm
    },
    data () {
      return {
        loading: false,
        search: '',
        headers: [
          {
            text: 'Name',
            sortable: false,
            align: 'start',
          },
          { text: 'Gender', value: 'gender'},
          { text: 'Status', value: 'status'},
          { text: 'Birthdate', value: 'b_date' },
          { text: 'Age', value: 'age' },
          { text: 'Purok', value: 'purok'},
          { text: 'CP #', value: 'cell_number' },
          { text: 'Action', },
        ],
        recordList: [],
        purokList: [],
            search: '',
            type:'add',
            dialog: false,
            valid: true,
            form: '',
      }
    },
    methods: {
        addNewPatient(){
            if(this.purokList.length > 0){
                this.type = 'add';
                this.dialog = true;
            }else{
                this.showError('Please create a purok data first!');
            }
           
        },
        async fetchPatientList(){
            await axios.get(`/api/patient_information`)
            .then((res)=>{
                this.recordList = res.data;
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
        async viewPatient(id){
            this.loading = true;
            await axios.get(`/api/patient_information/edit/${id}`)
            .then((res)=>{
                this.type = 'view';
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
            //this.fetchPatientList();
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
                if(res.data.success){
                    this.fetchPatientList();
                    this.showSuccess(res.data.message);
                }else{
                    this.showError(res.data.message);
                }
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
        this.fetchPurokList();
    },
  }
</script>
