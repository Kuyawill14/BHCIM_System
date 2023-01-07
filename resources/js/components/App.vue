<template>
   <div>
      <router-view :system_setting="system_setting"></router-view>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        computed: {
            system_setting(){
                return this.$store.getters.setting;
            },
        },
        beforeMount(){
            this.$store.dispatch('systemSetting');
        },
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
