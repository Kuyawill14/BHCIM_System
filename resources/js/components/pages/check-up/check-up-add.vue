<template>
    <div>
        <v-container flat class="pa-1 d-flex justify-center align-center">
            <v-card elevation="0" :width="$vuetify.breakpoint.mdAndUp ? '90%' : '100%'" class="pa-2">
               <checkDetails v-if="isloaded" :patientDetails="patientDetails"></checkDetails>
                <v-form autocomplete="false"  ref="form" v-model="valid" lazy-validation>
                    <v-row>
                        <v-col cols="12" class="px-10 mt-3">
                            <v-row>
                                <v-col cols="12" class="my-0 py-0" :md="patientDetails.age <= 5 ? '12' : '6'">
                                    <div class="pb-2 font-weight-bold">Temperature</div>
                                    <div class="d-flex">
                                        <v-text-field v-model="form.temperature" 
                                        :rules="[rules.required]" 
                                        placeholder="Temperature" dense small type="number"  color="primary" outlined />
                                    </div>
                                </v-col>
                                <v-col v-if="patientDetails.age > 5" cols="12" class="my-0 py-0" md="6">
                                    <div class="pb-2 font-weight-bold">Blood Pressure</div>
                                    <div class="d-flex">
                                        <v-text-field v-model="form.b_pressure_up" placeholder="Up" 
                                        :rules="[rules.required]" 
                                        dense small type="number" color="primary" outlined />
                                        <div style="font-size:20px" class="px-2 mt-1 font-weight-bold">/</div>
                                        <v-text-field v-model="form.b_pressure_down" placeholder="Down" 
                                        :rules="[rules.required]" 
                                        dense small type="number" color="primary" outlined />
                                    </div>
                                </v-col>
                                <v-col v-if="patientDetails.gender != 1 && patientDetails.age > 18" cols="12" class="my-0 py-0" md="4">
                                    <div class="pb-2 font-weight-bold">Pregnant</div>
                                    <v-select
                                        dense
                                        item-text="text"
                                        item-value="val"
                                         v-model="form.pregnant"
                                        :rules="[rules.required]" 
                                        :items="pregnant"
                                        outlined
                                        color="primary"
                                        placeholder="Pregnant"
                                    ></v-select>
                                </v-col>
                                <v-col v-if="patientDetails.gender != 1 && patientDetails.age > 18" cols="12" class="my-0 py-0" md="4">
                                    <div class="pb-2 font-weight-bold">Last Menstruation</div>
                                    <v-text-field @change="computeMonthPregnant()" v-model="form.last_mensturation" 
                                        :disabled="form.pregnant == 'false'"
                                        placeholder="Last Menstruation" dense small type="month"  color="primary" outlined />
                                </v-col>
                                <v-col v-if="patientDetails.gender != 1 && patientDetails.age > 18" cols="12" class="my-0 py-0" md="4">
                                    <div class="pb-2 font-weight-bold">Months of Pregnancy</div>
                                    <v-select
                                        dense
                                        :disabled="form.pregnant == 'false'"
                                        v-model="form.month_of_pregnancy"
                                        :items="month_of_pregnant"
                                        outlined
                                        color="primary"
                                        placeholder="Number of months pregnant"
                                    ></v-select>
                                </v-col>
                                <v-col cols="12" class="my-0 py-0" md="6">
                                    <div class="pb-2 font-weight-bold">Related Illness</div>
                                     <v-autocomplete
                                        v-model="form.illness_id"
                                        :items="illnessList"
                                        outlined
                                        dense
                                        chips
                                        item-text="name"
                                        item-value="id"
                                        color="primary"
                                        placeholder="Illness"
                                        multiple>
                                         <template slot="selection" slot-scope="data">
                                            <v-chip small color="primary" v-bind="data.attrs" :input-value="data.selected">
                                                {{ data.item.name }}
                                            </v-chip>
                                        </template>
                                    </v-autocomplete>
                                </v-col>

                                
                                <v-col cols="12" class="my-0 py-0" md="6">
                                    <div class="pb-2 font-weight-bold">Prescribe Medicine</div>
                                    <v-autocomplete
                                        v-model="form.medicine_given"
                                        :items="medicineList"
                                        outlined
                                        dense
                                        chips
                                        item-text="name"
                                        item-value="id"
                                        color="primary"
                                        placeholder="Prescription Medicine"
                                        multiple>
                                        <template slot="selection" slot-scope="data">
                                            <v-chip small color="primary" v-bind="data.attrs" :input-value="data.selected">
                                                {{ data.item.name }}
                                            </v-chip>
                                        </template>
                                     
                                    </v-autocomplete>
                                </v-col>

                                <v-col v-if="patientDetails.age <= 5" cols="12" class="my-0 py-0 mb-md-5" md="12">
                                    <div class="font-weight-bold">Vaccines Given</div>
                                        <v-row>
                                            <v-col class="mb-0 pb-0 pb-md-2 mb-md-2" cols="12" md="4">
                                                <v-checkbox hide-details v-model="form.hepa_b" label="Hepatitis B Vaccine"></v-checkbox>
                                                 <v-checkbox hide-details v-model="form.dptv" label="Diphtheria-Pertussis-Tetanus Vaccine"></v-checkbox>
                                            </v-col>
                                            <v-col class="my-0 py-0 py-md-2 my-md-2" cols="12" md="4">
                                                <v-checkbox hide-details v-model="form.bcg" label="Bacillus Calmette-Guérin"></v-checkbox>
                                                <v-checkbox hide-details  v-model="form.opv" label="Oral Polio Vaccine"></v-checkbox>
                                            </v-col>
                                            <v-col class="mt-0 pt-0 pt-md-2 mt-md-2" cols="12" md="4">
                                                <v-checkbox hide-details  v-model="form.mv" label="Measles Vaccine"></v-checkbox>
                                            </v-col>
                                        </v-row>
                                </v-col>
                                <v-col cols="12" class="my-0 py-0" md="12">
                                    <div class="pb-2 font-weight-bold">Check-Up Remarks</div>
                                    <v-textarea  v-model="form.consultation_notes" placeholder="Check-up remarks" 
                                    :rules="[rules.required]" 
                                    auto-grow
                                    dense small rows="3" color="primary" outlined />
                                </v-col>
                                <v-col cols="12" class="pb-7 pt-0 mt-0" md="12">
                                    <v-btn class="px-10" @click="validate()" rounded color="primary" >
                                        <v-icon left>mdi-lock</v-icon>
                                            Submit
                                        </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card>
        </v-container>
    </div>
