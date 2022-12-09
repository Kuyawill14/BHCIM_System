import Vue from "vue";
import Router from "vue-router";
import NProgress from 'nprogress';
import '../../node_modules/nprogress/nprogress.css'

Vue.use(Router);
const router = new Router({
    mode: "history",
    routes: [
        {
            path: "",
            component: () =>
                import ( /* webpackChunkName: "main-view" */ "./components/main-app"),
            name: "MainApp",
            children: [
                {
                    path: "/",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "./components/pages/dashboard/dashboard.vue"),
                    name: "Dashboard",
                    meta: { preview_name:  "Dashboard" }
                },
                {
                    path: "/barangayrecord",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "./components/pages/barangay_record/barangay-record.vue"),
                    name: "BarangayRecord",
                    meta: { preview_name:  "Barangay Record" }
                },
                {
                    path: "/healthrecord",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "./components/pages/health_record/health-record.vue"),
                    name: "HealthRecord",
                    meta: { preview_name:  "Health Record" }
                },
                {
                    path: "/purok",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "./components/pages/purok/purok.vue"),
                    name: "Purok",
                    meta: { preview_name:  "Purok" }
                },
                {
                    path: "/report",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "./components/pages/report/report.vue"),
                    name: "Report",
                    meta: { preview_name:  "Report" }
                },
                {
                    path: "/sms",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "./components/pages/sms/sms.vue"),
                    name: "Sms",
                    meta: { preview_name:  "Sms Support" }
                },
                {
                    path: "/user",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "./components/pages/users/users.vue"),
                    name: "User",
                    meta: { preview_name:  "Accounts" }
                },
                {
                    path: "/setting",
                    component: () =>import ( /*webpackChunkName: "dashboard"*/ "./components/pages/setting/setting.vue"),
                    name: "Setting",
                    meta: { preview_name:  "Settings" }
                },
            ],
        },
        {
            path: "/login",
            component: () =>import ( /*webpackChunkName: "login"*/ "./components/auth/login.vue"),
            name: "login"
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