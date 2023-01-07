<template>
    <v-app >
        <sidebar :system_setting="system_setting"></sidebar>
        <v-main>
            <v-container class="pt-5"  fluid width="100%">
                <router-view :system_setting="system_setting"></router-view>
            </v-container>
        </v-main>
    </v-app>
</template>

<style lang="scss" scoped>
    .md-app {
        height: 100vh;
    }
</style>

<script>
    import sidebar from "./layout/sidebar";
    export default {
        props:['system_setting'],
        data: () => ({
            UserDetails: [],
            drawer: null,
            menuVisible: false,
            role: '',
            ipAdd: null,
            evaluation_dialog: true,
        }),
        components: {
            sidebar,
        },
        //computed: mapGetters(["get_UserRole", "get_CurrentUser","get_evaluation_dialog"]),
        methods: {
          
        },
        beforeMount(){
           this.$vuetify.theme.themes.light.primary = this.system_setting.color;
        }
    }

</script>

<style>
   .v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
    .v-data-table > .v-data-table__wrapper > table > thead > tr > th,
    .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
        font-size: 14px !important;
    
    }
</style>


