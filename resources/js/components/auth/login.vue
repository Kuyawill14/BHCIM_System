<template>
    <v-app>
        <v-container :class="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm  ? '' : 'fill-height'" fluid>

            <v-row align="center" justify="center">

                <v-col :class="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm  ? '' : 'ma-0 pa-0'" cols="12" sm="12"
                    md="12">

                    <v-row :class="$vuetify.breakpoint.xs || $vuetify.breakpoint.sm  ? 'fill-height' : ''" align="center" justify="center">
                        <sideContainer :system_setting="system_setting"></sideContainer>

                        <v-col :class="$vuetify.breakpoint.xs ? 'ma-0 pa-3 PB-0' :'ma-0 pa-0'" cols="12" md="5">
                          <!--   <vue-element-loading :active="isLoggin" spinner="bar-fade-scale" color="#EF6C00" /> -->
                            <v-row align="center" justify="center">
                                <v-col class="text-left" cols="12" md="12" lg="12" sm="7">
                                    <v-card-text v-if="!isForgotPassword">
                                        <v-form @submit.prevent="validate" class="text-center" ref="loginForm"
                                            v-model="valid" lazy-validation>
                                            <v-row align="center" justify="center">
                                                <v-col class="ma-0 pa-0 text-left" cols="12" md="8">
                                                    <div class=" text-md-h5 text-xs-h5 text-sm-h6 font-weight-bold">
                                                        Account <span class="font-weight-regular">Login</span>
                                                    </div>
                                                   
                                                </v-col>

                                                <v-col class="ma-0 pa-0 mt-4" cols="12" md="8">
                                                    <v-text-field outlined label="Username" v-model="form.username"
                                                        :rules="loginEmailRules" name="Username" prepend-inner-icon="mdi-account"
                                                        dense type="text"
                                                        :color="system_setting.color" required />
                                                </v-col>
                                                <v-col class="ma-0 pa-0 mt-2 mb-0" cols="12" md="8">
                                                    <v-text-field class="mb-0 pb-0" dense
                                                        outlined v-model="form.password"
                                                        :append-icon="show ?'mdi-eye':'mdi-eye-off'"
                                                        :rules="[rules.required, rules.min, rules.blank]"
                                                        :type="show ? 'text' : 'password'" name="password"
                                                        label="Password" prepend-inner-icon="mdi-lock"
                                                        hint="At least 6 characters" :color="system_setting.color" counter
                                                        @click:append="show = !show">
                                                    </v-text-field>
                                                </v-col>


                                                <v-col class="ma-0 pa-0  d-flex" cols="12" md="8">
                                                    <span>
                                                        <v-checkbox class="ma-0 pa-0" hide-spin-buttons v-model="form.remember" label="Remember me"></v-checkbox>
                                                    </span>
                                                <v-spacer></v-spacer>
                                                    <span class="mt-0">
                                                         <a href="#"
                                                         style="text-decoration:none"
                                                        @click.prevent="isForgotPassword = !isForgotPassword, IsloadingComponent = !IsloadingComponent"
                                                        >Forgot Password?</a>
                                                    </span>
                                                </v-col>
                                                <v-col
                                                    :class="$vuetify.breakpoint.mdAndUp ? 'ma-0 pa-0 text-left' : 'ml-0 pl-0 pr-0 mr-0 mt-1'"
                                                    cols="12" md="8">
                                                    <v-btn dark :color="system_setting.color" class="mb-5" type="submit" 
                                                        :block="!$vuetify.breakpoint.mdAndUp"
                                                        :large="!$vuetify.breakpoint.mdAndUp"
                                                        :rounded="!$vuetify.breakpoint.mdAndUp" :loading="isLoggin">
                                                        <v-icon class="mr-3">mdi-login</v-icon>
                                                        Login
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-form>
                                    </v-card-text>


                                    <v-card-text v-if="isForgotPassword">
                                        <div class="text-center">
                                            <v-progress-circular v-if="IsloadingComponent" color="primary"
                                                indeterminate></v-progress-circular>
                                        </div>

                                        <forgotPassword v-on:toggleIsloading="IsloadingComponent = !IsloadingComponent"
                                            v-on:toggleLogin="isForgotPassword = !isForgotPassword"></forgotPassword>
                                    </v-card-text>
                                </v-col>
                            </v-row>




                        </v-col>

<!-- 
                        <div style="position:absolute;bottom: 5px; right: 5px">
                         
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
                        </div> -->
                       <!--  <footer></footer> -->
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-app>
</template>

<script>
    //const footer = () => import( /* webpackChunkName: "login_layout" */ "./layout/footer")
    const sideContainer = () => import( /* webpackChunkName: "login_layout" */ "./layout/sideContainer")

    export default {
        props:['system_setting'],
        title: 'Login',
        components: {
            //footer,
            sideContainer,
        },
        data() {
            return {
                isLoggin: false,
                dialog: true,
                valid: true,
                form: {
                    username: "",
                    password: "",
                    remember: false
                },
                loginEmailRules: [
                    v => !!v || "Required",
                ],
                show: false,
                rules: {
                    required: value => !!value || "Required.",
                    min: v => (v && v.length >= 6) || "Min 6 characters",
                    blank: v => v && !!v.trim() || 'Field cannot be blank',
                },
                ToManyAttepmtError: null,
                isForgotPassword: false,
                IsloadingComponent: false
            }
        },
        computed: {
            passwordMatch() {
                return () => this.password === this.verify || "Password must match";
            }
        },
        methods: {
            validate() {
                if (this.$refs.loginForm.validate()) {
                    this.login();
                }
            },
            reset() {
                this.$refs.form.reset();
            },
            resetValidation() {
                this.$refs.form.resetValidation();
            },
            login() {
                 this.$store.dispatch('login', this.form)
            .then((res)=>{
                if(res.data.success){
                        this.showSuccess(res.data.message);
                        if(res.data.details.role == 'administrator' || res.data.details.role == 'bhw')this.$router.push({name: 'Dashboard'});
                        else if(res.data.details.role == 'patient')this.$router.push({name: 'PatientDashboard'});
                    }
                    else this.showError(res.data.message);
                    this.isloading = false;
                }).catch(()=>{
                    this.showError('Login Failed');
                    this.isloading = false;
                })
                //this.$router.push({name: 'Dashboard'})
            },
        
        },
    };

</script>
