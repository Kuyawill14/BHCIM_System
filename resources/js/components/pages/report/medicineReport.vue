<template>
   <div class="pt-7 px-3">
        <v-row>
            <v-col cols="12">
                 <v-card >
                    <v-card-title class="align-start mb-0 pb-0">
                      <v-card light elevation="6" rounded color="primary" class="overflow-hidden mt-n9 transition-swing" style="max-width: 100%;width: 100%;">
                            <div class="pa-4">
                                <v-icon dark style="font-size: 25px;">mdi-pill-multiple</v-icon>
                                <span class="white--text">Medicine Stock Report</span> 
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
                            <v-text-field type="date" @change="fetchMedicineList" v-model="filter.date_from" dense append-icon="mdi-magnify" label="Date From"  
                                hide-details>
                            </v-text-field>
                           <div v-show="$vuetify.breakpoint.mdAndUp" class="px-2">-</div>
                            <v-text-field type="date"  v-model="filter.date_to" dense append-icon="mdi-magnify" label="Date To" 
                                hide-details>
                            </v-text-field>
                             <v-spacer v-show="$vuetify.breakpoint.mdAndUp" v-for="item in 5" :key="item"></v-spacer>
                            <v-text-field  v-model="search" placeholder="eg. name" dense append-icon="mdi-magnify" label="Search" 
                                hide-details>
                            </v-text-field>
                            
                          </v-card-title>

                          <v-data-table :items="patientList" :items-per-page="10" class="elevation-0">                                
                              <template v-slot:header >
                                    <thead>
                                    <tr>
                                        <th> <v-checkbox @change="selectAllData()" v-model="selectedAll"></v-checkbox></th>
                                        <th>Medicine Name</th>
                                        <th>Total Distributed</th>
                                        <th>Remaining Stocks</th>
                                    </tr>
                                    </thead>
                                </template>
                              
                              <template v-slot:body="{ items }">
                                  <tbody>
                                      <tr v-for="(item, index) in items" :key="index">
                                        <td width="5%">
                                            <v-checkbox v-model="item.selected"></v-checkbox>
                                        </td>
                                        <td >{{item.name}}</td>
                                        <td>{{item.total_given}}</td>
                                        <td>{{item.remaining}}</td>
                                       <!--  <td>{{convertDate(item.created_at)}}</td> -->
                                      </tr>
                                      <tr v-if="patientList.length == 0">
                                          <td colspan="4" class="text-center"> No data available</td>
                                      </tr>
                                  </tbody>
                              </template>
                          </v-data-table>
                      </v-card>
                   </div>
                </v-card>
            </v-col>
        </v-row>
    <VueHtml2pdf :show-layout="false"  :enable-download="true" :preview-modal="true"
        :paginate-elements-by-height="1000" filename="Check-Up Report" :pdf-quality="2" :manual-pagination="false"
        pdf-format="a4" pdf-orientation="portrait" pdf-content-width="780px" :html-to-pdf-options="pdfOptions" 
        @hasDownloaded="printData = []" ref="html2Pdf">
        <section slot="pdf-content">
             <section id="print_table" style="width:90%" class="pdf-item" >
                <div style="text-align:center">
                    <h2>Medicine Stocks Report</h2>
                </div>
             </section>

            <section id="print_table" style="width:90%" class="pdf-item" >
                <table >
                    <thead>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Total Distributed</th>
                            <th>Remaining Stocks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in printData" :key="index">
                            <td >{{item.name}}</td>
                            <td>{{item.total_given}}</td>
                            <td>{{item.remaining}}</td>
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
        filter:{
            date_from: '',
            date_to: '',
        },
        recordList: [],
        search: '',
        type:'add',
        dialog: false,
        valid: true,
        form: '',
        pdfOptions:{
            margin: 0.4,
            filename: 'Check-Up Report',
            jsPDF:{
                orientation: 'l',
                unit: 'in',
                format: 'a4',
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
                        return this.search.toLowerCase().split(' ').every(v => item.info.f_name.toLowerCase()
                    .includes(v) || item.info.l_name.toLowerCase().includes(v))
                })
            }
            else {
                return this.recordList;
            }
        },
    },
    methods: {
        JoinArray(data){
           let illness = [];
           data.forEach(item => {
                illness.push(item.name);
           });
           return illness.join(',');
        },
        convertDate(date){
            let tmp_date = new Date(date);
            let day = tmp_date.getDate() < 10 ? '0'+tmp_date.getDate(): tmp_date.getDate();
            let month = tmp_date.getMonth()+1 < 10 ? '0'+(tmp_date.getMonth()+1) : (tmp_date.getMonth()+1);
            let year = tmp_date.getFullYear();

            let formated_date =  year + '-' + month + '-' + day;
            return formated_date;
        },
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
                item.selected = this.selectedAll;
            });
        },
         async fetchMedicineList(){
            let params = `date_from=${this.filter.date_from}&date_to=${this.filter.date_to}`
            await axios.get(`/api/medicine/report?${params}`)
            .then((res)=>{
                this.recordList = res.data;
            })
        },
    },
    beforeMount() {
        this.fetchMedicineList();
    },
  }
</script>
<style>
    #print_table table{
        border: 1px solid #dddddd;
        width: 100%;
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
