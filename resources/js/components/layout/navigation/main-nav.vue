<template>
    <v-list dense nav>
        <template>
            <v-list-item 
            :to="{name: item.link}"
            v-for="(item, index) in navs" link  exact :key="index">
                <v-list-item-action>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title>
                        {{item.text}}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </template>
    </v-list>

</template>

<script>
    export default {
        props:['userDetails'],
        data() {
            return {
                navs: [
                    {
                        text: 'Dashboard',
                        link: 'Dashboard',
                        icon: 'mdi-monitor-dashboard'
                    },
                    {
                        text: 'Patient',
                        link: 'PatientInformation',
                        icon: 'mdi-account-group'
                    },
                    {
                        text: 'Check-Up',
                        link: 'CheckUp',
                        icon: 'mdi-account-heart'
                    },
                    {
                        text: 'Illness',
                        link: 'Illness',
                        icon: 'mdi-emoticon-sick-outline'
                    },
                    {
                        text: 'Purok',
                        link: 'Purok',
                        icon: 'mdi-home-group'
                    },
                    {
                        text: 'SMS',
                        link: 'Sms',
                        icon: 'mdi-message-text'
                    },
                    {
                        text: 'Report',
                        link: 'Report',
                        icon: 'mdi-file-chart'
                    },
                    
                ]
            }
        },
        mounted(){
            if(this.userDetails.role == 'administrator'){
                this.navs.push(
                    {
                        text: 'Accounts',
                        link: 'User',
                        icon: 'mdi-account-lock'
                    },
                    {
                        text: 'Setting',
                        link: 'Setting',
                        icon: 'mdi-cog'
                    }
                )
            }
        }

    }

</script>