</template>
<script>
import checkDetails from './check-up-details'
export default {
    components:{
        checkDetails
    },
    data() {
        return {
            illnessList: [],
            medicineList: [],
            patientDetails: [],
            valid: true,
            isloaded: false,
            pregnant:[{text: 'YES', val: true},{text: 'NO', val: 'false'}],
            month_of_pregnant: [],
            rules: {
                required: value => !!value || "Field is Required.",
                min: v => (v && v.length >= 6) || "Min 6 characters",
                blank: v => v && !!v.trim() || 'Field cannot be blank',
            },
            form: {
                patient_id: this.$route.params.id,
                b_pressure_up: '',
                b_pressure_down: '',
                temperature: '',
                pregnant: '',
                month_of_pregnancy: '',
                medicine_given: '',
                illness_id: '',
                consultation_notes: '',
                gender: '',
                hepa_b: '',
                dptv: '',
                bcg: '',
                opv: '',
                mv: '',
            },
        }
    },
    methods:{
         async getPatientDetails(){
            axios.get(`/api/patient_information/view/${this.$route.params.id}`)
            .then((res)=>{
                if(res.data.success){
                    this.patientDetails = res.data.data;
                    this.form.hepa_b = this.patientDetails.health_record.hepa_b;
                    this.form.dptv = this.patientDetails.health_record.dptv;
                    this.form.bcg = this.patientDetails.health_record.bcg;
                    this.form.opv = this.patientDetails.health_record.opv;
                    this.form.mv = this.patientDetails.health_record.mv;
                    this.isloaded = true;
                }
            })
        },
        async getIllnessList(){
            await axios.get(`/api/illness`)
            .then((res)=>{
                this.illnessList = res.data;
            })
        },
         async getIMedicine(){
            await axios.get(`/api/medicine`)
            .then((res)=>{
                this.medicineList = res.data;
            })
        },
        validate() {
            if (this.$refs.form.validate()) {
               this.AddCheckUpRecord();
            }
        },
        async AddCheckUpRecord(){
            this.form.health_record_id = this.patientDetails.health_record.id;
            this.form.gender = this.patientDetails.gender;
            await axios.post(`/api/check_up/insert`, this.form)
            .then((res)=>{
                if(res.data.success){
                    this.$refs.form.reset();
                    this.showSuccess(res.data.message);
                    this.$router.push({name: 'CheckUpRecord', params:{id: this.$route.params.id}})
                }else{
                    this.showError(res.data.message);
                }
            })
        },
        computeMonthPregnant(){
            let currentDate = new Date();
            let date = new Date(this.form.last_mensturation+'-01')
            let month;
            month = (currentDate.getFullYear() - date.getFullYear()) * 12;
            month -= date.getMonth() + 1;
            month += currentDate.getMonth()+1;

            this.form.month_of_pregnancy = month;
        }
    },
    beforeMount(){
        this.getPatientDetails();
        this.getIllnessList();
        this.getIMedicine();
        for (let i = 0; i < 10; i++) {
            this.month_of_pregnant.push(i+1)
        }
    }
}
</script>