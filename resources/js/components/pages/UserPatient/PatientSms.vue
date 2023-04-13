<template>
   <div class="pt-7 px-0 px-md-3">
        <v-row>
            <v-col cols="12">
                 <v-card min-height="85vh" >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="primary" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                            <div class="pa-4">
                                <v-icon dark style="font-size: 25px;">mdi-message-text</v-icon>
                                <span class="white--text">SMS Support</span> 
                            </div>
                        </v-card>
                    </v-card-title>
            
                   <div class="mt-3 ">
                      <v-row>
                      <!--   <v-col class="pa-5 pl-8" style="min-height:580px;overflow-x:auto" cols="12" md="4">
                          <v-card class="d-flex justify-content-between px-3 py-4">
                            <div class="font-weight-bold mt-1">Messages</div>
                            <div>
                              <v-btn @click="creating_new = !creating_new" icon small>
                                  <v-icon color="primary">
                                    mdi-text-box-edit
                                  </v-icon>
                                </v-btn>
                            </div>
                          </v-card>
                          <v-list v-if="SmsList.length > 0">
                            <template v-for="(item, index) in SmsList">
                                <v-list-item  :class="selected_id != item.id ? 'rounded-lg' : 'grey_active rounded-lg'"
                                 @click="setSelectedMessage(item)" link :key="item.id">
                                    <v-list-item-avatar  >
                                      <v-img alt="avatar" src="/img/pp_1.png"></v-img>
                                    </v-list-item-avatar>
                                    <v-list-item-content>
                                        <div  style="font-size:12px">
                                          {{item.information ? item.information.f_name+' '+item.information.l_name : 'No name' }}
                                        </div>
                                        <small>{{item.number}}</small>
                                        <v-list-item-subtitle style="font-size:10px">
                                          {{item.latest_message}}
                                        </v-list-item-subtitle>
                                    </v-list-item-content>

                                    <v-list-item-action>
                                        <v-list-item-action-text >
                                            <v-btn icon x-small>
                                                <v-icon small  color="grey lighten-1">
                                                  mdi-close
                                                </v-icon>
                                            </v-btn>
                                        </v-list-item-action-text>
                                    </v-list-item-action>
                                </v-list-item>
                                <v-divider class="ma-0 pa-0" v-if="index < SmsList.length - 1" :key="index"></v-divider>
                            </template>
                          </v-list>
                          <div v-else>
                              <div class="text-center mt-3">
                                 <div>
                                    <v-icon x-large color="primary">
                                          mdi-text-box-edit
                                        </v-icon>
                                  </div>
                                  <div>No Message</div>
                              </div>
                          </div>
                        </v-col> -->

                        <v-col v-if="!creating_new" class="px-8" cols="12" md="12">
                          <div >
                            <div class="text-center">
                                <div class="text-center">
                                    <v-avatar height="60" width="60" max-height="60" max-width="60">
                                        <v-img src="/img/pp_1.png"></v-img>
                                    </v-avatar>
                                </div>
                                <div class="font-weight-bold">

                                  {{selected_details.information ? selected_details.information.f_name+' '+selected_details.information.l_name : 'No name' }}
                                </div>
                                <small>{{selected_details.number}}</small>
                            </div>

                            <v-divider class="ma-0 pa-0" ></v-divider>
                            <v-card elevation="0" class="px-5 mt-5 mb-2">
                                <div id="messageContainer" style="height:315px;overflow-y:auto">
                                    <div v-for="item in selected_details.messages" :key="item.id">
                                        <v-container v-if="item.from != userDetails.id" class="d-flex justify-content-end mb-0 pb-0">
                                            <v-card  class="rounded-xl"  width="50%" min-height="7vh" elevation="0">
                                            <v-card outlined class="pa-2 pl-4 rounded-xl" width="100%" min-height="5vh" color="#EEEEEE">
                                            {{item.message}}
                                            </v-card>
                                            <div class="text-right pr-4">
                                                <small>2022/21/09</small>
                                            </div>
                                            
                                            </v-card>
                                            <v-avatar class="mt-1" height="40" width="40" max-height="100" max-width="100">
                                                <v-img src="/img/pp_1.png"></v-img>
                                            </v-avatar>
                                        </v-container>

                                        <v-container v-if="item.from == userDetails.id" class="d-flex justify-content-start mt-0 pt-0">
                                        <v-avatar class="mt-1" height="40" width="40" max-height="100" max-width="100">
                                                <v-img src="/img/pp_1.png"></v-img>
                                            </v-avatar>
                                    
                                            <v-card class="rounded-xl" width="50%" min-height="7vh" elevation="0">
                                            <v-card elevation="0" class="pa-2 pl-4 rounded-xl white--text" width="100%" min-height="5vh" color="blue">
                                            {{item.message}}
                                            </v-card>
                                            <div class="pl-4">
                                                <small>2022/21/09</small>
                                            </div>
                                            
                                            </v-card>
                                        </v-container>
                                        </div>
                                 </div>
                            </v-card>
                            <v-divider class="ma-0 pa-0" ></v-divider>
                            <v-form autocomplete="false" ref="form2" v-model="valid2" lazy-validation>
                              <div class="px-2 d-flex mt-5">
                                <v-textarea class="mb-0 pb-0" :rules="rules" v-model="form.message" 
                                label="Message" rounded hide-details outlined auto-grow  rows="2"></v-textarea>
                              </div>
                               <div class="px-2 text-right mt-2">
                                  <v-btn @click="validate2()"  color="primary" rounded large>
                                    Send
                                      <v-icon right dark>
                                          mdi-send
                                      </v-icon>
                                  </v-btn>
                                </div>
                             </v-form>
                          </div>
                        </v-col>

                        <v-col v-else  class="px-7" cols="12" md="12">
                           <v-card class="px-3 py-4 mt-2 text-center">
                              <div class="font-weight-bold mt-1">New Messages</div>
                            </v-card>
                            <v-card class="px-3 py-4 mt-3 text-center">
                              <v-form autocomplete="false"  ref="form" v-model="valid" lazy-validation>
                                <div class="px-2  mt-5">
                                  <v-text-field :rules="rules" label="Number" 
                                  v-model="form.number"
                                  rounded outlined auto-grow type="number" value=""></v-text-field>
                                </div>
                                <div class="px-2 mt-0">
                                  <v-textarea :rules="rules" label="Message" 
                                  v-model="form.message"
                                  rounded outlined auto-grow  rows="5"  value=""></v-textarea>
                                </div>
                                <div class="px-2 text-right mt-0">
                                  <v-btn @click="validate()"  color="primary" rounded large>
                                    Send
                                      <v-icon right dark>
                                          mdi-send
                                      </v-icon>
                                  </v-btn>
                                </div>
                              </v-form>
                            </v-card>
                        </v-col>
                      </v-row>
                   </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
  export default {
    data: () => ({
      SmsList: [
       /*  {
          id: 1,
          name: 'Juan Tamad',
          number: '0935235629',
          latest_message: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        },
        {
          id: 2,
          name: 'Pedro Penduko',
          number: '298727754',
          latest_message: `I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
        }, */
      ],
      rules: [
        v => !!v || 'Field is required',
      ],
      form:{
        sender_id: '',
        patient_id: '',
        number: '',
        message: '',
      },
      valid: true,
      valid2: true,
      selected_id: '',
      selected_details: [],
      creating_new: false,
    }),
    computed: {
        userDetails() {
          return this.$store.getters.user;
        }
    },
    methods: {
       validate2() {
          if(this.$refs.form2.validate()) {
              this.SendMessage();
          }
      },
       validate() {
          if(this.$refs.form.validate()) {
              this.addMessage();
          }
      },
      async addMessage(){
        this.form.sender_id = this.userDetails.id;
        await axios.post(`/api/sms/insert`, this.form)
          .then((res)=>{
            this.showSuccess(res.data.message);
            this.fetchSmsList();
        })
      },
       async SendMessage(){
        this.form.sender_id = this.userDetails.id;
        await axios.put(`/api/sms/send/${this.selected_id}`, this.form)
          .then((res)=>{
            this.selected_details.messages.push(res.data.data);
            this.$refs.form2.reset();
        })
      },
      setSelectedMessage(item){
        this.selected_id = item.id;
        this.selected_details = item;
      },
      async fetchSmsList(){
        await axios.get(`/api/sms/view/${this.userDetails.id}`)
          .then((res)=>{
              this.selected_details = res.data.data;
              this.selected_id = this.selected_details.id;
              this.autoScrollBottom();
          })
      },
      setMessageBox(){
        if(this.SmsList.length > 0){
          this.selected_id = this.SmsList[0].id;
          this.selected_details = this.SmsList[0];
        }else{
          this.creating_new = true;
        }
      },
      autoScrollBottom(){
        const container = this.$el.querySelector("#messageContainer");
        this.$nextTick(() => {
          container.scrollTop = container.scrollHeight;
        });
      }
    },
    beforeMount() {
      this.fetchSmsList();
      
    },
  }
</script>