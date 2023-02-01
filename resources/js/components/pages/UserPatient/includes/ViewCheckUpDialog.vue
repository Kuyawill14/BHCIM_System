<template>
    <v-card class="pa-2">
        <v-card-title class="font-weight-bold justify-space-between">
            CHECK-UP RECORD
            <v-btn @click="$emit('closeDialog')" icon large>
                <v-icon>
                    mdi-close
                </v-icon>
            </v-btn>
        </v-card-title>
        <v-container>
           <v-row>
                <v-col cols="12" class="px-10 mt-3">
                    <v-row>
                         <v-col cols="12" class="my-0 py-0" md="4">
                            <div class="pb-2 font-weight-bold">Date of Check-Up</div>
                            <div class="d-flex">
                                <v-text-field v-model="form.checkUpDate" 
                                readonly
                                placeholder="Temperature" dense small type="date"  color="primary"  />
                            </div>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0" md="8">
                        </v-col>
                        <v-col cols="12" class="my-0 py-0" md="6">
                            <div class="pb-2 font-weight-bold">Temperature</div>
                            <div class="d-flex">
                                <v-text-field v-model="form.temperature" 
                                readonly
                                placeholder="Temperature" dense small type="number"  color="primary"  />
                            </div>
                        </v-col>
                        <v-col cols="12" class="my-0 py-0" md="6">
                            <div class="pb-2 font-weight-bold">Blood Pressure</div>
                            <div class="d-flex">
                                <v-text-field v-model="form.b_pressure_up" placeholder="Up" 
                                
                                dense small type="number" color="primary"  />
                                <div style="font-size:20px" class="px-2 mt-1 font-weight-bold">/</div>
                                <v-text-field v-model="form.b_pressure_down" placeholder="Down" 
                                readonly
                                dense small type="number" color="primary"  />
                            </div>
                        </v-col>
                        <v-col  cols="12" class="my-0 py-0" md="6">
                            <div class="pb-2 font-weight-bold">Pregnant</div>
                            <v-select
                                dense
                                item-text="text"
                                item-value="val"
                                v-model="form.pregnant"
                                readonly
                                :items="pregnant"
                                
                                color="primary"
                                placeholder="Pregnant"
                            ></v-select>
                        </v-col>
                        <v-col  cols="12" class="my-0 py-0" md="6">
                            <div class="pb-2 font-weight-bold">Months of Pregnancy</div>
                            <v-select
                                dense
                                readonly
                                v-model="form.month_of_pregnancy"
                                :items="month_of_pregnant"
                                
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
                            readonly
                            auto-grow
                            dense small rows="3" color="primary"  />
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text rounded @click="$emit('closeDialog')">Close</v-btn>
            
        </v-card-actions>
    </v-card>
</template>
<script>
export default {
    props:['type', 'formData', 'illnessList', 'medicineList'],
    data() {
        return {
            show: false,
            valid: true,
            form: this.formData ? this.formData : {
                name: '',
                description: '',
            },
            pregnant:[{text: 'YES', val: true},{text: 'NO', val: false}],
            month_of_pregnant: [],
            //illnessList: [],
        }
    },
    methods:{
        async getIllnessList(){
            await axios.get(`/api/illness`)
            .then((res)=>{
                this.illnessList = res.data;
            })
        },
    },
    beforeMount() {
        //this.getIllnessList();
        for (let i = 0; i < 10; i++) {
            this.month_of_pregnant.push(i+1)
        }
    },
}
</script>