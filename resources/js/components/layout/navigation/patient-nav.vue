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
                        text: 'Home',
                        link: 'PatientDashboard',
                        icon: 'mdi-view-dashboard'
                    },
                    {
                        text: 'Check-Up History',
                        link: 'CheckUpHistory',
                        icon: 'mdi-clipboard-text-clock'
                    },
               /*      {
                        text: 'Events',
                        link: 'HealthCenterEvents',
                        icon: 'mdi-calendar-check'
                    }, */
                      {
                        text: 'SMS',
                        link: 'PatientSms',
                        icon: 'mdi-message-text'
                    },
                ]
            }
        },
    }

</script>
