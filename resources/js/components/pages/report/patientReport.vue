<template>
   <div class="pt-7 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="primary" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                            <div class="pa-4">
                                <v-icon dark style="font-size: 25px;">mdi-account-group</v-icon>
                                <span class="white--text">Patient List Report</span> 
                            </div>
                        </v-card>
                    </v-card-title>
                 
                   <div class="px-10 py-10">
                    <v-row>
                        <v-col cols="12 d-flex justify-end">
                            <div class="mt-5">
                                <v-btn @click="printSelected()" dark rounded color="primary">
                                    <v-icon left>mdi-printer</v-icon>
                                    Print Selected
                                </v-btn>
                            </div>
                        </v-col>
                    </v-row>
                    <v-card elevation="0">
                          <v-card-title>
                              <v-select
                            dense
                            label="Filter by Age"
                            v-model="patient_type"
                            :items="typeSelect"
                            item-text="text"
                            item-value="val"
                            color="primary"
                        ></v-select>
                        <v-spacer v-show="$vuetify.breakpoint.mdAndUp" v-for="item in 10" :key="item"></v-spacer>
                            <v-text-field  v-model="search" placeholder="eg. name" dense append-icon="mdi-magnify" label="Search" single-line
                                hide-details>
                            </v-text-field>
                            
                          </v-card-title>

                          <v-data-table   :items="patientList" :items-per-page="10" class="elevation-0">                                
                              <template v-slot:header >
                                    <thead>
                                    <tr>
                                        <th> <v-checkbox @change="selectAllData()" v-model="selectedAll"></v-checkbox></th>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Age</th>
                                        <th>Status</th>
                                        <th>Cp #</th>
                                        <th>Purok</th>
                                    </tr>
                                    </thead>
                                </template>
                              
                              <template v-slot:body="{ items }">
                                  <tbody>
                                      <tr v-for="(item, index) in items" :key="index">
                                        <td width="5%">
                                            <v-checkbox v-model="item.selected"></v-checkbox>
                                        </td>
                                          <td width="20%">{{item.l_name+" "+item.m_name+" "+item.f_name}}</td>
                                          <td>
                                            <v-chip v-if="item.gender == 1" small dark class="ma-2" color="blue" >
                                              Male
                                            </v-chip>
                                             <v-chip v-else small dark class="ma-2" color="red" >
                                              Female
                                            </v-chip>
                                          </td>
                                          <td>{{item.status}}</td>
                                          <td>{{item.age}}</td>
                                          <td>{{item.cell_number}}</td>
                                          <td>{{item.purok ? item.purok.name : ''}}</td>
                                      </tr>
                                      <tr v-if="patientList.length == 0">
                                          <td colspan="42" class="text-center"> No data available</td>
                                      </tr>
                                  </tbody>
                              </template>
                          </v-data-table>
                      </v-card>
                   </div>
                </v-card>
            </v-col>
        </v-row>
    <VueHtml2pdf :show-layout="false"  :enable-download="false" :preview-modal="true"
        :paginate-elements-by-height="1000" filename="Patient Report" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" pdf-orientation="portrait" pdf-content-width="780px" :html-to-pdf-options="pdfOptions" 
        @hasDownloaded="printData = []" ref="html2Pdf">
        <section slot="pdf-content">
             <section id="print_table" style="width:90%" class="pdf-item" >
                <div style="text-align:center">
                    <div style="line-height: 12px;font-weight:bold">Patient List</div>
                </div>
             </section>

            <section id="print_table" style="width:90%" class="pdf-item" >
                <table >
                    <thead>
                        <tr v-if="patient_type != 2">
                            <th></th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>M.I</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Cp #</th>
                            <th>Purok</th>
                        </tr>
                         <tr v-else>
                            <th></th>
                            <th>Last Name</th>
                            <th>First Name</th>
                            <th>M.I</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Mother Name</th>
                            <th>Father Name</th>
                            <th>Parent Cp #</th>
                            <th>Purok</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in printData" :key="index">
                            <td>{{index+1}}</td>
                            <td>{{item.l_name}}</td>
                            <td>{{item.f_name}}</td>
                            <td>{{item.m_name}}</td>
                            <td>{{item.gender == 1 ? 'Male' : 'Female'}}</td>
                            <td>{{item.age}}</td>
                            <td v-if="patient_type == 2">{{item.mother_name}}</td>
                            <td v-if="patient_type == 2">{{item.father_name}}</td>
                            <td>{{item.cell_number}}</td>
                            <td>{{item.purok.name}}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </section>
    </VueHtml2pdf>
    </div>
</template>

<script>
import VueHtml2pdf from 'vue-html2pdf';
  export default {
   
    data () {
      return {
        loading: false,
        search: '',
        recordList: [],
        search: '',
        type:'add',
        dialog: false,
        valid: true,
        form: '',
        patient_type: 1,
        typeSelect: [
            {text: 'All', val: 1},
            {text: '0-5', val: 2},
            {text: '6-17', val: 3},
            {text: '18 and up', val: 4},
        ],
        pdfOptions:{
            margin: 0.4,
            filename: 'Patient List',
            jsPDF:{
                orientation: 'p',
                unit: 'in',
                format: 'legal',
                putOnlyUsedFonts:true,
                floatPrecision: 16, // or "smart", default is 16
            },
            pagebreak: { mode: ['avoid-all']}
        },
        printData: [],
        selectedAll: [],
      }
    },
    computed: {
      patientList(){
            if(this.search) {
                return this.recordList.filter((item) => {
                        return this.search.toLowerCase().split(' ').every(v => item.f_name.toLowerCase()
                    .includes(v) || item.l_name.toLowerCase().includes(v))
                })
            }
            if(this.patient_type) {
                if(this.patient_type == 1){
                    return this.recordList;
                }else if(this.patient_type == 2){
                     return this.recordList.filter((item) => {
                        return (item.age <= 5);
                    })
                }else if(this.patient_type == 3){
                     return this.recordList.filter((item) => {
                        return (item.age > 5 && item.age <= 17);
                    })
                }else if(this.patient_type == 4){
                     return this.recordList.filter((item) => {
                        return (item.age >= 18);
                    })
                }
            }
            else {
                return this.recordList;
            }
        },
    },
    methods: {
        printSelected(){
            this.recordList.forEach(item => {
                if(item.selected){
                    this.printData.push(item);
                }
            });
            if(this.printData.length > 0){
                this.$refs.html2Pdf.generatePdf();
            }
        },
        selectAllData(){
            this.recordList.forEach(item => {
                if(this.patient_type == 1){
                    item.selected = this.selectedAll;
                }else if(this.patient_type == 2){
                    if(item.age <= 5){
                        item.selected = this.selectedAll;
                    }
                }else if(this.patient_type == 3){
                    if(item.age > 5 && item.age <= 17){
                        item.selected = this.selectedAll;
                    }
                }else if(this.patient_type == 4){
                   if(item.age >= 18){
                        item.selected = this.selectedAll;
                    }
                }
            });
        },
        async fetchPatientList(){
            await axios.get(`/api/patient_information`)
            .then((res)=>{
                this.recordList = res.data;
            })
        },
    },
    beforeMount() {
        this.fetchPatientList();
    },
  }
</script>
<style>
    #print_table table{
        border: 1px solid #dddddd;
        width: 100%;
       font-size: 11px;
    }
    #print_table th{
      
        background-color: #388E3C;
        color: #ffffff;
        padding: 0.5em;
    }
    #print_table td{
        border: 1px solid #dddddd;
        padding: 0.3em;
    }
</style>
