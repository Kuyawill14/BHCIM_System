<template>
   <div class="pt-8 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="#B71C1C" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;">
                            <div class="pa-5">
                                <v-icon dark style="font-size: 36px;">mdi-account-group</v-icon>
                                <span class="white--text">Barangay Record List</span> 
                            </div>
                        </v-card>
                    </v-card-title>
                 

                   <div class="px-10 py-10">
                    <v-row>
                        <v-col cols="12 d-flex justify-end">
                            <div class="mt-5">
                                <v-btn @click="dialog = true" dark rounded color="#B71C1C">
                                    <v-icon left>mdi-plus</v-icon>
                                    Add New Record
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-card elevation="0">
                          <v-card-title>
                              <v-spacer></v-spacer>
                                  <v-text-field v-model="search" placeholder="Purok #" append-icon="mdi-magnify" label="Search" single-line
                                      hide-details>
                                  </v-text-field>
                          </v-card-title>

                          <v-data-table  :headers="headers" :items="recordList" :items-per-page="10" class="elevation-0">                                
                              <template v-slot:body="{ items }">
                                  <tbody>
                                      <tr v-for="(item, index) in items" :key="index">
                                          <td>Juan Tamad</td>
                                          <td>
                                            <v-chip small dark class="ma-2" color="blue" >
                                              Male
                                            </v-chip>
                                          </td>
                                          <td>Single </td>
                                          <td>1999-09-14 </td>
                                          <td>Purok 2 </td>
                                           <td>09352355629 </td>
                                          <td>
                                              <v-btn small @click="openUpdateDialog(item)" rounded color="info">
                                                  <v-icon left>
                                                      mdi-pencil
                                                  </v-icon>
                                                  Edit
                                              </v-btn>
                                              <v-btn small @click="showDeletePrompt(item.id)" dark rounded color="danger" >
                                                  <v-icon>
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


        <v-dialog persistent  v-model="dialog" width="450">
            <v-card class="pa-1  ">
                <v-card-title class="font-weight-bold justify-space-between">
                    {{this.type == "add" ? 'ADD RECORD' :  'UPDATE RECORD'}}
                     <v-btn @click="dialog = false" icon large>
                          <v-icon>
                              mdi-close
                          </v-icon>
                      </v-btn>
                </v-card-title>
                <v-container>
                    <v-form autocomplete="false"  class="text-center" ref="form" v-model="valid"
                        lazy-validation>
                        <v-row class="px-2 pt-2">
                            <v-col cols="12" class="my-0 py-0" md="12">
                                <v-text-field v-model="form.name" dense :rules="nameRules" label="Last Name"
                                 color="primary" type="text" outlined />
                            </v-col>
                         
                            <v-col cols="12" class="my-0 py-0" md="12">
                                <v-text-field label="First Name" dense small type="text" v-model="form.number"
                                    :rules="nameRules"
                                    color="primary" outlined />
                            </v-col>
                            <v-col cols="12" class="my-0 py-0"  md="12">
                                <v-text-field label="M.I" dense type="text" v-model="form.number"
                                    :rules="nameRules"
                                    color="primary" outlined />
                            </v-col>
                            <v-col cols="12" class="my-0 py-0" md="12">
                                     <v-select
                                     dense
                                     v-model="form.number"
                                      :items="genderType"
                                      outlined
                                      color="primary"
                                      label="Gender"
                                    ></v-select>
                            </v-col>
                            <v-col cols="12" class="my-0 py-0" md="12">
                                     <v-select
                                     dense
                                     v-model="form.number"
                                      :items="genderType"
                                      outlined
                                      
                                      color="primary"
                                      label="Civil Status"
                                    ></v-select>
                            </v-col>
                             <v-col cols="12" class="my-0 py-0" md="12">
                                  <v-text-field label="Birthdate" dense type="text" v-model="form.number"
                                    :rules="nameRules"
                                    color="primary" outlined />
                            </v-col>
                             <v-col cols="12" class="my-0 py-0" md="12">
                                    <v-text-field label="Birthplace" dense type="text" v-model="form.number"
                                    :rules="nameRules"
                                    color="primary" outlined />
                            </v-col>
                            
                             <v-col cols="12" class="my-0 py-0" md="12">
                                     <v-select
                                     v-model="form.number"
                                      :items="genderType"
                                      outlined
                                      dense
                                      color="primary"
                                      label="Civil Status"
                                    ></v-select>
                            </v-col>

                            <!--  <v-col class="ma-0 pa-0 mb-1" cols="12" md="12">
                                <v-textarea
                                v-model="form.description"
                                    outlined
                                    auto-grow
                                    rows="4"
                                    placeholder="(optional)"
                                    label="Description"
                                    ></v-textarea>
                            </v-col> -->

                        </v-row>
                    </v-form>
                </v-container>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text rounded @click="dialog = false;$refs.RegisterForm.reset()">Cancel</v-btn>
                    <v-btn class="px-7" large rounded color="primary" @click="validate()">
                        {{this.type == "add" ? 'Submit' :  'Update'}}</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'Full Name',
            align: 'start',
          },
          { text: 'Gender', value: 'gender'},
          { text: 'Civil Status', value: 'status'},
          { text: 'Birthdate', value: 'b_date' },
          { text: 'Purok', value: 'purok'},
          { text: 'CP #', value: 'cell_number' },
          { text: 'Action', },
        ],
        genderType: ['Male', 'Female'],
        recordList: [1,2,3],
            search: '',
            type:'add',
            dialog: false,
            valid: true,
            form:{
                id: '',
                name: '',
                number: '',
                description:'',
            },
            nameRules: [
                v => !!v || 'Field is required',
            ],
      }
    },
    methods: {
          validate() {
            if (this.$refs.form.validate()) {
                if(this.type == 'add'){
                    this.addPurok();
                }else{
                    this.updatePurok();
                }
            }
          },
         reset () {
            this.$refs.form.reset()
        },
        async fetchPurokList(){
            await axios.get(`/api/purok`)
            .then((res)=>{
                this.purokList = res.data;
            })
        },
        clearInputs(){
            this.form.id = '';
            this.form.name = '';
            this.form.number = '';
            this.form.description = '';
            this.$refs.form.resetValidation();
        },
        openUpdateDialog(data){
            this.type = 'update';
            this.form.id = data.id;
            this.form.name = data.name;
            this.form.number = data.number;
            this.form.description = data.description;
            this.dialog = true;
        },
        async updatePurok(){
            await axios.put(`/api/purok/update/${this.form.id}`, this.form)
            .then((res)=>{
                this.type = 'add';
                this.dialog = false;
                this.reset();
                this.showSuccess(res.data.message);
                this.fetchPurokList();
            })
        },
        async addPurok(){
            await axios.post(`/api/purok/insert`, this.form)
            .then((res)=>{
                this.reset();
                this.dialog = false;
                this.purokList.push(res.data.data);
                this.showSuccess(res.data.message);
            })
        },
        async showDeletePrompt(id){
            this.showDelete((confirmed) => {
               let vm = this;
               if(confirmed) {
                   vm.deletePurok(id);                
                }
            });  
        },
        async deletePurok(id){
            await axios.delete(`/api/purok/delete/${id}`)
            .then((res)=>{
                this.fetchPurokList();
                this.showSuccess(res.data.message);
            })
        }
    },
  }
</script>