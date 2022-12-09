<template>

    <v-list nav>
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
        data() {
            return {
                navs: [
                    {
                        text: 'Dashboard',
                        link: 'Dashboard',
                        icon: 'mdi-monitor-dashboard'
                    },
                    {
                        text: 'Barangay Record',
                        link: 'BarangayRecord',
                        icon: 'mdi-account-group'
                    },
                      {
                        text: 'Health Record',
                        link: 'HealthRecord',
                        icon: 'mdi-account-heart'
                    },
                    {
                        text: 'Purok',
                        link: 'Purok',
                        icon: 'mdi-home-group'
                    },
                    {
                        text: 'Report',
                        link: 'Report',
                        icon: 'mdi-file-chart'
                    },
                    {
                        text: 'SMS',
                        link: 'Sms',
                        icon: 'mdi-message-text'
                    },
                    {
                        text: 'User',
                        link: 'User',
                        icon: 'mdi-account-lock'
                    },
                    {
                        text: 'Setting',
                        link: 'Setting',
                        icon: 'mdi-cog'
                    }
                ]
            }
        },

    }

</script>
