<template>
   <div class="pt-7 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="primary" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                            <div class="pa-4">
                                <v-icon dark style="font-size: 25px;">mdi-emoticon-sick-outline</v-icon>
                                <span class="white--text">Health Center Events</span> 
                            </div>
                        </v-card>
                    </v-card-title>
                    
                    <div class="px-10 py-10">
                    <v-row>
                        <v-col cols="12 d-flex justify-end">
                            <div class="mt-5">
                                <v-btn @click="type = 'add', dialog = true" dark rounded color="primary">
                                    <v-icon left>mdi-plus</v-icon>
                                    Add New Event
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

                          <v-data-table :search="search"  :headers="headers" :items="eventList" :items-per-page="10" class="elevation-0">                                
                              <template v-slot:body="{ items }">
                                  <tbody>
                                      <tr v-for="(item, index) in items" :key="index">
                                          <td width="20%">{{item.name}}</td>
                                          <td>
                                            {{item.description}}
                                          </td>
                                          <td>
                                            {{item.date ? moment(item.date ).format('LLLL') : ''}}
                                          </td>
                                          <td>
                                            <v-switch @change="activateEvent(item.id,item.active)" inset v-model="item.active"></v-switch>
                                          </td>
                                          <td width="30%">
                                            <v-btn v-if="item.active" class="my-2" small @click="showConfirmPrompt(item.id)" rounded color="primary">
                                                  <v-icon small>
                                                      mdi-email-arrow-right
                                                  </v-icon>
                                                  Send Announcement
                                              </v-btn>
                                               
                                             <v-btn small @click="openUpdateDialog(item.id)" rounded color="info">
                                                  <v-icon small>
                                                      mdi-pencil
                                                  </v-icon>
                                                  Edit
                                              </v-btn>
                                              <v-btn small :class="item.active ? 'mb-2' : ''" @click="showDeletePrompt(item.id)" dark rounded color="danger" >
                                                  <v-icon small>
                                                      mdi-delete
                                                  </v-icon>
                                                  Delete
                                              </v-btn>
                                          </td>
                                      </tr>
                                      <tr v-if="eventList.length == 0">
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
           <ServiceForm
           :formData="form"
           @closeDialog="dialog = false"
           @AddEvent="dialog = false, type = 'add', fetchEventList()"
           v-if="dialog"
           :type="type"
           />
        </v-dialog>
    </div>
</template>
<script>
import ServiceForm from './service-add_edit-form'
  export default {
    components:{
        ServiceForm
    },
    data () {
      return {
        loading: false,
        search: '',
        headers: [
          {
            text: 'Title',
            align: 'start',
            value:'name',
          },
          { text: 'Description', value: 'description'},
          { text: 'Date', value: 'date'},
          { text: 'Active', value: 'active', sortable: false},
          { text: 'Action', sortable: false },
        ],
        eventList: [],
        search: '',
        type:'add',
        dialog: false,
        valid: true,
        form: '',
      }
    },
    methods: {
        async fetchEventList(){
            await axios.get(`/api/services`)
            .then((res)=>{
                this.eventList = res.data;
            })
        },
        async activateEvent(id, status){
            let form = {};
            form.active = status;
            await axios.put(`/api/services/activate/${id}`,form)
            .then((res)=>{
                 if(res.data.success){
                    this.showSuccess(res.data.message);
                }else{
                    this.showError(res.data.message);
                }
            })
        },
        async showConfirmPrompt(id){
            this.showConfirm((confirmed) => {
               let vm = this;
               if(confirmed) {
                   vm.sendNotification(id);                
                }
            });  
        },
        async sendNotification(id){
            let form = {};
            await axios.put(`/api/services/send_notification/${id}`,form)
            .then((res)=>{
                 if(res.data.success){
                    this.showSuccess(res.data.message);
                }else{
                    this.showError(res.data.message);
                }
            })
        },
        async openUpdateDialog(id){
            this.loading = true;
            await axios.get(`/api/services/edit/${id}`)
            .then((res)=>{
                this.type = 'update';
                this.form = res.data.data;
                this.loading = false;
                this.dialog = true;  
            })
        },
        async showDeletePrompt(id){
            this.showDelete((confirmed) => {
               let vm = this;
               if(confirmed) {
                   vm.deleteService(id);                
                }
            });  
        },
        async deleteService(id){
            await axios.delete(`/api/services/delete/${id}`)
            .then((res)=>{
                if(res.data.success){
                    this.showSuccess(res.data.message);
                    this.fetchEventList();
                }else{
                    this.showError(res.data.message);
                }
            })
        },
    },
    beforeMount() {
        this.fetchEventList();
    },
  }
</script>