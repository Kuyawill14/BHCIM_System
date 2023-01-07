<template>
   <div class="pt-7 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded :color="system_setting.color" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                            <div class="pa-4">
                                <v-icon dark style="font-size: 25px;">mdi-cog</v-icon> 
                                <span class="white--text">Settings</span> 
                            </div>
                        </v-card>
                    </v-card-title>
                    <div class="px-5 py-10">
                        <v-card elevation="0">
                           <v-form ref="form" v-model="valid" lazy-validation>
                                <v-row class="px-2 pt-2">
                                    <v-col class="my-0 py-0" cols="12" md="12">
                                        <div class="pb-2 font-weight-bold">System short name</div>
                                         <v-text-field 
                                            v-model="system_setting.system_short_name" 
                                            outlined
                                            :rules="nameRules" 
                                            placeholder="System short Name" 
                                            required>
                                        </v-text-field>
                                    </v-col>

                                    <v-col class="my-0 py-0" cols="12" md="12">
                                        <div class="pb-2 font-weight-bold">System long name</div>
                                        <v-textarea
                                        outlined
                                        placeholder="System Long Name"
                                        auto-grow
                                        rows="1"
                                        :rules="nameRules" 
                                        v-model="system_setting.system_long_name" 
                                        ></v-textarea>
                                    </v-col>
                                    <v-col v-if="(system_setting.logo == null || system_setting.logo == '') & !system_logo" class="my-0 py-0" cols="12" md="12">
                                        <div class="pb-2 font-weight-bold">System logo</div>
                                        <v-file-input
                                            :rules="rules"
                                            outlined
                                            @change="FileChange"
                                            accept="image/png, image/jpeg, image/bmp"
                                            placeholder="Pick a Logo"
                                            prepend-inner-icon="mdi-image-area" prepend-icon=""    
                                        ></v-file-input>
                                    </v-col>

                                    <v-col v-else class="my-0 py-0" cols="12" md="12">
                                        <div class="pb-2 font-weight-bold">System logo</div>
                                        <v-text-field 
                                            outlined
                                            v-model="system_setting.logo"
                                            clearable
                                            placeholder="Pick a Logo"
                                            prepend-inner-icon="mdi-image-area" prepend-icon=""    
                                        ></v-text-field>
                                    </v-col>

                                    <v-col v-if="(system_setting.login_bg == null || system_setting.login_bg == '')" class="my-0 py-0" cols="12" md="12">
                                        <div class="pb-2 font-weight-bold">Log-In Background Image</div>
                                          <v-file-input
                                            :rules="rules"
                                            outlined
                                            @change="BgFileChange"
                                            accept="image/png, image/jpeg, image/bmp"
                                            placeholder="Pick Background Image"
                                            prepend-inner-icon="mdi-image-area" prepend-icon=""    
                                        ></v-file-input>
                                    </v-col>

                                    <v-col v-else class="my-0 py-0" cols="12" md="12">
                                        <div class="pb-2 font-weight-bold">Log-In Background Image</div>
                                        <v-text-field 
                                            outlined
                                            v-model="system_setting.login_bg"
                                            clearable
                                            placeholder="Pick a Logo"
                                            prepend-inner-icon="mdi-image-area" prepend-icon=""    
                                        ></v-text-field>
                                    </v-col>

                                      <v-col  class="my-0 py-0" cols="12" md="12">
                                        <div class="pb-2 font-weight-bold">Color</div>
                                        <v-text-field 
                                        type="color"
                                            outlined
                                            v-model="system_setting.color"
                                            clearable
                                            placeholder="Pick a Logo"
                                            prepend-inner-icon="mdi-image-area" prepend-icon=""    
                                        ></v-text-field>
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

    }),

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