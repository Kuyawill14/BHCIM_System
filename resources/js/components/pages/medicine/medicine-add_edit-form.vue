<template>
    <v-card class="pa-2">
        <v-card-title class="font-weight-bold justify-space-between">
            {{this.type == 'add_stock' ? 'ADD STOCKS' :  this.type == "add" ? 'ADD MEDICINE' :  'UPDATE MEDICINE'}}
            <v-btn @click="$refs.form.reset(),$emit('closeDialog')" icon large>
                <v-icon>
                    mdi-close
                </v-icon>
            </v-btn>
        </v-card-title>
        <v-container>
            <v-form autocomplete="false"  ref="form" v-model="valid" lazy-validation>
                <v-row class="px-2 pt-2">
                    <v-col v-if="this.type != 'add_stock'" class="my-0 py-0" cols="12" md="12">
                        <div class="pb-2 font-weight-bold">Name</div>
                        <v-text-field class="text-uppercase" dense v-model="form.name" 
                        :rules="[rules.required]" 
                            color="primary" type="text" outlined />
                    </v-col>

                     <v-col v-if="this.type != 'add_stock'" class="my-0 py-0" cols="12" md="12">
                        <div class="pb-2 font-weight-bold">Description</div>
                         <v-textarea
                            :readonly="type == 'view'"
                            v-model="form.description"
                            :outlined="type != 'view'"
                            dense
                            auto-grow
                            rows="3"
                            ></v-textarea>
                    </v-col>
                    <v-col class="my-0 py-0" cols="12" md="12">
                        <div class="pb-2 font-weight-bold">Quantity</div>
                        <v-text-field class="text-uppercase" dense v-model="form.quantity" 
                        :rules="[rules.required]" 
                            color="primary" type="number" outlined />
                    </v-col>
                    <v-col class="my-0 py-0" cols="12" md="12">
                        <div class="pb-2 font-weight-bold">Expiration Date</div>
                        <v-text-field class="text-uppercase" dense v-model="form.expiration_date" 
                        :rules="[rules.required]" 
                            color="primary" type="date" outlined />
                    </v-col>
                </v-row>
            </v-form>
        </v-container>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text rounded @click="$refs.form.reset(),$emit('closeDialog')">Cancel</v-btn>
            <v-btn :loading="isloading" class="px-7" large rounded color="primary" @click="validate()">
                {{this.type == "add" ? 'Submit' :  'Update'}}</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    props:['type', 'formData'],
    data() {
        return {
            show: false,
            valid: true,
            form: (this.formData && this.type != 'add_stock') ? this.formData : {
                name: '',
                description: '',
                quatity: '',
                expiration_date: '',

            },
            rules: {
                required: value => !!value || "Field is Required.",
                min: v => (v && v.length >= 6) || "Min 6 characters",
                blank: v => v && !!v.trim() || 'Field cannot be blank',
            },
            isloading: false
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
            async addMedicine(){
                await axios.post(`/api/medicine/insert`, this.form)
                .then((res)=>{
                    if(res.data.success){
                        this.showSuccess(res.data.message);
                        this.$emit('addMedicine', res.data.data);
                        this.$refs.form.reset();
                    }else{
                        this.showError(res.data.message);
                    }
                })
            },
            async updateIllness(){
                await axios.put(`/api/medicine/update/${this.form.id}`, this.form)
                .then((res)=>{
                    if(res.data.success){
                        this.$refs.form.reset();
                        this.$emit('addMedicine');
                        this.showSuccess(res.data.message);
                    }else{
                        this.showError(res.data.message);
                    }
                })
            },
            async addMedicineStock(){
                await axios.put(`/api/medicine/add/${this.formData.id}`, this.form)
                .then((res)=>{
                    if(res.data.success){
                        this.showSuccess(res.data.message);
                        this.$emit('addMedicine', res.data.data);
                        this.$refs.form.reset();
                    }else{
                        this.showError(res.data.message);
                    }
                })
            },
    }
}
</script>