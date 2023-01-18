"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[535],{5870:(t,e,s)=>{s.r(e),s.d(e,{default:()=>o});const a={props:["system_setting"],title:"Login",components:{sideContainer:function(){return s.e(927).then(s.bind(s,8220))}},data:function(){return{isLoggin:!1,dialog:!0,valid:!0,form:{username:"",password:"",remember:!1},loginEmailRules:[function(t){return!!t||"Required"}],show:!1,rules:{required:function(t){return!!t||"Required."},min:function(t){return t&&t.length>=6||"Min 6 characters"},blank:function(t){return t&&!!t.trim()||"Field cannot be blank"}},ToManyAttepmtError:null,isForgotPassword:!1,IsloadingComponent:!1}},computed:{passwordMatch:function(){var t=this;return function(){return t.password===t.verify||"Password must match"}}},methods:{validate:function(){this.$refs.loginForm.validate()&&this.login()},reset:function(){this.$refs.form.reset()},resetValidation:function(){this.$refs.form.resetValidation()},login:function(){var t=this;this.$store.dispatch("login",this.form).then((function(e){e.data.success?(t.showSuccess(e.data.message),"administrator"==e.data.details.role||"bhw"==e.data.details.role?t.$router.push({name:"Dashboard"}):"patient"==e.data.details.role&&t.$router.push({name:"PatientDashboard"})):t.showError(e.data.message),t.isloading=!1})).catch((function(){t.showError("Login Failed"),t.isloading=!1}))}}};const o=(0,s(1900).Z)(a,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-app",[s("v-container",{class:t.$vuetify.breakpoint.xs||t.$vuetify.breakpoint.sm?"":"fill-height",attrs:{fluid:""}},[s("v-row",{attrs:{align:"center",justify:"center"}},[s("v-col",{class:t.$vuetify.breakpoint.xs||t.$vuetify.breakpoint.sm?"":"ma-0 pa-0",attrs:{cols:"12",sm:"12",md:"12"}},[s("v-row",{class:t.$vuetify.breakpoint.xs||t.$vuetify.breakpoint.sm?"fill-height":"",attrs:{align:"center",justify:"center"}},[s("sideContainer",{attrs:{system_setting:t.system_setting}}),t._v(" "),s("v-col",{class:t.$vuetify.breakpoint.xs?"ma-0 pa-3 PB-0":"ma-0 pa-0",attrs:{cols:"12",md:"5"}},[s("v-row",{attrs:{align:"center",justify:"center"}},[s("v-col",{staticClass:"text-left",attrs:{cols:"12",md:"12",lg:"12",sm:"7"}},[t.isForgotPassword?t._e():s("v-card-text",[s("v-form",{ref:"loginForm",staticClass:"text-center",attrs:{"lazy-validation":""},on:{submit:function(e){return e.preventDefault(),t.validate.apply(null,arguments)}},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[s("v-row",{attrs:{align:"center",justify:"center"}},[s("v-col",{staticClass:"ma-0 pa-0 text-left",attrs:{cols:"12",md:"8"}},[s("div",{staticClass:"text-md-h5 text-xs-h5 text-sm-h6 font-weight-bold"},[t._v("\n                                                        Account "),s("span",{staticClass:"font-weight-regular"},[t._v("Login")])])]),t._v(" "),s("v-col",{staticClass:"ma-0 pa-0 mt-4",attrs:{cols:"12",md:"8"}},[s("v-text-field",{attrs:{outlined:"",label:"Username",rules:t.loginEmailRules,name:"Username","prepend-inner-icon":"mdi-account",dense:"",type:"text",color:t.system_setting.color,required:""},model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}})],1),t._v(" "),s("v-col",{staticClass:"ma-0 pa-0 mt-2 mb-0",attrs:{cols:"12",md:"8"}},[s("v-text-field",{staticClass:"mb-0 pb-0",attrs:{dense:"",outlined:"","append-icon":t.show?"mdi-eye":"mdi-eye-off",rules:[t.rules.required,t.rules.min,t.rules.blank],type:t.show?"text":"password",name:"password",label:"Password","prepend-inner-icon":"mdi-lock",hint:"At least 6 characters",color:t.system_setting.color,counter:""},on:{"click:append":function(e){t.show=!t.show}},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),s("v-col",{staticClass:"ma-0 pa-0 d-flex",attrs:{cols:"12",md:"8"}},[s("span",[s("v-checkbox",{staticClass:"ma-0 pa-0",attrs:{"hide-spin-buttons":"",label:"Remember me"},model:{value:t.form.remember,callback:function(e){t.$set(t.form,"remember",e)},expression:"form.remember"}})],1),t._v(" "),s("v-spacer"),t._v(" "),s("span",{staticClass:"mt-0"},[s("a",{staticStyle:{"text-decoration":"none"},attrs:{href:"#"},on:{click:function(e){e.preventDefault(),t.isForgotPassword=!t.isForgotPassword,t.IsloadingComponent=!t.IsloadingComponent}}},[t._v("Forgot Password?")])])],1),t._v(" "),s("v-col",{class:t.$vuetify.breakpoint.mdAndUp?"ma-0 pa-0 text-left":"ml-0 pl-0 pr-0 mr-0 mt-1",attrs:{cols:"12",md:"8"}},[s("v-btn",{staticClass:"mb-5",attrs:{dark:"",color:t.system_setting.color,type:"submit",block:!t.$vuetify.breakpoint.mdAndUp,large:!t.$vuetify.breakpoint.mdAndUp,rounded:!t.$vuetify.breakpoint.mdAndUp,loading:t.isLoggin}},[s("v-icon",{staticClass:"mr-3"},[t._v("mdi-login")]),t._v("\n                                                        Login\n                                                    ")],1)],1)],1)],1)],1),t._v(" "),t.isForgotPassword?s("v-card-text",[s("div",{staticClass:"text-center"},[t.IsloadingComponent?s("v-progress-circular",{attrs:{color:"primary",indeterminate:""}}):t._e()],1),t._v(" "),s("forgotPassword",{on:{toggleIsloading:function(e){t.IsloadingComponent=!t.IsloadingComponent},toggleLogin:function(e){t.isForgotPassword=!t.isForgotPassword}}})],1):t._e()],1)],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,null,null).exports}}]);