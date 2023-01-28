<template>
   <div class="pt-7 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="primary" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                            <div class="pa-4">
                                <v-icon dark style="font-size: 25px;">mdi-clipboard-text-clock</v-icon>
                                <span class="white--text">My Check-Up History</span> 
                            </div>
                        </v-card>
                    </v-card-title>
                    
                    <div class="px-10 py-10">
                
                    <v-card elevation="0">
                          <v-card-title>
                                <v-text-field v-model="search" placeholder="eg. date" append-icon="mdi-magnify" label="Search" single-line
                                    hide-details>
                                </v-text-field>
                                <v-spacer v-show="$vuetify.breakpoint.mdAndUp" v-for="item in 10" :key="item"></v-spacer>
                          </v-card-title>

                          <v-data-table :search="search" :headers="headers" :items="recordList" :items-per-page="10" class="elevation-0">                                
                              <template v-slot:body="{ items }">
                                  <tbody>
                                      <tr v-for="(item, index) in items" :key="index">
                                          <td >{{item.date ? moment(item.date).format('MMMM DD, YYYY') : ''}}</td>
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

         <v-dialog  v-model="dialog" width="800">
           <ViewCheckUpDialog
           :formData="form"
           @closeDialog="dialog = false"
           v-if="dialog"
           />
        </v-dialog>
    </div>
</template>
<script>
import ViewCheckUpDialog from './includes/ViewCheckUpDialog'
export default {
    components:{
        ViewCheckUpDialog
    },
    data() {
        return {
            dialog: false,
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
            search: '',
            loading: false,
            form: []
        }
    },
    computed: {
        userDetails() {
            return this.$store.getters.user;
        }
    },
    methods:{
        async viewPatient(id){
            this.loading = true;
            await axios.get(`/api/check_up/edit/${id}`)
            .then((res)=>{
                this.form = res.data.data;

                if(this.form.blood_pressure){
                    let tmpBp = this.form.blood_pressure.split('/')
                    this.form.b_pressure_up = tmpBp[0];
                    this.form.b_pressure_down = tmpBp[1];
                }
                let date = new Date(this.form.created_at).toISOString().slice(0, 10);
                this.form.checkUpDate = date;

                this.loading = false;
                this.dialog = true;  
            })
        },
        async getCheckUpRecord(){
            axios.get(`/api/check_up/${this.userDetails.patient_id}`)
            .then((res)=>{
                this.recordList = res.data;
                this.recordList.forEach(item => {
                    let date = new Date(item.created_at).toISOString().slice(0, 10);
                    item.date = date;
                });
            })
        },
    },
    beforeMount(){
       this.getCheckUpRecord();
    }
}
</script>