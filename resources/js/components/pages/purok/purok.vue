<template>
   <div class="pt-7 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="primary" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                            <div class="pa-4">
                                <v-icon dark style="font-size: 25px;">mdi-home-group</v-icon>
                                <span class="white--text">Purok</span> 
                            </div>
                        </v-card>
                    </v-card-title>
                   
                    <div class="px-10 py-10">
                        <v-row>
                            <v-col cols="12 d-flex justify-end">
                                <div class="mt-5">
                                    <v-btn @click="dialog = true" rounded color="primary">
                                        <v-icon left>mdi-plus</v-icon>
                                        Add New Purok
                                    </v-btn>
                                </div>
                            </v-col>
                        </v-row>
                        <v-card elevation="0">
                            <v-card-title>
                                    <v-text-field v-model="search"  dense  append-icon="mdi-magnify" label="Search" single-line
                                        hide-details>
                                    </v-text-field>
                                    <v-spacer v-show="$vuetify.breakpoint.mdAndUp" v-for="item in 10" :key="item"></v-spacer>
                            </v-card-title>

                            <v-data-table :headers="headers" :items="listPurok" :items-per-page="10" class="elevation-0">                                
                                <template v-slot:body="{ items }">
                                    <tbody>
                                        <tr v-for="(item, index) in items" :key="index">
                                            <td width="40%">{{item.name}}</td>
                                            <td width="30%"> {{item.description }}</td>
                                            <td width="30%">
                                                <v-btn small @click="openUpdateDialog(item)" rounded color="info">
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
                                        <tr v-if="purokList.length == 0">
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
            <v-card class="pa-2">
                <v-card-title class="font-weight-bold justify-space-between">
                    {{this.type == "add" ? 'ADD PUROK' :  'UPDATE PUROK'}}
                    <v-btn @click="dialog = false" icon large>
                        <v-icon>
                            mdi-close
                        </v-icon>
                    </v-btn>
                </v-card-title>
                <v-container>
                    <v-form autocomplete="false"  ref="form" v-model="valid"
                        lazy-validation>
                        <v-row class="px-2 pt-2">
                            <v-col class="my-0 py-0" cols="12" md="12">
                                <div class="pb-2 font-weight-bold">Name</div>
                                <v-text-field @input="$capitalizeFormLetter('name')" dense v-model="form.name" :rules="nameRules" placeholder="Name"
                                 color="primary" type="text" outlined />
                            </v-col>
                             <v-col class="my-0 py-0" cols="12" md="12">
                                <div class="pb-2 font-weight-bold">Description</div>
                                <v-textarea
                                @input="$capitalizeFormLetter('description')"
                                v-model="form.description"
                                    outlined
                                    dense
                                    auto-grow
                                    rows="4"
                                    placeholder="Description(optional)"
                                    ></v-textarea>
                            </v-col>
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
    data() {
        return {
            purokList: [],
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
            headers: [
                {
                    text: 'Purok',
                    value: 'number',
                    align: 'start',
                },
                {
                    text: 'Description',
                    value: 'description',
                    align: 'start',
                },
                {
                    text: 'Actions',
                    sortable: false
                },
            ],
            nameRules: [
                v => !!v || 'Field is required',
            ],
        }
    },
    computed: {
      listPurok(){
            if(this.search) {
                return this.purokList.filter((item) => {
                        return this.search.toLowerCase().split(' ').every(v => item.name.toLowerCase()
                    .includes(v))
                })
            }else {
                return this.purokList;
            }
        },
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
    beforeMount(){
        this.fetchPurokList();
    }
}
</script>
