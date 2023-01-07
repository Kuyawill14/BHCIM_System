<template>
    <v-card class="pa-2">
        <v-card-title class="font-weight-bold justify-space-between">
            {{this.type == "add" ? 'ADD ACCOUNT' :  'UPDATE ACCOUNT'}}
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
                        <div class="pb-2 font-weight-bold">Full Name</div>
                        <v-text-field  dense v-model="form.name" 
                        :rules="[rules.required]" placeholder="Full Name"
                            color="primary" type="text" outlined />
                    </v-col>
                    <v-col cols="12" class="my-0 py-0" md="12">
                        <div class="pb-2 font-weight-bold">Gender</div>
                        <v-select
                            :readonly="type == 'view'"
                            dense
                            :rules="[rules.required]"
                            v-model="form.gender"
                            :items="genderType"
                            item-text="text"
                            item-value="val"
                            :outlined="type != 'view'"
                            color="primary"
                            placeholder="Gender"
                        ></v-select>
                    </v-col>
                    <v-col class="my-0 py-0" cols="12" md="12">
                        <div class="pb-2 font-weight-bold">Username</div>
                        <v-text-field  dense v-model="form.username" 
                        :rules="[rules.required]" placeholder="Username"
                            color="primary" type="text" outlined />
                    </v-col>
                    <v-col v-if="type == 'add'" class="my-0 py-0" cols="12" md="12">
                        <div class="pb-2 font-weight-bold">Password</div>
                        <v-text-field class="mb-0 pb-0" 
                            outlined v-model="form.password"
                            :append-icon="show ?'mdi-eye':'mdi-eye-off'" dense
                            :rules="[rules.required, rules.min, rules.blank]"
                            :type="show ? 'text' : 'password'" name="password" 
                            placeholder="Password"
                            hint="At least 6 characters" color="primary" counter
                            @click:append="show = !show">
                        </v-text-field>
                    </v-col>
                    <v-col class="my-0 py-0" cols="12" md="12">
                        <div class="pb-2 font-weight-bold">Role</div>
                         <v-select
                            dense
                            :readonly="type == 'view'"
                            :rules="[rules.required]"
                            v-model="form.role"
                            item-text="text"
                            item-value="role"
                            :items="roles"
                            :outlined="type != 'view'"
                            color="primary"
                            placeholder="Role"
                        ></v-select>
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
             genderType: [
                {text: 'Male', val: 1},
                {text: 'Female', val: 2},
            ],
            show: false,
            valid: true,
             form: this.formData ? this.formData : {
                name: '',
                gender: '',
                username: '',
                role: '',
                password: '',
            },
            roles:[
                {text: 'Administrator', role:'administrator'},
                {text: 'Barangay Health Worker', role:'bhw'},
                {text: 'Patient', role:'patient'},
            ],
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
                        this.addAccount();
                    }else{
                        this.updateAccount();
                    }
                }
            },
            async addAccount(){
                await axios.post(`/api/account/insert`, this.form)
                .then((res)=>{
                    this.$refs.form.reset();
                    this.$emit('AddAccount', res.data.data);
                    this.showSuccess(res.data.message);
                })
            },
            async updateAccount(){
                await axios.put(`/api/account/update/${this.form.id}`, this.form)
                .then((res)=>{
                    this.$refs.form.reset();
                    this.$emit('UpdatePatient');
                    this.showSuccess(res.data.message);
                })
            },
    }
}
</script>