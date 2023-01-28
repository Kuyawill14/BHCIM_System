<template>
    <div>
        <v-form autocomplete="false"  ref="form" v-model="valid" lazy-validation>
            <v-row>
                <v-col cols="12" class="px-10 mt-3">
                    <v-row>
                        <v-col cols="12" class="my-0 py-0" md="6">
                            <div class="pb-2 font-weight-bold">Temperature</div>
                            <div class="d-flex">
                                <v-text-field v-model="form.temperature" :rules="[rules.required]" 
                                placeholder="Temperature" dense small type="number"  color="primary" outlined />
                            </div>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0" md="6">
                            <div class="pb-2 font-weight-bold">Blood Pressure</div>
                            <div class="d-flex">
                                <v-text-field v-model="form.b_pressure_up" :rules="[rules.required]"  placeholder="Up" 
                                dense small type="number" color="primary" outlined />
                                <div style="font-size:20px" class="px-2 mt-1 font-weight-bold">/</div>
                                <v-text-field v-model="form.b_pressure_down" :rules="[rules.required]"  placeholder="Down" 
                                dense small type="number" color="primary" outlined />
                            </div>
                        </v-col>
                        <v-col v-if="form.gender != 1 && form.age > 18" cols="12" class="my-0 py-0" md="4">
                            <div class="pb-2 font-weight-bold">Pregnant</div>
                            <v-select
                                dense
                                item-text="text"
                                item-value="val"
                                :rules="[rules.required]" 
                                v-model="form.pregnant"
                                :items="pregnant"
                                outlined
                                color="primary"
                                placeholder="Pregnant"
                            ></v-select>
                        </v-col>
                        <v-col v-if="form.gender != 1 && form.age > 18" cols="12" class="my-0 py-0" md="4">
                            <div class="pb-2 font-weight-bold">Last Menstruation</div>
                            <v-text-field v-model="form.last_mensturation" 
                                :disabled="form.pregnant == 'false'"
                                placeholder="Last Menstruation" dense small type="month"  color="primary" outlined />
                        </v-col>
                        <v-col v-if="form.gender != 1 && form.age > 18" cols="12" class="my-0 py-0" md="4">
                            <div class="pb-2 font-weight-bold">Months of Pregnancy</div>
                            <v-select
                                dense
                                v-model="form.month_of_pregnancy"
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
                                    <v-chip color="primary" small v-bind="data.attrs" :input-value="data.selected">
                                        {{ data.item.name }}
                                    </v-chip>
                                </template>
                                <template slot="item" slot-scope="data">
                                    <v-checkbox  v-model="data.selected"></v-checkbox>
                                    {{ data.item.name }}
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
                                    <v-chip color="primary" small v-bind="data.attrs" :input-value="data.selected">
                                        {{ data.item.name }}
                                    </v-chip>
                                </template>
                                <template slot="item" slot-scope="data">
                                    <v-checkbox  v-model="data.selected"></v-checkbox>
                                    {{ data.item.name }}
                                </template>
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0" md="12">
                            <div class="pb-2 font-weight-bold">Check-Up Details</div>
                            <v-textarea :rules="[rules.required]"   v-model="form.consultation_notes" placeholder="Check-up details" 
                            auto-grow dense outlined small rows="3" color="primary"  />
                        </v-col>
                        <v-col cols="12" class="pb-7 pt-0 mt-0 d-flex" md="12">
                            <v-btn @click="validate()" class="px-10" dark  rounded color="primary">
                                <v-icon left>mdi-check</v-icon>
                                Update
                            </v-btn>
                              <div class="px-2 px-md-2"></div>
                             <v-btn @click="$emit('closeView')" class="px-10" dark  rounded color="danger" >
                                <v-icon left>mdi-close</v-icon>
                                Cancel
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>
<script>
export default {
    props:['editdata'],
    data() {
        return {
            form: {},
            pregnant:[{text: 'YES', val: true},{text: 'NO', val: 'false'}],
            month_of_pregnant: [],
            rules: {
                required: value => !!value || "Field is Required.",
                min: v => (v && v.length >= 6) || "Min 6 characters",
                blank: v => v && !!v.trim() || 'Field cannot be blank',
            },
            illnessList: [],
            medicineList: [],
            valid: true,
        }
    },
    methods: {
        validate() {
            if (this.$refs.form.validate()) {
               this.updatRecord();
            }
        },
        seteditdata(){
            this.form.id = this.editdata.id;
            this.form.temperature = this.editdata.temperature;
            if(this.editdata.blood_pressure){
                let blood_pressure = this.editdata.blood_pressure.split("/");
                this.form.b_pressure_up = blood_pressure[0];
                this.form.b_pressure_down = blood_pressure[1];
            }
            this.form.age = this.editdata.info.age;
            this.form.gender = this.editdata.info.gender;
            this.form.pregnant = this.editdata.pregnant;
            this.form.illness_id = this.editdata.illness_id;
            this.form.medicine_given = this.editdata.medicine_given;

            this.form.last_mensturation = this.editdata.last_mensturation;
            this.form.month_of_pregnancy = this.editdata.month_of_pregnancy;
            this.form.consultation_notes = this.editdata.consultation_notes;
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
        async updatRecord(){
            await axios.put(`/api/check_up/update/${this.form.id}`, this.form)
                .then((res)=>{
                    if(res.data.success){
                        this.$refs.form.reset();
                        this.$emit('updatedRecord');
                        this.showSuccess(res.data.message);
                    }else{
                        this.showError(res.data.message);
                    }
                })
        }
    },
    beforeMount(){
        this.seteditdata();
        this.getIllnessList();
        this.getIMedicine();
    }
}
</script>