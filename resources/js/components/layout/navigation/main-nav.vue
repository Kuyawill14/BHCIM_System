<template>
    <v-list    dense nav>
        <v-list-item link  exact :to="{name:'Dashboard'}">
            <v-list-item-icon>
                <v-icon>mdi-monitor-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>
                    Dashboard
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

         <v-list-group active-class="info"  id="sub_group" :value="false" no-action prepend-icon="mdi-account-group">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>
                        Patient
                    </v-list-item-title>
                </v-list-item-content>
            </template>
            <v-list dense nav sub-group>
                <v-list-item link  exact :to="{name:'PatientInformation'}">
                    <v-list-item-icon>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            List
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                 <v-list-item link  exact :to="{name:'Purok'}">
                    <v-list-item-icon>
                        <v-icon>mdi-home-group</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            Purok
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-list-group>

         <v-list-group id="sub_group" active-class="info"  :value="false" no-action prepend-icon="mdi-account-heart">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>
                        Health
                    </v-list-item-title>
                </v-list-item-content>
            </template>
            <v-list dense nav sub-group>
                <v-list-item link exact :to="{name:'CheckUp'}">
                    <v-list-item-icon>
                        <v-icon>mdi-account-check</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            Check-up Patient 
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link  exact :to="{name:'Illness'}">
                    <v-list-item-icon>
                        <v-icon>mdi-emoticon-sick-outline</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            Illness
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
               <v-list-item link  exact :to="{name:'Medicine'}">
                    <v-list-item-icon>
                        <v-icon>mdi-pill-multiple</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            Medicines
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-list-group>
        <v-list-item link  exact :to="{name:'Services'}">
            <v-list-item-icon>
                <v-icon>mdi-calendar-check</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>
                    Services
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item link  exact :to="{name:'Sms'}">
            <v-list-item-icon>
                <v-icon>mdi-message-text</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>
                    SMS
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-group id="sub_group" active-class="info"  :value="false" no-action prepend-icon="mdi-file-document-multiple-outline">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>
                        Report
                    </v-list-item-title>
                </v-list-item-content>
            </template>
            <v-list dense nav sub-group>
                <v-list-item link  exact :to="{name:'PatientReport'}">
                    <v-list-item-title>
                        Patient List Report
                    </v-list-item-title>
                </v-list-item>
                <v-list-item link  exact :to="{name:'CheckUpReport'}">
                    <v-list-item-title>
                        Check-up Report
                    </v-list-item-title>
                </v-list-item>
                <v-list-item link  exact :to="{name:'IllnessReport'}">
                    <v-list-item-title>
                        Illness Report
                    </v-list-item-title>
                </v-list-item>
                 <v-list-item link  exact :to="{name:'MedicineReport'}">
                    <v-list-item-title>
                        Medicine Stock Report
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-list-group>

         <v-list-group active-class="info"  v-if="userDetails.role == 'administrator'"  id="sub_group" :value="false" no-action prepend-icon="mdi-cog">
            <template v-slot:activator>
                <v-list-item-content>
                    <v-list-item-title>
                        Setting
                    </v-list-item-title>
                </v-list-item-content>
            </template>
            <v-list dense nav sub-group>
                <v-list-item v-if="userDetails.role == 'administrator'" link  exact :to="{name:'User'}">
                    <v-list-item-icon>
                        <v-icon>mdi-account-lock</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            System Accounts
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link  exact :to="{name:'Setting'}">
                    <v-list-item-icon>
                        <v-icon>mdi-wrench-cog</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title>
                            Edit Setting
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-list-group>
    </v-list>
</template>

<script>
    export default {
        props:['userDetails'],
    }
</script>
<style scoped>
.v-application  .primary--text{
    color: white !important;
}
</style>
