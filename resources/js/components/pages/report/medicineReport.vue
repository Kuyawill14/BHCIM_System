<template>
   <div class="pt-7 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card min-height="85vh" >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="primary" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                            <div class="pa-4">
                                <v-icon dark style="font-size: 25px;">mdi-file-chart</v-icon>
                                <span class="white--text">Medicine Report</span> 
                            </div>
                        </v-card>
                    </v-card-title>
                    
                    <div class="px-10 py-10">
                        <v-card elevation="0">
                            <v-row >
                              
                            </v-row>
                        </v-card>
                   </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
  export default {
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
          { text: 'Action', sortable: false },
        ],
        illnessList: [],
        search: '',
        type:'add',
        dialog: false,
        valid: true,
        form: '',
      }
    },
    methods: {
        async fetchIllnessList(){
            await axios.get(`/api/illness`)
            .then((res)=>{
                this.illnessList = res.data;
            })
        },
        async openUpdateDialog(id){
            this.loading = true;
            await axios.get(`/api/illness/edit/${id}`)
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
            this.fetchIllnessList();
        },
        async addPatientInformation(data){
            this.illnessList.push(data);
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
            await axios.delete(`/api/illness/delete/${id}`)
            .then((res)=>{
                if(res.data.success){
                    this.showSuccess(res.data.message);
                    this.fetchIllnessList();
                }else{
                    this.showError(res.data.message);
                }
               
            })
        },
    },
    beforeMount() {
        //this.fetchIllnessList();
    },
  }
</script>