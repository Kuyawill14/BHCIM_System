<template>
   <div class="pt-3 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded :color="system_setting.color" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                            <div class="pa-4">
                                <v-icon dark style="font-size: 25px;">mdi-account</v-icon> 
                                <span class="white--text">Profile</span> 
                            </div>
                        </v-card>
                    </v-card-title>
                    <div class="px-5 py-10">
                        <v-card elevation="0">
                           <v-form ref="form" v-model="valid" lazy-validation>
                                <v-row class="px-2 pt-2">
                                    <v-col class="my-0 py-0" cols="12" md="12">
                                        <div class="pb-2 font-weight-bold">Name</div>
                                         <v-text-field 
                                            v-model="userDetails.name" 
                                            outlined
                                            :rules="nameRules" 
                                            placeholder="Name" 
                                            required>
                                        </v-text-field>
                                    </v-col>

                                    <v-col class="my-0 py-0" cols="12" md="12">
                                        <div class="pb-2 font-weight-bold">Username</div>
                                         <v-text-field 
                                            v-model="userDetails.username" 
                                            outlined
                                            :rules="nameRules" 
                                            placeholder="Name" 
                                            required>
                                        </v-text-field>
                                    </v-col>

                                    <v-col class="my-0 py-0" cols="12" md="12">
                                        <div class="pb-2 font-weight-bold">Gender</div>
                                         <v-select
                                            :rules="nameRules" 
                                            v-model="userDetails.gender"
                                            :items="genderType"
                                            item-text="text"
                                            item-value="val"
                                            outlined
                                            color="primary"
                                            placeholder="Gender"
                                        ></v-select>
                                    </v-col>
                                     <v-col class="my-0 py-0" cols="12" md="12">
                                        <div class="pb-2 font-weight-bold">Role</div>
                                        <v-select
                                            :rules="nameRules" 
                                            v-model="userDetails.gender"
                                            item-text="text"
                                            item-value="role"
                                            :items="roles"
                                            outlined
                                            color="primary"
                                            placeholder="Role"
                                        ></v-select>
                                    </v-col>
                                    <v-col class="my-0 py-0" cols="12" md="12">
                                         <v-btn
                                            :disabled="!valid"
                                            :color="system_setting.color"
                                            class="mr-4"
                                            large
                                            dark
                                            @click="validate">
                                            Save Changes
                                        </v-btn>
                                    </v-col>

                                </v-row>
                            </v-form>
                        </v-card>
                   </div>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>
<script>
  export default {
    props:['system_setting'],
    data: () => ({
      valid: true,
      nameRules: [
        v => !!v || 'Field is required',
      ],
      rules: [
        value => !value || value.size < 5000000 || 'System logo size should be less than 5 MB!',
      ],
      system_logo: '',
      system_bg: '',
      genderType: [
            {text: 'Male', val: 1},
            {text: 'Female', val: 2},
        ],
        roles:[
            {text: 'Administrator', role:'administrator'},
            {text: 'Barangay Health Worker', role:'bhw'},
            {text: 'Patient', role:'patient'},
        ],

    }),
    computed: {
        userDetails() {
          return this.$store.getters.user;
        }
    },
    methods: {
        validate () {
            if(this.$refs.form.validate()){
                this.updateSystemInfo();  
            }
        },
        reset () {
            this.$refs.form.reset()
        },
        async updateSystemInfo(){
            let fd = new FormData
            fd.append('system_logo', this.system_logo);
            fd.append('system_bg', this.system_bg);
            fd.append('system_setting', JSON.stringify(this.system_setting));
            await axios.post(`/api/settings/update/${this.system_setting.id}`, fd)
            .then((res)=>{
                this.$router.go();
                this.showSuccess(res.data.message);
            })
        },
        BgFileChange(file){
            this.system_bg = file;
        },
        FileChange(file){
            this.system_logo = file;
            this.system_setting.logo = `upload/setting/${file.name}`
        },
    },
   
  }
</script>