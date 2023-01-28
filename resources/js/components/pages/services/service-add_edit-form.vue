<template>
    <v-card class="pa-2">
        <v-card-title class="font-weight-bold justify-space-between">
            {{this.type == "add" ? 'ADD EVENT' :  'UPDATE EVENT'}}
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
                     <v-col class="my-0 py-0" cols="12" md="12">
                        <div class="pb-2 font-weight-bold">Date</div>
                        <v-datetime-picker
                            v-model="form.date"
                            outlined
                            id="date_picker"
                            class="mt-0 pt-0"
                            :date-picker-props="dateProps"
                            :time-picker-props="timeProps"
                            time-format="HH:mm"
                            color="primary"> 
                            <template slot="dateIcon">
                                <v-icon>mdi-calendar</v-icon>
                            </template>
                            <template slot="timeIcon">
                                <v-icon>mdi-clock</v-icon>
                            </template>
                        </v-datetime-picker>
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
                date: '',
            },
            rules: {
                required: value => !!value || "Field is Required.",
                min: v => (v && v.length >= 6) || "Min 6 characters",
                blank: v => v && !!v.trim() || 'Field cannot be blank',
            },
            dateProps: {
                headerColor: 'primary',
                min: this.moment(Date.now()).format('YYYY-MM-DD')
            },
            timeProps: {
                useSeconds: false,
                ampmInTitle: true
            },
        }
    },
    methods:{
           validate() {
                if (this.$refs.form.validate()) {
                    if(this.type == 'add'){
                        this.addServiceEvent();
                    }else{
                        this.updateServiceEvent();
                    }
                }
            },
            async addServiceEvent(){
                await axios.post(`/api/services/insert`, this.form)
                .then((res)=>{
                    this.$refs.form.reset();
                    this.$emit('AddEvent');
                    this.showSuccess(res.data.message);
                })
            },
            async updateServiceEvent(){
                await axios.put(`/api/services/update/${this.form.id}`, this.form)
                .then((res)=>{
                    this.$refs.form.reset();
                    this.$emit('AddEvent');
                    this.showSuccess(res.data.message);
                })
            },
    },
    beforeMount() {
        if(this.type == "update"){
            if(this.form.date){
                let tmpDate = this.moment(this.form.date).format('YYYY-MM-DD h:mm');
                this.form.date = tmpDate;
            }
        }
       
    },
}
</script>
<style>
#date_picker .v-input__slot {
    border: 1px solid black !important;


}
</style>