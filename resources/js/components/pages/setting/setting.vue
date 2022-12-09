<template>
   <div class="pt-8 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="#0D47A1" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;">
                            <div class="pa-8">
                                <v-icon dark style="font-size: 36px;">mdi-cog</v-icon> 
                                <span class="white--text">Settings</span> 
                            </div>
                        </v-card>
                    </v-card-title>
                    <div class="px-12 py-12">
                        <v-card elevation="0">
                           <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field 
                                    v-model="system_setting.system_short_name" 
                                    outlined
                                    :rules="nameRules" 
                                    label="System Short Name" 
                                    required>
                                </v-text-field>

                                <v-text-field 
                                     v-model="system_setting.system_long_name" 
                                    outlined
                                    :rules="nameRules" 
                                    label="System Long Name" 
                                    required>
                                </v-text-field>

                                 <v-file-input
                                    show-size
                                    counter
                                    outlined
                                    prepend-inner-icon="mdi-image-area" prepend-icon=""                                 
                                    label="System Logo"
                                ></v-file-input>

                                 <v-file-input
                                    show-size
                                    counter
                                    outlined
                                    prepend-inner-icon="mdi-image-area" prepend-icon=""                                 
                                    label="Log-In Background Image"
                                ></v-file-input>

                            
                                <v-btn
                                    :disabled="!valid"
                                    color="success"
                                    class="mr-4"
                                    large
                                    @click="validate">
                                    Save Changes
                                </v-btn>
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
/*         resetValidation () {
            this.$refs.form.resetValidation()
        }, */
        async updateSystemInfo(){
            await axios.put(`/api/settings/update/${this.system_setting.id}`, this.system_setting)
            .then((res)=>{
                this.showSuccess(res.data.message);
            })
        }
    },
   
  }
</script>