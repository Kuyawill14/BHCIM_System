<template>
    <v-card class="pa-1"> 
        <v-container fluid class="px-5">
            <v-form autocomplete="false" ref="form" v-model="valid" lazy-validation>
                <v-card-title class="font-weight-bold justify-space-between pl-0 ml-0 mb-3 pr-0 mr-0">
                    <div>
                        <v-icon color="primary" x-large>mdi-menu-right</v-icon>
                        PERSONAL INFORMATION
                    </div>
                    <v-btn @click="$refs.form.reset(),$emit('closeDialog')"  color="danger" small dark rounded>
                        <v-icon left>
                            mdi-close
                        </v-icon>
                        Cancel
                    </v-btn>
                </v-card-title>
                <v-row class=" pt-2 px-3">
                    <v-col cols="12" class="my-0 py-0" md="4">
                        <div class="pb-2 font-weight-bold">Last Name</div>
                        <v-text-field :readonly="type == 'view'" 
                        @input="$capitalizeFormLetter('l_name')"
                        v-model="form.l_name" dense :rules="nameRules" placeholder="Last Name"
                            color="primary" type="text" :outlined="type != 'view'" />
                    </v-col>
                    
                    <v-col cols="12" class="my-0 py-0" md="4">
                        <div class="pb-2 font-weight-bold">First Name</div>
                        <v-text-field @input="$capitalizeFormLetter('f_name')" placeholder="First Name" dense small type="text" v-model="form.f_name"
                            :rules="nameRules"
                            :readonly="type == 'view'"
                            color="primary" :outlined="type != 'view'" />
                    </v-col>
                    <v-col cols="12" class="my-0 py-0"  md="2">
                        <div class="pb-2 font-weight-bold">Middle Initial</div>
                        <v-text-field @input="$capitalizeFormLetter('m_name')" :readonly="type == 'view'" placeholder="M.I" dense type="text" v-model="form.m_name"
                            maxlength="1"
                            :rules="nameRules"
                            color="primary" :outlined="type != 'view'" />
                    </v-col>
                    <v-col cols="12" class="my-0 py-0"  md="2">
                        <div class="pb-2 font-weight-bold">Ext(eg. Jr. Sr.)</div>
                        <v-text-field 
                         @input="$capitalizeFormLetter('name_ext')"
                        :readonly="type == 'view'" placeholder="Ext" dense type="text" v-model="form.name_ext"
                            maxlength="2"
                            color="primary" :outlined="type != 'view'" />
                    </v-col>
                    <v-col cols="12" class="my-0 py-0" md="3">
                        <div class="pb-2 font-weight-bold">Gender</div>
                        <v-select
                        :readonly="type == 'view'"
                            dense
                            :rules="nameRules"
                            v-model="form.gender"
                            :items="genderType"
                            item-text="text"
                            item-value="val"
                            :outlined="type != 'view'"
                            color="primary"
                            placeholder="Gender"
                        ></v-select>
                    </v-col>
                    
                    <v-col cols="12" class="my-0 py-0" md="4">
                            <div class="pb-2 font-weight-bold">Date of Birth</div>
                            <v-text-field :readonly="type == 'view'" placeholder="Date of Birth" dense 
                            @change="getAge()"
                            type="date" v-model="form.b_date"
                            :rules="nameRules"
                            color="primary" :outlined="type != 'view'" />
                    </v-col>
                    <v-col cols="12" class="my-0 py-0" md="2">
                        <div class="pb-2 font-weight-bold">Age</div>
                            <v-text-field :readonly="type == 'view'" placeholder="Age" dense type="number"  v-model="form.age"
                            :rules="nameRules"
                            color="primary" :outlined="type != 'view'" />
                    </v-col>
                    <v-col v-if="form.age > 5 || form.age == ''" cols="12" class="my-0 py-0" md="3">
                        <div class="pb-2 font-weight-bold">Civil Status</div>
                        <v-select
                            dense
                            :readonly="type == 'view'"
                            :rules="nameRules"
                            v-model="form.status"
                            :items="statusType"
                            :outlined="type != 'view'"
                            color="primary"
                            placeholder="Civil Status"
                        ></v-select>
                    </v-col>
                        <v-col cols="12" class="my-0 py-0" md="12">
                            <div class="pb-2 font-weight-bold">Place of Birth</div>
                            <v-textarea
                            @input="$capitalizeFormLetter('b_place')"
                            v-model="form.b_place"
                            :readonly="type == 'view'"
                            :outlined="type != 'view'"
                            dense
                            :rules="nameRules"
                            auto-grow
                            rows="2"
                            prepend-inner-icon="mdi-map-marker"
                            placeholder="Place of Birth"
                            ></v-textarea>
                    </v-col>
                    
                    <v-col v-if="form.age >= 18" cols="12" class="my-0 py-0" md="12">
                            <div class="pb-2 font-weight-bold">Occcupation</div>
                            <v-textarea
                            @input="$capitalizeFormLetter('occupation')"
                            :readonly="type == 'view'"
                            v-model="form.occupation"
                            :outlined="type != 'view'"
                            dense
                            :rules="nameRules"
                            auto-grow
                            rows="2"
                            placeholder="Occcupation"
                            ></v-textarea>
                    </v-col>
                    <v-col v-if="form.age > 5 && form.age <= 17" cols="12" class="my-0 py-0" md="12">
                        <div class="pb-2 font-weight-bold">Guardian Name</div>
                        <v-textarea
                        @input="$capitalizeFormLetter('guardian')"
                        :readonly="type == 'view'"
                        v-model="form.guardian"
                        :outlined="type != 'view'"
                        dense
                        auto-grow
                        rows="2"
                        placeholder="Guardian Name(Optional)"
                        ></v-textarea>
                    </v-col>

                    <v-card-title v-if="form.age <= 5 && form.age != ''" class="font-weight-bold justify-space-between pl-0 ml-0 mb-2">
                            <div>
                            <v-icon color="primary" x-large>mdi-menu-right</v-icon>
                            PARENT INFORMATION
                        </div>
                    </v-card-title>

                    <v-col v-if="form.age <= 5 && form.age != ''" cols="12" class="my-0 py-0" md="6">
                        <div class="pb-2 font-weight-bold">Mother Name</div>
                        <v-text-field :readonly="type == 'view'" @input="$capitalizeFormLetter('mother_name')" placeholder="Mother Name" 
                        :rules="nameRules" dense type="text"  v-model="form.mother_name"
                        color="primary" :outlined="type != 'view'" />
                    </v-col>
                     <v-col v-if="form.age <= 5 && form.age != ''" cols="12" class="my-0 py-0" md="6">
                        <div class="pb-2 font-weight-bold">Father Name</div>
                        <v-text-field :readonly="type == 'view'" placeholder="Father Name" 
                        :rules="nameRules" dense type="text" @input="$capitalizeFormLetter('father_name')" v-model="form.father_name"
                        color="primary" :outlined="type != 'view'" />
                    </v-col>

                    <v-col cols="12" class="my-0 py-0" md="7">
                        <div class="pb-2 font-weight-bold">Mobile Number</div>
                        <v-text-field :readonly="type == 'view'" placeholder="Mobile Number" 
                        prepend-inner-icon="mdi-cellphone"
                        :rules="[nameRules, rules.min, rules.max]" dense type="number"  v-model="form.cell_number"
                        color="primary" :outlined="type != 'view'" />
                    </v-col>
                    <v-col cols="12" class="my-0 py-0" md="5">
                        <div class="pb-2 font-weight-bold">Purok</div>
                        <v-select
                        :readonly="type == 'view'"
                        dense
                        :rules="nameRules"
                        v-model="form.purok_id"
                        item-text="value"
                        item-value="id"
                        :items="purokList"
                        :outlined="type != 'view'"
                        color="primary"
                        placeholder="Purok">
                            <template slot="selection" slot-scope="data">
                            {{ data.item.name }} {{ data.item.number}}
                            </template>
                            <template slot="item" slot-scope="data">
                                {{ data.item.name }} {{ data.item.number }}
                            </template>
                        </v-select>
                    </v-col>
                     <v-col cols="12" class="my-0 py-0" md="7">
                        <div class="pb-0 font-weight-bold">NHTS Member</div>
                        <v-radio-group :readonly="type == 'view'" class="pt-0 " row v-model="form.nhts_member">
                        <v-radio
                            v-for="mem in fourPMember"
                            :key="mem.val"
                            :label="mem.text"
                            :value="mem.val"
                        ></v-radio>
                        </v-radio-group>
                    </v-col>
                    <v-col cols="12" class="my-0 py-0" md="7">
                        <div class="pb-0 font-weight-bold">4Ps Member</div>
                        <v-radio-group :readonly="type == 'view'" class="pt-0 " row v-model="form.fourps_member">
                        <v-radio
                            
                            v-for="mem in fourPMember"
                            :key="mem.val"
                            :label="mem.text"
                            :value="mem.val"
                        ></v-radio>
                        </v-radio-group>
                    </v-col>

                </v-row>
                

                <v-card-title class="font-weight-bold justify-space-between pl-0 ml-0 mb-2">
                        <div>
                        <v-icon color="primary" x-large>mdi-menu-right</v-icon>
                        HEALTH INFORMATION
                    </div>
                </v-card-title>

                <v-row class="px-3 pt-2">
                    <v-col cols="12" class="my-0 py-0" md="6">
                        <div class="pb-2 font-weight-bold">Illness History</div>
                            <v-textarea
                            @input="$capitalizeFormLetter('illness_history')"
                            :readonly="type == 'view'"
                            v-model="form.illness_history"
                            :outlined="type != 'view'"
                            dense
                            :rules="nameRules"
                            auto-grow
                            rows="2"
                            prepend-inner-icon="mdi-account-injury"
                            placeholder="Illness History (Put N/A if none)"
                            ></v-textarea>
                    </v-col>
                   
                    <v-col cols="12" class="my-0 py-0" md="6"></v-col>
                
                    <v-col cols="12" class="my-0 py-0"  md="3">
                        <div class="pb-2 font-weight-bold">Blood Type</div>
                            <v-select
                            :readonly="type == 'view'"
                            dense
                            :rules="nameRules"
                            v-model="form.b_type"
                            :items="bloodType"
                            :outlined="type != 'view'"
                            color="primary"
                            placeholder="Blood Type"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" class="my-0 py-0" md="9"></v-col>
                    <v-col v-if="form.age <= 5 && form.age != ''" cols="12" class="my-0 py-0"  md="3">
                        <div class="pb-2 font-weight-bold">Type of Delivery</div>
                            <v-select
                            :readonly="type == 'view'"
                            dense
                            v-model="form.delivery_type"
                            :items="delivery_type"
                            :outlined="type != 'view'"
                            color="primary"
                            placeholder="Type of Delivery"
                        ></v-select>
                    </v-col>
                     <v-col v-if="form.age <= 5 && form.age != ''" cols="12" class="my-0 py-0"  md="3">
                        <div class="pb-2 font-weight-bold">Time of Delivery</div>
                          <v-text-field :readonly="type == 'view'" placeholder="Time of Delivery" dense small type="time" 
                            v-model="form.delivery_time"
                            color="primary" :outlined="type != 'view'" />
                    </v-col>
                    <v-col cols="12" class="my-0 py-0" md="12"></v-col>
                    <v-col cols="12" class="my-0 py-0"  md="6">
                        <div class="pb-0 font-weight-bold">Vaccine Given</div>
                        <v-row v-if="form.age <= 5 && form.age != ''">
                            <v-col cols="6">
                                <v-checkbox :readonly="type == 'view'" hide-details v-model="form.hepa_b" label="Hepatitis B Vaccine"></v-checkbox>
                                <v-checkbox :readonly="type == 'view'" hide-details v-model="form.bcg" label="Bacillus Calmette-Guérin"></v-checkbox>
                                <v-checkbox :readonly="type == 'view'" v-model="form.dptv" label="Diphtheria-Pertussis-Tetanus Vaccine"></v-checkbox>
                            </v-col>
                             <v-col cols="6">
                                <v-checkbox :readonly="type == 'view'" hide-details  v-model="form.opv" label="Oral Polio Vaccine"></v-checkbox>
                                <v-checkbox :readonly="type == 'view'" hide-details  v-model="form.mv" label="Measles Vaccine"></v-checkbox>
                            </v-col>
                        </v-row>
                         <v-row v-else>
                            <v-col cols="6">
                                <v-checkbox :readonly="type == 'view'" v-model="form.covid" label="Covid Vaccine"></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col cols="12" class="my-0 py-0" md="6"></v-col>
                    <v-col cols="12" class="my-0 py-0" md="6">
                        <div class="pb-2 font-weight-bold">Sickness</div>
                            <v-textarea
                             @input="$capitalizeFormLetter('sickness')"
                            :readonly="type == 'view'"
                            v-model="form.sickness"
                            :outlined="type != 'view'"
                            dense
                            :rules="nameRules"
                            auto-grow
                            rows="2"
                            prepend-inner-icon="mdi-account-injury"
                            placeholder="Sickness (Put N/A if none)"
                            ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="my-0 py-0" md="6"></v-col>
                    <v-col v-if="form.age > 5 " cols="12" class="my-0 py-0" md="6">
                        <div class="pb-2 font-weight-bold">Medication Taken</div>
                            <v-textarea
                            @input="$capitalizeFormLetter('medication')"
                            :readonly="type == 'view'"
                            v-model="form.medication"
                            :outlined="type != 'view'"
                            dense
                            :rules="nameRules"
                            auto-grow
                            rows="2"
                            prepend-inner-icon="mdi-pill"
                            placeholder="Medication (Put N/A if none)"
                            ></v-textarea>
                    </v-col>
                </v-row>
      
                <v-card-actions v-if="type != 'view'" class="pr-0 mr-0 pb-3 pt-2">
                    <v-btn :loading="isloading" class="px-10" large rounded color="primary" @click="validate()">
                        <v-icon left>mdi-lock</v-icon>
                        {{this.type == "add" ? 'Submit' :  'Update'}}</v-btn>
                </v-card-actions>
            </v-form>
        </v-container>
        
    </v-card>
