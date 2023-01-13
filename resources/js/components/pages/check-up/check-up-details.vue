<template>
<v-row>
    <v-col class="text-center pt-5 mb-0 pb-0" cols="12">
        <v-avatar size="120">
            <v-img v-if="patientDetails.account"
                :alt="`${patientDetails.f_name} ${patientDetails.l_name} avatar`"
                :src="patientDetails.account.picture ? '/storage/'+patientDetails.account.picture : patientDetails.gender == 1 ? '/storage/upload/pp_1.png' : '/storage/upload/pp_2.png'">
            </v-img>
              <v-img v-else
                :alt="`${patientDetails.f_name} ${patientDetails.l_name} avatar`"
                :src="patientDetails.gender == 1 ? '/storage/upload/pp_1.png' : '/storage/upload/pp_2.png'">
            </v-img>
        </v-avatar>
    </v-col>
    <v-col class="text-center mt-0 pt-0 mb-0 pb-0" cols="12">
        <h2>{{patientDetails.f_name+", "+patientDetails.m_name+" "+patientDetails.l_name}}</h2>
    </v-col>
    <v-col class="text-center mt-0 pt-0" cols="12">
        <div class="d-flex justify-content-center">
            <div class="px-1"><strong><v-icon color="danger">mdi-home</v-icon>Purok:</strong> {{patientDetails.purok.name}}</div>
            <div class="px-2"><strong>Age:</strong> {{patientDetails.age}}</div>
            <div class="px-1"><strong><v-icon color="info">mdi-gender-female</v-icon>Gender:</strong> {{patientDetails.gender == 1 ? 'Male' : 'Female'}}</div>
        </div>
    </v-col>
</v-row>
</template>
<script>
export default {
    props:['patientDetails'],
}
</script>