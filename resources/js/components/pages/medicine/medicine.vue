<template>
   <div class="pt-7 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="primary" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                            <div class="pa-4">
                                <v-icon dark style="font-size: 25px;">mdi-pill-multiple</v-icon>
                                <span class="white--text">Medicine List</span> 
                            </div>
                        </v-card>
                    </v-card-title>
                    
                    <div class="px-10 py-10">
                    <v-row>
                        <v-col cols="12 d-flex justify-end">
                            <div class="mt-5">
                                <v-btn @click="type = 'add', dialog = true" dark rounded color="primary">
                                    <v-icon left>mdi-plus</v-icon>
                                    Add New Medicine
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-card elevation="0">
                          <v-card-title>
                                <v-text-field v-model="search" placeholder="eg. name" append-icon="mdi-magnify" label="Search" single-line
                                    hide-details>
                                </v-text-field>
                                <v-spacer v-show="$vuetify.breakpoint.mdAndUp" v-for="item in 10" :key="item"></v-spacer>
                          </v-card-title>

                          <v-data-table :search="search"  :headers="headers" :items="medicineList" :items-per-page="10" class="elevation-0">                                
                              <template v-slot:body="{ items }">
                                  <tbody>
                                      <tr v-for="(item, index) in items" :key="index">
                                          <td width="20%">{{item.name}}</td>
                                          <td>{{item.description}}</td>
                                           <td>{{item.total_stocks ? item.total_stocks.qty : 0}}</td>
                                          <td width="30%">
                                            <v-btn small @click="addstock(item.id,item.name)" rounded color="primary">
                                                  <v-icon small>
                                                      mdi-plus
                                                  </v-icon>
                                                  Add Stock
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
                                      <tr v-if="medicineList.length == 0">
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

         <v-dialog  v-model="dialog" width="600">
           <MedicineForm
           :formData="form"
           @closeDialog="dialog = false"
           @addMedicine="fetchMedicineList(), dialog = false, type = 'add'"
           v-if="dialog"
           :type="type"
           />
        </v-dialog>

        <v-dialog  v-model="stockDialog" width="1000">
           <MedicineStock
           :medicine_id="medicine_id"
           :medicine_name="medicine_name"
           @closeDialog="stockDialog = false"
           @reloadMain="fetchMedicineList()"
           v-if="stockDialog"
           />
        </v-dialog>
    </div>
</template>
<script>
import MedicineForm from './medicine-add_edit-form'
import MedicineStock from './medicine-stock'

  export default {
    components:{
        MedicineForm,
        MedicineStock
    },
    data () {
      return {
        loading: false,
        search: '',
        headers: [
          {
            text: 'Name',
            align: 'start',
            value:'name',
          },
          { text: 'Description', value: 'description'},
          { text: 'Qty', value: 'Qty'},
          { text: 'Action', sortable: false },
        ],
        medicineList: [],
        medicine_id: '',
        medicine_name: '',
        search: '',
        type:'add',
        dialog: false,
        stockDialog: false,
        medicineId: '',
        valid: true,
        form: '',
      }
    },
    methods: {
        async fetchMedicineList(){
            await axios.get(`/api/medicine`)
            .then((res)=>{
                this.medicineList = res.data;
            })
        },
        async openUpdateDialog(id){
            this.loading = true;
            await axios.get(`/api/medicine/edit/${id}`)
            .then((res)=>{
                this.type = 'update';
                this.form = res.data.data;
                this.loading = false;
                this.dialog = true;  
            })
        },
        async addstock(id, name){
            this.medicine_id = id;
            this.medicine_name = name;
            this.type = 'update';
            this.stockDialog = true;
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
            await axios.delete(`/api/medicine/delete/${id}`)
            .then((res)=>{
                if(res.data.success){
                    this.showSuccess(res.data.message);
                    this.fetchMedicineList();
                }else{
                    this.showError(res.data.message);
                }
               
            })
        },
    },
    beforeMount() {
        this.fetchMedicineList();
    },
  }
</script>