</template>
<script>
  export default {
    props:['type', 'formData','purokList'],
    data () {
      return {
            genderType: [
                {text: 'Male', val: 1},
                {text: 'Female', val: 2},
            ],
            fourPMember:[
                {text: 'YES', val: 1},
                {text: 'NO', val: 0},
            ],
            statusType: ['Single', 'Married','Widowed'],
            delivery_type: ['Normal Spontaneous Delivery', 'Cesarean delivery'],
            valid: true,
            months_pregnant: [1,2,3,5,6,7,8,9],
            bloodType: ['A+', 'A-', 'B+','B-', 'O+', 'O-', 'AB+', 'AB-'],
            pregnant:[
                {text: 'Yes', val: true},
                {text: 'No', val: false}
            ],
            form: this.formData ? this.formData : {
                l_name: '',
                f_name: '',
                m_name: '',
                name_ext: '',
                gender: '',
                status: '',
                b_date: '',
                age: '',
                b_place: '',
                occupation: '',
                guardian: '',
                cell_number: '',
                purok_id: '',
                height: '',
                weight: '',
                b_type: '',
                sickness: '',
                medication: '',
                illness_history: ''
            },
            nameRules: [
                v => !!v || 'Field is required',
            ],
            rules: {
                required: value => !!value || "Field is Required.",
                min: v => (v && v.length >= 11) || "Min 11 characters",
                max: v => (v && v.length <= 11) || "Max 11 characters",
                blank: v => v && !!v.trim() || 'Field cannot be blank',
            },
            isloading: false,
      }
    },
    methods: {
          validate() {
            if (this.$refs.form.validate()) {
                this.isloading = true;
                if(this.type == 'add'){
                    this.addPatientInformation();
                }else{
                    this.updatePatientInformation();
                }
            }
          },
         reset () {
            this.$refs.form.reset()
        },
        clearInputs(){
            this.form.l_name = '';
            this.form.f_name = '';
            this.form.m_name = '';
            this.form.name_ext = '';
            this.form.gender = '';
            this.form.status = '';
            this.form.b_date = '';
            this.form.age = '';
            this.form.b_place = '';
            this.form.occupation = '';
            this.form.guardian = '';
            this.form.cell_number = '';
            this.form.purok_id = '';
            this.form.height = '';
            this.form.weight = '';
            this.form.b_type = '';
            this.form.sickness = '';
            this.form.medication = '';
            this.form.illness_history = '';
            this.$refs.form.resetValidation();
        },
        getAge(){
            let ageMS = Date.parse(new Date()) - Date.parse(this.form.b_date);
            let age = new Date();
            age.setTime(ageMS);
            let ageYear = age.getFullYear() - 1970;
            this.form.age = ageYear;
        },
        async updatePatientInformation(){
            let url = this.form.age <= 5 ? `/api/patient_information/update-child` : `/api/patient_information/update`;
            await axios.put(`${url}/${this.form.id}`, this.form)
            .then((res)=>{
                 if(res.data.success){
                    this.$refs.form.reset();
                    this.showSuccess(res.data.message);
                    this.$emit('UpdatePatient');
                    
                }else{
                    this.showError(res.data.message);
                }
            })
            this.isloading = false;
        },
        async addPatientInformation(){
            //this.getAge();
            let url = this.form.age <= 5 ? `/api/patient_information/insert-child` : `/api/patient_information/insert`;
             this.form.cell_number.replace(/\s/g,'');
                await axios.post(url, this.form)
                .then((res)=>{
                    if(res.data.success){
                        this.$refs.form.reset();
                        this.showSuccess(res.data.message);
                        this.$emit('AddPatient', res.data.data);
                    }else{
                        this.showError(res.data.message);
                    }
                })
            this.isloading = false;
            
        },
    },
    beforeMount(){
        if(this.formData){
            this.form.height = this.formData.health_record.height;
            this.form.weight = this.formData.health_record.weight;
            this.form.health_record_id = this.formData.health_record.id;
            this.form.b_type = this.formData.health_record.blood_type;
            this.form.pregnant = this.formData.health_record.isPregnant == 1 ? true : false;
            this.form.months_pregnant = this.formData.health_record.month_of_pregnant;
            this.form.sickness = this.formData.health_record.sickness;
            this.form.medication = this.formData.health_record.medication;
            this.form.delivery_type = this.formData.health_record.delivery_type;
            this.form.delivery_time = this.formData.health_record.delivery_time;
            this.form.hepa_b = this.formData.health_record.hepa_b;
            this.form.bcg = this.formData.health_record.bcg;
            this.form.dptv = this.formData.health_record.dptv;
            this.form.opv = this.formData.health_record.opv;
            this.form.mv = this.formData.health_record.mv;
            this.form.covid = this.formData.health_record.covid;
            this.form.illness_history = this.formData.health_record.illness_history;
        }
    }
  }
</script>