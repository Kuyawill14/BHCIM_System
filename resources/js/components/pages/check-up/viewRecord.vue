<template>
    <div>
        <v-row>
            <v-col cols="12" class="px-10 mt-3">
                <v-row>
                    <v-col cols="12" class="my-0 py-0" md="6">
                        <div class="pb-2 font-weight-bold">Temperature</div>
                        <div class="d-flex">
                            <v-text-field v-model="form.temperature" 
                            placeholder="Temperature" dense small type="number"  color="primary" readonly />
                        </div>
                    </v-col>
                    <v-col cols="12" class="my-0 py-0" md="6">
                        <div class="pb-2 font-weight-bold">Blood Pressure</div>
                        <div class="d-flex">
                            <v-text-field v-model="form.b_pressure_up" placeholder="Up" 
                            dense small type="number" color="primary" readonly />
                            <div style="font-size:20px" class="px-2 mt-1 font-weight-bold">/</div>
                            <v-text-field v-model="form.b_pressure_down" placeholder="Down" 
                            dense small type="number" color="primary" readonly />
                        </div>
                    </v-col>
                    <v-col v-if="form.gender != 1 && form.age > 18" cols="12" class="my-0 py-0" md="4">
                        <div class="pb-2 font-weight-bold">Pregnant</div>
                        <v-select
                            dense
                            item-text="text"
                            item-value="val"
                            v-model="form.pregnant"
                            :items="pregnant"
                            readonly
                            color="primary"
                            placeholder="Pregnant"
                        ></v-select>
                    </v-col>
                    <v-col v-if="form.gender != 1 && form.age > 18" cols="12" class="my-0 py-0" md="4">
                        <div class="pb-2 font-weight-bold">Last Menstruation</div>
                        <v-text-field v-model="form.last_mensturation" 
                            :disabled="form.pregnant == 'false'"
                            placeholder="Last Menstruation" dense small type="month"  color="primary" readonly />
                    </v-col>
                    <v-col v-if="form.gender != 1 && form.age > 18" cols="12" class="my-0 py-0" md="4">
                        <div class="pb-2 font-weight-bold">Months of Pregnancy</div>
                        <v-select
                            dense
                            v-model="form.month_of_pregnancy"
                            readonly
                            color="primary"
                            placeholder="Number of months pregnant"
                        ></v-select>
                    </v-col>
                    <v-col cols="12" class="my-0 py-0" md="6">
                        <div class="pb-2 font-weight-bold">Related Illness</div>
                            <v-autocomplete
                            v-model="form.illness_id"
                            :items="illnessList"
                            readonly
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
                            readonly
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
                        <v-textarea  v-model="form.consultation_notes" placeholder="Check-up details" 
                        auto-grow dense readonly small rows="3" color="primary"  />
                    </v-col>
                    <v-col cols="12" class="pb-7 pt-0 mt-0" md="12">
                        <v-btn @click="$emit('closeView')" class="px-10" dark  rounded color="danger" >
                            <v-icon left>mdi-close</v-icon>
                                Close
                            </v-btn>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>
<script>
export default {
    props:['viewdata'],
    data() {
        return {
            form: {},
            pregnant:[{text: 'YES', val: true},{text: 'NO', val: 'false'}],
            illnessList: [],
            medicineList: []
        }
    },
    methods: {
        setViewData(){
            this.form.id = this.viewdata.id;
            this.form.temperature = this.viewdata.temperature;
            if(this.viewdata.blood_pressure){
                let blood_pressure = this.viewdata.blood_pressure.split("/");
                this.form.b_pressure_up = blood_pressure[0];
                this.form.b_pressure_down = blood_pressure[1];
            }
            this.form.age = this.viewdata.info.age;
            this.form.gender = this.viewdata.info.gender;
            this.form.pregnant = this.viewdata.pregnant;
            this.form.illness_id = this.viewdata.illness_id;
            this.form.medicine_given = this.viewdata.medicine_given;
            console.log(this.form.medicine_given);

            this.form.last_mensturation = this.viewdata.last_mensturation;
            this.form.month_of_pregnancy = this.viewdata.month_of_pregnancy;
            this.form.consultation_notes = this.viewdata.consultation_notes;
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
    },
    beforeMount(){
        this.setViewData();
        this.getIllnessList();
        this.getIMedicine();
    }
}
</script>