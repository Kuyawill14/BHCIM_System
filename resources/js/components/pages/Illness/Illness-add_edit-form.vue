<template>
    <v-card class="pa-2">
        <v-card-title class="font-weight-bold justify-space-between">
            {{this.type == "add" ? 'ADD ILLNESS' :  'UPDATE ILLNESS'}}
            <v-btn @click="$refs.form.reset(),$emit('closeDialog')" icon large>
                <v-icon>
                    mdi-close
                </v-icon>
            </v-btn>
        </v-card-title>
        <v-container>
            <v-form autocomplete="false"  ref="form" v-model="valid" lazy-validation>
                <v-row class="px-2 pt-2">
                    <v-col class="my-0 py-0" cols="12" md="12">
                        <div class="pb-2 font-weight-bold">Name</div>
                        <v-text-field class="text-uppercase" dense v-model="form.name" 
                        :rules="[rules.required]" 
                            color="primary" type="text" outlined />
                    </v-col>

                     <v-col class="my-0 py-0" cols="12" md="12">
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
                </v-row>
            </v-form>
        </v-container>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text rounded @click="$refs.form.reset(),$emit('closeDialog')">Cancel</v-btn>
            <v-btn class="px-7" large rounded color="primary" @click="validate()">
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
            form: this.formData ? this.formData : {
                name: '',
                description: '',
            },
            rules: {
                required: value => !!value || "Field is Required.",
                min: v => (v && v.length >= 6) || "Min 6 characters",
                blank: v => v && !!v.trim() || 'Field cannot be blank',
            },
        }
    },
    methods:{
           validate() {
                if (this.$refs.form.validate()) {
                    if(this.type == 'add'){
                        this.addIllness();
                    }else{
                        this.updateIllness();
                    }
                }
            },
            async addIllness(){
                await axios.post(`/api/illness/insert`, this.form)
                .then((res)=>{
                    this.$refs.form.reset();
                    this.$emit('AddIllness', res.data.data);
                    this.showSuccess(res.data.message);
                })
            },
            async updateIllness(){
                await axios.put(`/api/illness/update/${this.form.id}`, this.form)
                .then((res)=>{
                    this.$refs.form.reset();
                    this.$emit('AddIllness');
                    this.showSuccess(res.data.message);
                })
            },
    }
}
</script>