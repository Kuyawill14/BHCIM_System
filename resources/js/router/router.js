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
                    path: "/patient-information",
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
                    path: "/check-up-record/:id",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/check-up/check-up-record.vue"),
                    name: "CheckUpRecord",
                    meta: { preview_name:  "Check-Up Record" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/check-up-add/:id",
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
                    path: "/patient-report",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/report/patientReport.vue"),
                    name: "PatientReport",
                    meta: { preview_name:  "PatientReport" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/checkup-report",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/report/checkUpReport.vue"),
                    name: "CheckUpReport",
                    meta: { preview_name:  "checkUpReport" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/illnessreport",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/report/illnessReport.vue"),
                    name: "IllnessReport",
                    meta: { preview_name:  "illnessReport" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/medicine-report",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/report/medicineReport.vue"),
                    name: "MedicineReport",
                    meta: { preview_name:  "medicineReport" },
                    beforeEnter: middleware.admin_bhw_rules
                },
                {
                    path: "/services",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/services/service.vue"),
                    name: "Services",
                    meta: { preview_name:  "Services" },
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
                    path: "/medicine",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "../components/pages/medicine/medicine.vue"),
                    name: "Medicine",
                    meta: { preview_name:  "Medicine" },
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
                    path: "/patient-dashboard",
                    component: () =>import ( /*webpackChunkName: "Patient"*/ "../components/pages/UserPatient/PatientMainPage.vue"),
                    name: "PatientDashboard",
                    beforeEnter: middleware.patient_rules
                },
                {
                    path: "/health-center-events",
                    component: () =>import ( /*webpackChunkName: "Patient"*/ "../components/pages/UserPatient/HealthCenterEvents.vue"),
                    name: "HealthCenterEvents",
                    beforeEnter: middleware.patient_rules
                },
                {
                    path: "/check-up-history",
                    component: () =>import ( /*webpackChunkName: "Patient"*/ "../components/pages/UserPatient/CheckUpHistory.vue"),
                    name: "CheckUpHistory",
                    beforeEnter: middleware.patient_rules
                },
                {
                    path: "/patient-sms",
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