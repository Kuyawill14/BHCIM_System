<template>
    <v-card v-if="!loading" class="pa-2">
        <v-card-title class="font-weight-bold justify-space-between text-uppercase">
            {{medicine_name}} STOCKS
            <v-btn @click="$emit('closeDialog')" icon large>
                <v-icon>
                    mdi-close
                </v-icon>
            </v-btn>
        </v-card-title>
        <v-container>
            <v-data-table :headers="headers" :items="medicineStockList" :items-per-page="10" class="elevation-0">                                
                <template v-slot:body="{ items }">
                    <tbody>
                        <tr v-for="(item, index) in items" :key="index">
                            <td :class="edit_id  == item.id ? 'pb-3 pt-4' : ''">
                                <v-text-field v-if="edit_id == item.id" dense v-model="item.expiration_date" 
                                :rules="[rules.required]" hide-details color="primary"
                                type="date" outlined rounded required />
                                <span v-else>{{item.expiration_date}}</span>
                            </td>
                            <td>
                                <v-text-field v-if="edit_id == item.id" dense v-model="item.quantity" 
                                :rules="[rules.required]" hide-details color="primary" 
                                type="text" outlined rounded required />
                                <span v-else>{{item.quantity}}</span>
                            </td>
                            <td>
                                <v-btn v-if="edit_id != item.id" small @click="edit_id = item.id" rounded color="info">
                                    <v-icon small>
                                        mdi-pencil
                                    </v-icon>
                                    Edit
                                </v-btn>
                                <v-btn v-if="edit_id != item.id" small @click="showDeletePrompt(item.id)" dark rounded color="danger" >
                                    <v-icon small>
                                        mdi-delete
                                    </v-icon>
                                    Delete
                                </v-btn>

                                <v-btn v-if="edit_id == item.id" small @click="updateMedicineStock(item)" 
                                rounded color="primary" class="px-6">
                                    Update
                                </v-btn>
                            </td>
                        </tr>
                         <tr v-if="medicineStockList.length > 0">
                            <td class="pb-3 pt-4" >
                                <v-text-field v-if="isAdding" dense v-model="form.expiration_date" 
                                :rules="[rules.required]" hide-details color="primary" label="Expiration Date" 
                                type="date" outlined rounded required />
                            </td>
                            <td class="pb-3 pt-4" >
                                <v-text-field v-if="isAdding" dense v-model="form.quantity" 
                                :rules="[rules.required]" hide-details  color="primary" label="Quantity" 
                                type="text" outlined rounded required />
                            </td>
                            <td>
                                
                                <v-btn small v-if="!isAdding"  @click="isAdding = true" rounded color="primary">
                                    <v-icon small>
                                        mdi-plus
                                    </v-icon>
                                    Add Stock
                                </v-btn>
                                 <v-btn small v-else @click="addMedicineStock()" class="px-6" rounded color="primary">
                                    Save
                                </v-btn>
                                 <v-btn v-if="isAdding" small @click="isAdding = false" rounded dark color="danger">
                                    Cancel
                                </v-btn>
                            </td>
                        </tr>
                        <tr v-if="medicineStockList.length == 0">
                            <td colspan="42" class="text-center"> No data available</td>
                        </tr>
          
                    </tbody>
                </template>
            </v-data-table>
      
        </v-container>
      <!--   <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text rounded @click="$emit('closeDialog')">Cancel</v-btn>
            <v-btn :loading="isloading" class="px-7" large rounded color="primary" @click="validate()">
                {{this.type == "add" ? 'Submit' :  'Update'}}</v-btn>
        </v-card-actions> -->
    </v-card>
</template>
<script>
export default {
    props:['type', 'medicine_id','medicine_name'],
    data() {
        return {
              headers: [
                { text: 'Expiration Date', value: 'description', sortable: false },
                { text: 'Quantity', value: 'Qty'},
                { text: 'Action', sortable: false },
            ],
            show: false,
            valid: true,
            rules: {
                required: value => !!value || "Field is Required.",
                min: v => (v && v.length >= 6) || "Min 6 characters",
                blank: v => v && !!v.trim() || 'Field cannot be blank',
            },
            isloading: false,
            medicineStockList: [],
            loading: true,
            isAdding: false,
            form: {
                quatity: '',
                expiration_date: '',
            },
            edit_id: ''
        }
    },
    methods:{
           validate() {
                if (this.$refs.form.validate()) {
                    this.isloading = true;
                    if(this.type == 'add'){
                        this.addMedicine();
                    }else if(this.type == 'update'){
                        this.updateIllness();
                    }
                    else if(this.type == 'add_stock'){
                        this.addMedicineStock();
                    }
                }
            },
            async addMedicineStock(){
                await axios.put(`/api/medicine/add/${this.medicine_id}`, this.form)
                .then((res)=>{
                    if(res.data.success){
                        this.showSuccess(res.data.message);
                        this.$emit('reloadMain');
                        this.isAdding = false;
                        this.medicineStockList.push(res.data.data);
                        this.form.expiration_date = '';
                        this.form.quantity = '';
                    }else{
                        this.showError(res.data.message);
                    }
                })
            },
            async updateMedicineStock(data){
                let form = {};
                form.expiration_date = data.expiration_date;
                form.quantity = data.quantity;
                await axios.put(`/api/medicine/update/${data.id}`, form)
                .then((res)=>{
                    if(res.data.success){
                        this.showSuccess(res.data.message);
                        this.$emit('reloadMain');
                        this.edit_id = '';
                    }else{
                        this.showError(res.data.message);
                    }
                })
            },
            async fetchMedicineStockList(){
                this.medicineStockList = [];
                await axios.get(`/api/medicine/stocks/${this.medicine_id}`)
                .then((res)=>{
                    this.medicineStockList = res.data;
                    this.loading = false;
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
                await axios.delete(`/api/medicine/deleteStock/${id}`)
                .then((res)=>{
                    if(res.data.success){
                        this.showSuccess(res.data.message);
                        let check = 0;
                        this.medicineStockList.forEach(item => {
                            if(item.id == id){
                                this.medicineStockList.splice(check, 1);
                            }
                            check++;
                        });
                 
                    }else{
                        this.showError(res.data.message);
                    }
                })
        },
    },
    beforeMount(){
       this.fetchMedicineStockList();
    }
}
</script>