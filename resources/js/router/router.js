import Vue from "vue";
import Router from "vue-router";
import NProgress from 'nprogress';
import middleware from './middleware'
import '../../../node_modules/nprogress/nprogress.css'

Vue.use(Router);
const router = new Router({
    mode: "history",
    routes: [
        {
            path: "",
            component: () =>
                import ( /* webpackChunkName: "main-view" */ "../components/main-app"),
            name: "MainApp",
            children: [
                {
                    path: "/",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/dashboard/dashboard.vue"),
                    name: "Dashboard",
                    meta: { preview_name:  "Dashboard" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/patientinformation",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/patient_information/patient-information.vue"),
                    name: "PatientInformation",
                    meta: { preview_name:  "Patients" },
                    beforeEnter: middleware.admin_bhw_rules
                },                
                {
                    path: "/checkup",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/check-up/check-up.vue"),
                    name: "CheckUp",
                    meta: { preview_name:  "Check-Up" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/checkuprecord/:id",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/check-up/check-up-record.vue"),
                    name: "CheckUpRecord",
                    meta: { preview_name:  "Check-Up Record" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/checkupadd/:id",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/check-up/check-up-add.vue"),
                    name: "CheckUpAdd",
                    meta: { preview_name:  "Check-Up ADD" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/illness",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/Illness/Illness.vue"),
                    name: "Illness",
                    meta: { preview_name:  "Illness" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/purok",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/purok/purok.vue"),
                    name: "Purok",
                    meta: { preview_name:  "Purok" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/report",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/report/report.vue"),
                    name: "Report",
                    meta: { preview_name:  "Report" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/sms",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/sms/sms.vue"),
                    name: "Sms",
                    meta: { preview_name:  "Sms Support" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/accounts",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/users/users.vue"),
                    name: "User",
                    meta: { preview_name:  "Accounts" },
                    beforeEnter: middleware.admin_rules
                },
                {
                    path: "/setting",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/setting/setting.vue"),
                    name: "Setting",
                    meta: { preview_name:  "Settings" },
                    beforeEnter: middleware.admin_rules
                },
                {
                    path: "/profile",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/profile/profile.vue"),
                    name: "Profile",
                    meta: { preview_name:  "Profile" },
                    beforeEnter: middleware.bhw_rules
                },
                {
                    path: "/patientdashboard",
                    component: () =>import ( /*webpackChunkName: "Patient"*/ "../components/pages/UserPatient/PatientMainPage.vue"),
                    name: "PatientDashboard",
                    beforeEnter: middleware.patient_rules
                },
                {
                    path: "/myappointment",
                    component: () =>import ( /*webpackChunkName: "Patient"*/ "../components/pages/UserPatient/PatientAppointment.vue"),
                    name: "MyAppointment",
                    beforeEnter: middleware.patient_rules
                },
                {
                    path: "/checkuphistory",
                    component: () =>import ( /*webpackChunkName: "Patient"*/ "../components/pages/UserPatient/CheckUpHistory.vue"),
                    name: "CheckUpHistory",
                    beforeEnter: middleware.patient_rules
                },
                {
                    path: "/patientsms",
                    component: () =>import ( /*webpackChunkName: "Patient"*/ "../components/pages/UserPatient/PatientSms.vue"),
                    name: "PatientSms",
                    beforeEnter: middleware.patient_rules
                },
            ],
        },
        
        {
            path: "/login",
            component: () =>import ( /*webpackChunkName: "login"*/ "../components/auth/login.vue"),
            name: "login",
            beforeEnter: middleware.guest
        },
    ]
})

router.beforeEach((to, from, next) => {
    NProgress.start()
    next();
})

router.afterEach(() => {
    NProgress.done()
})



export default router