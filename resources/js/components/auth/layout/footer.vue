<template>
<div >
    <div v-if="!$vuetify.breakpoint.xs && !$vuetify.breakpoint.sm" style="position:absolute;bottom: 5px; right: 5px">
      <!--    <v-btn
        style=" text-transform: unset !important;"
            @click="openFbPage()"
            id="help-btn" active-class="act-btn" depressed rounded text>
        <v-icon left>mdi-facebook</v-icon>    @ISUE-Orange 
        </v-btn>

        <v-btn
        style=" text-transform: unset !important;"
            @click=" openFbMessage()"
            id="help-btn" active-class="act-btn" depressed rounded text>
        <v-icon left>mdi-account-question</v-icon>  Help 
        </v-btn> -->
    </div>
   


    <div v-else>
        <!--  <v-app-bar color="white" outlined elevation="0" app dense bottom flat>
            <v-spacer></v-spacer>
             <v-btn
                style=" text-transform: unset !important;"
                    @click="openFbPage()"
                    id="help-btn" active-class="act-btn" depressed rounded text>
                <v-icon left>mdi-facebook</v-icon>    @ISUE-Orange 
                </v-btn>
                
                <v-btn
                style=" text-transform: unset !important;"
                    @click=" openFbMessage()"
                    id="help-btn" active-class="act-btn" depressed rounded text>
                <v-icon left>mdi-account-question</v-icon>  Help 
                </v-btn>
        </v-app-bar> -->
    </div>
</div>
</template>
<script>
export default {
   
}
</script>


