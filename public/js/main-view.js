/*! For license information please see main-view.js.LICENSE.txt */
"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[814],{8663:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(3645),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,".md-app[data-v-2651b040]{height:100vh}",""]);const i=o},9347:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(3645),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,".navigation_list .v-list-item--active[data-v-1146825a]{background:red!important}",""]);const i=o},7167:(t,e,r)=>{r.d(e,{Z:()=>i});var n=r(3645),o=r.n(n)()((function(t){return t[1]}));o.push([t.id,".v-data-table>.v-data-table__wrapper>table>tbody>tr>th,.v-data-table>.v-data-table__wrapper>table>tfoot>tr>th,.v-data-table>.v-data-table__wrapper>table>thead>tr>th{font-size:14px!important}",""]);const i=o},4798:(t,e,r)=>{r.r(e),r.d(e,{default:()=>y});function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}function o(){o=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,i=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},s=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function h(t,e,r,n){var o=e&&e.prototype instanceof p?e:p,a=Object.create(o.prototype),s=new N(n||[]);return i(a,"_invoke",{value:x(t,r,s)}),a}function v(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=h;var f={};function p(){}function d(){}function m(){}var y={};l(y,s,(function(){return this}));var g=Object.getPrototypeOf,b=g&&g(g(S([])));b&&b!==e&&r.call(b,s)&&(y=b);var _=m.prototype=p.prototype=Object.create(y);function w(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function o(i,a,s,c){var u=v(t[i],t,a);if("throw"!==u.type){var l=u.arg,h=l.value;return h&&"object"==n(h)&&r.call(h,"__await")?e.resolve(h.__await).then((function(t){o("next",t,s,c)}),(function(t){o("throw",t,s,c)})):e.resolve(h).then((function(t){l.value=t,s(l)}),(function(t){return o("throw",t,s,c)}))}c(u.arg)}var a;i(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return a=a?a.then(n,n):n()}})}function x(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return R()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var s=L(a,r);if(s){if(s===f)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=v(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===f)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function L(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,L(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),f;var o=v(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,f;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,f):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,f)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function E(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function S(t){if(t){var e=t[s];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:R}}function R(){return{value:void 0,done:!0}}return d.prototype=m,i(_,"constructor",{value:m,configurable:!0}),i(m,"constructor",{value:d,configurable:!0}),d.displayName=l(m,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,l(t,u,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},w(k.prototype),l(k.prototype,c,(function(){return this})),t.AsyncIterator=k,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new k(h(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},w(_),l(_,u,"Generator"),l(_,s,(function(){return this})),l(_,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=S,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(E),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var s=r.call(i,"catchLoc"),c=r.call(i,"finallyLoc");if(s&&c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(s){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,f):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),f},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),E(r),f}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;E(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:S(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),f}},t}function i(t,e,r,n,o,i,a){try{var s=t[i](a),c=s.value}catch(t){return void r(t)}s.done?e(c):Promise.resolve(c).then(n,o)}const a={props:["system_setting"],components:{mainNavbar:function(){return r.e(225).then(r.bind(r,2037))},patientNavbar:function(){return r.e(225).then(r.bind(r,3536))}},data:function(){return{mini:!0,nav:!0,hasSidebar:!0,noSideBarRoutes:["CheckUpAdd","CheckUpRecord","CheckUpAdd"],bgdesign:"background: linear-gradient(rgba(56, 142, 60, 0.25), rgba(56, 142, 60, 0.25)) 50% center / cover no-repeat, url('/storage/".concat(this.system_setting.login_bg,";background-position-x: center;background-repeat: no-repeat;background-size: cover;")}},computed:{currentRouteName:function(){return this.$route.name},userDetails:function(){return this.$store.getters.user}},methods:{checkRouteName:function(){var t=this;this.noSideBarRoutes.every((function(e){e==t.$route.name&&(t.hasSidebar=!1)}))},logout:function(){var t,e=this;return(t=o().mark((function t(){return o().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e.$store.dispatch("clearCurrentUser"),axios.post("/api/logout").then((function(){e.$router.push({name:"login"})}));case 2:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function s(t){i(a,n,o,s,c,"next",t)}function c(t){i(a,n,o,s,c,"throw",t)}s(void 0)}))})()}}};var s=r(3379),c=r.n(s),u=r(9347),l={insert:"head",singleton:!1};c()(u.Z,l);u.Z.locals;var h=r(1900);const v={props:["system_setting"],data:function(){return{UserDetails:[],drawer:null,menuVisible:!1,role:"",ipAdd:null,evaluation_dialog:!0}},components:{sidebar:(0,h.Z)(a,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("v-app-bar",{staticClass:"pl-3 pr-3",attrs:{color:"white",app:""}},["CheckUp"!=t.currentRouteName&&"CheckUpRecord"!=t.currentRouteName&&"CheckUpAdd"!=t.currentRouteName?r("v-app-bar-nav-icon",{on:{click:function(e){t.nav=!t.nav}}},[t.$vuetify.breakpoint.mdAndUp?r("v-btn",{attrs:{fab:"",small:""}},[r("v-icon",[t._v(" "+t._s(t.nav?"mdi-format-list-bulleted":"mdi-dots-vertical")+"  ")])],1):t._e()],1):r("div",["CheckUp"==t.currentRouteName?r("v-btn",{staticClass:"ml-0 mr-3",attrs:{color:"danger",dark:"",rounded:""},on:{click:function(e){return t.$router.push({name:"Dashboard"})}}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-arrow-left")]),t._v("\n           Back\n   ")],1):t._e(),t._v(" "),"CheckUpRecord"==t.currentRouteName||"CheckUpAdd"==t.currentRouteName?r("v-btn",{staticClass:"ml-0 mr-3",attrs:{color:"danger",dark:"",rounded:""},on:{click:function(e){return t.$router.push({name:"CheckUp"})}}},[r("v-icon",{attrs:{left:""}},[t._v("mdi-arrow-left")]),t._v("\n           Back\n   ")],1):t._e()],1),t._v(" "),r("p",{staticClass:"pl-3 pt-5",staticStyle:{width:"50%","line-height":"20px"}},[t._v(t._s(t.$vuetify.breakpoint.mdAndUp?t.system_setting.system_long_name:t.system_setting.system_short_name))]),t._v(" "),r("v-spacer"),t._v(" "),r("div",[r("span",[t._v("Hi! "+t._s(t.userDetails.name)+" ")])]),t._v(" "),r("v-menu",{attrs:{"min-width":"150","offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on,o=e.attrs;return[r("v-btn",t._g(t._b({attrs:{icon:"",text:""}},"v-btn",o,!1),n),[t.userDetails.picture?r("v-avatar",{attrs:{color:"brown",size:"35"}},[r("v-img",{attrs:{src:"/storage/"+t.userDetails.picture}})],1):r("v-avatar",{attrs:{color:"brown",size:"35"}},[r("v-img",{attrs:{src:1==t.userDetails.gender?"/img/pp_1.png":"/img/pp_2.png"}})],1)],1)]}}])},[t._v(" "),r("v-list",{attrs:{nav:""}},[r("v-list-item",{attrs:{link:"",to:{name:"Profile"}}},[r("v-list-item-title",[r("v-icon",{attrs:{left:""}},[t._v("mdi-account")]),t._v(" Profile")],1)],1),t._v(" "),r("v-list-item",{attrs:{link:""},on:{click:function(e){return t.logout()}}},[r("v-list-item-title",[r("v-icon",{attrs:{left:""}},[t._v("mdi-logout")]),t._v(" Logout")],1)],1)],1)],1)],1),t._v(" "),"CheckUp"!=t.currentRouteName&&"CheckUpRecord"!=t.currentRouteName&&"CheckUpAdd"!=t.currentRouteName?r("v-navigation-drawer",{attrs:{width:"220",dark:"",color:t.system_setting.color,app:""},model:{value:t.nav,callback:function(e){t.nav=e},expression:"nav"}},[r("v-list",{staticClass:"mb-0 pb-0"},[r("v-list-item",{staticClass:"d-flex justify-center pt-3"},[r("v-img",{attrs:{height:"110",width:"110","max-height":"110","max-width":"110",src:"/storage/"+t.system_setting.logo}})],1),t._v(" "),r("v-list-item",{attrs:{link:""}},[r("v-list-item-content",{staticClass:"text-uppercase text-center font-weight-bold",staticStyle:{"font-size":"17px"}},[t._v("\n             "+t._s(t.system_setting.system_short_name)+"\n         ")])],1)],1),t._v(" "),"administrator"==t.userDetails.role||"bhw"==t.userDetails.role?r("mainNavbar",{attrs:{userDetails:t.userDetails}}):r("patientNavbar",{attrs:{userDetails:t.userDetails}})],1):t._e()],1)}),[],!1,null,"1146825a",null).exports},methods:{},beforeMount:function(){this.$vuetify.theme.themes.light.primary=this.system_setting.color}};var f=r(8663),p={insert:"head",singleton:!1};c()(f.Z,p);f.Z.locals;var d=r(7167),m={insert:"head",singleton:!1};c()(d.Z,m);d.Z.locals;const y=(0,h.Z)(v,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-app",[r("sidebar",{attrs:{system_setting:t.system_setting}}),t._v(" "),r("v-main",[r("v-container",{staticClass:"pt-5",attrs:{fluid:"",width:"100%"}},[r("router-view",{attrs:{system_setting:t.system_setting}})],1)],1)],1)}),[],!1,null,"2651b040",null).exports}}]);