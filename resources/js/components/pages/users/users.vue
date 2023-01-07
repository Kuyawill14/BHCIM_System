<template>
   <div class="pt-7 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="primary" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                            <div class="pa-4">
                                <v-icon dark style="font-size: 25px;">mdi-account-lock</v-icon>
                                <span class="white--text">Accounts</span> 
                            </div>
                        </v-card>
                    </v-card-title>
                    

                    <div class="px-10 py-10">
                    <v-row>
                        <v-col cols="12 d-flex justify-end">
                            <div class="mt-5">
                                <v-btn @click="type = 'add', dialog = true" dark rounded color="primary">
                                    <v-icon left>mdi-plus</v-icon>
                                    Add Account
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-card elevation="0">
                          <v-card-title>
                                <v-text-field v-model="search" placeholder="eg. name" dense append-icon="mdi-magnify" label="Search" single-line
                                    hide-details>
                                </v-text-field>
                                <v-spacer v-show="$vuetify.breakpoint.mdAndUp" v-for="item in 10" :key="item"></v-spacer>
                          </v-card-title>

                        <v-data-table :headers="headers" :items="AccountList" :items-per-page="10" class="elevation-0">                                
                            <template v-slot:body="{ items }">
                                  <tbody>
                                      <tr v-for="(item, index) in items" :key="index">
                                            <td style="width:10%">
                                                <v-icon :color="item.isActive != 0 ? 'success' : ''">mdi-circle-medium</v-icon>
                                                <span :class="item.isActive != 0 ? 'success--text' : ''">{{item.isActive != 0 ? 'Online' : 'Oflline'}}</span>
                                            </td>
                                            <td width="20%">{{item.name}}</td>
                                            <td>
                                                <v-chip v-if="item.role == 'administrator'" small dark class="ma-2"  color="red">
                                                    Administator
                                                </v-chip>
                                                <v-chip v-else-if="item.role == 'bhw'" small dark class="ma-2" color="blue"  >
                                                    Barangay Health Worer(BHW)
                                                </v-chip>
                                                <v-chip v-else small dark class="ma-2" color="success"  >
                                                    Patient
                                                </v-chip>
                                            </td>
                                            <td width="30%">
                                                <v-btn small dark  rounded color="primary">
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
                                                <v-btn small v-if="item.role != 'administrator' || item.isActive == 0" @click="showDeletePrompt(item.id)" dark rounded color="danger" >
                                                    <v-icon small>
                                                        mdi-delete
                                                    </v-icon>
                                                    Delete
                                                </v-btn>
                                            </td>
                                      </tr>
                                      <tr v-if="AccountList.length == 0">
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

        <v-dialog  v-model="dialog" width="450">
           <UserForm
           :formData="form"
           @closeDialog="dialog = false"
           @AddAccount="addAccount"
           @UpdatePatient="updateAccount"
           v-if="dialog"
           :type="type"
           />
        </v-dialog>


    </div>
</template>
<script>
import UserForm from './users-add_edit-form'
  export default {
    components:{
        UserForm
    },
    data () {
      return {
        loading: false,
        search: '',
        headers: [
            {
            text: '',
            align: 'start',
          },
          {
            text: 'Name',
            align: 'start',
          },
          { text: 'Role', value: 'gender'},
          { text: 'Action', },
        ],
        AccountList: [],
        purokList: [],
        search: '',
        type:'add',
        dialog: false,
        valid: true,
        form: '',
      }
    },
    methods: {
        async fetchAccountList(){
            await axios.get(`/api/account`)
            .then((res)=>{
                this.AccountList = res.data.account;
            })
        },
        async openUpdateDialog(id){
            this.loading = true;
            await axios.get(`/api/account/edit/${id}`)
            .then((res)=>{
                this.type = 'update';
                this.form = res.data.data;
                this.loading = false;
                this.dialog = true;  
            })
        },
        async updateAccount(){
            this.type = 'add';
            this.dialog = false;
            this.fetchAccountList();
        },
        async addAccount(data){
            this.AccountList.push(data);
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
            await axios.delete(`/api/account/delete/${id}`)
            .then((res)=>{
                this.fetchAccountList();
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
        this.fetchAccountList();
        //this.fetchPurokList();
    },
  }
</script>