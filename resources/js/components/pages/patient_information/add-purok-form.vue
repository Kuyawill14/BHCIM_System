<template>
    <v-card class="pa-2">
        <v-card-title class="font-weight-bold justify-space-between">
            ADD PUROK
            <v-btn @click="$refs.form.reset();$emit('closeDialog')" icon large>
                <v-icon>
                    mdi-close
                </v-icon>
            </v-btn>
        </v-card-title>
        <v-container>
            <v-form autocomplete="false" ref="form" v-model="valid"
                lazy-validation>
                <v-row class="px-2 pt-2">
                    <v-col class="my-0 py-0" cols="12" md="12">
                        <div class="pb-2 font-weight-bold">Name</div>
                        <v-text-field  dense v-model="form.name" :rules="nameRules" placeholder="Name"
                            color="primary" type="text" outlined />
                    </v-col>
                        <v-col class="my-0 py-0" cols="12" md="12">
                        <div class="pb-2 font-weight-bold">Description</div>
                        <v-textarea
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
            <v-btn text rounded @click="$refs.form.reset();$emit('closeDialog')">Cancel</v-btn>
            <v-btn class="px-7" large rounded color="primary" @click="validate()">Submit</v-btn>
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    data() {
        return {
            valid: true,
            form:{
                id: '',
                name: '',
                number: '',
                description:'',
            },
             nameRules: [
                v => !!v || 'Field is required',
            ],
        }
    },
    methods: {
         validate() {
            if (this.$refs.form.validate()) {
                this.addPurok();
            }
          },
          async addPurok(){
            await axios.post(`/api/purok/insert`, this.form)
            .then((res)=>{
                this.showSuccess(res.data.message);
                this.$refs.form.reset();
                this.$emit('purokAdded');
            })
        },
    },
}
</script>