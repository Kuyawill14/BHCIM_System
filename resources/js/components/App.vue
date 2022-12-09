<template>
   <div>
      <router-view :system_setting="system_setting"></router-view>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                system_setting:[],
            }
        },
       methods: {
           async fetchSystemSetting(){
                await axios.get(`/api/settings`)
                .then((res)=>{
                    this.system_setting = res.data;
                })
            },
        },
        beforeMount(){
            this.fetchSystemSetting();
        }
    }
</script>
<style>
  #nprogress .bar {
  background: #2196F3 !important;
  height: 3px !important;
  }
  #nprogress .peg {
    box-shadow: 0 0 10px #2196F3, 0 0 5px #2196F3 !important;
  }
  #nprogress .spinner{
      border-radius: 60% !important;
  }
</style>
