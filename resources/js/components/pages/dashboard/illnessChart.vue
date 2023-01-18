<template>
  <Pie
    id="my-chart-id"
    :options="chartOptions"
    :data="chartData"
  />
</template>

<script>
import { Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale,LinearScale)

export default {
  name: 'PieChart',
  props:['illnessData'],
  components: { Pie },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [
            {  
                backgroundColor: [],
                data: [] 
            } 
        ]
      },
      chartOptions: {
        responsive: true,
         plugins: {
            legend: {
                 labels: {
                    padding: 15,
                    usePointStyle: true,
                },
                position: 'right',
            }
        }
      }
    }
  },
  methods:{
    generateColor(){
       const randomColor = Math.floor(Math.random()*16777215).toString(16);
       return "#" + randomColor;
    },
    getColor(){
        let colors = ['#41B883', '#E46651', '#00D8FF', '#DD1B16', '#9C27B0', '#E91E63', '#4A148C' , '#B71C1C',
          '#AA00FF','#3F51B5','#673AB7','#3949AB','#1E88E5','#311B92','#009688','#1DE9B6','#8BC34A','#4CAF50',
          '#CDDC39','#F0F4C3','#76FF03','#FF9800','#E65100','#FFEA00','#8D6E63','#546E7A','#4E342E','#33691E'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
  },
  beforeMount(){
    this.illnessData.forEach(item => {
        this.chartData.labels.push(item.name);
        this.chartData.datasets[0].data.push(item.check_up_record_count);
        this.chartData.datasets[0].backgroundColor.push(this.generateColor());
    });
  }
}
</script>