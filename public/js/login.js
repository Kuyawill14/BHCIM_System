"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["login"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/auth/login.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/auth/login.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//const footer = () => import( /* webpackChunkName: "login_layout" */ "./layout/footer")
var sideContainer = function sideContainer() {
  return __webpack_require__.e(/*! import() | login_layout */ "login_layout").then(__webpack_require__.bind(__webpack_require__, /*! ./layout/sideContainer */ "./resources/js/components/auth/layout/sideContainer.vue"));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['system_setting'],
  title: 'Login',
  components: {
    //footer,
    sideContainer: sideContainer
  },
  data: function data() {
    return {
      isLoggin: false,
      dialog: true,
      valid: true,
      form: {
        username: "",
        password: "",
        remember: false
      },
      loginEmailRules: [function (v) {
        return !!v || "Required";
      }],
      show: false,
      rules: {
        required: function required(value) {
          return !!value || "Required.";
        },
        min: function min(v) {
          return v && v.length >= 6 || "Min 6 characters";
        },
        blank: function blank(v) {
          return v && !!v.trim() || 'Field cannot be blank';
        }
      },
      ToManyAttepmtError: null,
      isForgotPassword: false,
      IsloadingComponent: false
    };
  },
  computed: {
    passwordMatch: function passwordMatch() {
      var _this = this;
      return function () {
        return _this.password === _this.verify || "Password must match";
      };
    }
  },
  methods: {
    validate: function validate() {
      if (this.$refs.loginForm.validate()) {
        this.login();
      }
    },
    reset: function reset() {
      this.$refs.form.reset();
    },
    resetValidation: function resetValidation() {
      this.$refs.form.resetValidation();
    },
    login: function login() {
      var _this2 = this;
      this.$store.dispatch('login', this.form).then(function (res) {
        if (res.data.success) {
          _this2.showSuccess(res.data.message);
          if (res.data.details.role == 'administrator' || res.data.details.role == 'bhw') _this2.$router.push({
            name: 'Dashboard'
          });else if (res.data.details.role == 'patient') _this2.$router.push({
            name: 'PatientDashboard'
          });
        } else _this2.showError(res.data.message);
        _this2.isloading = false;
      })["catch"](function () {
        _this2.showError('Login Failed');
        _this2.isloading = false;
      });
      //this.$router.push({name: 'Dashboard'})
    }
  }
});

/***/ }),

/***/ "./resources/js/components/auth/login.vue":
/*!************************************************!*\
  !*** ./resources/js/components/auth/login.vue ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _login_vue_vue_type_template_id_6aa0b866___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login.vue?vue&type=template&id=6aa0b866& */ "./resources/js/components/auth/login.vue?vue&type=template&id=6aa0b866&");
/* harmony import */ var _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./login.vue?vue&type=script&lang=js& */ "./resources/js/components/auth/login.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _login_vue_vue_type_template_id_6aa0b866___WEBPACK_IMPORTED_MODULE_0__.render,
  _login_vue_vue_type_template_id_6aa0b866___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/auth/login.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/auth/login.vue?vue&type=script&lang=js&":
/*!*************************************************************************!*\
  !*** ./resources/js/components/auth/login.vue?vue&type=script&lang=js& ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./login.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/auth/login.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/auth/login.vue?vue&type=template&id=6aa0b866&":
/*!*******************************************************************************!*\
  !*** ./resources/js/components/auth/login.vue?vue&type=template&id=6aa0b866& ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_6aa0b866___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_6aa0b866___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_login_vue_vue_type_template_id_6aa0b866___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./login.vue?vue&type=template&id=6aa0b866& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/auth/login.vue?vue&type=template&id=6aa0b866&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/auth/login.vue?vue&type=template&id=6aa0b866&":
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/auth/login.vue?vue&type=template&id=6aa0b866& ***!
  \**********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app",
    [
      _c(
        "v-container",
        {
          class:
            _vm.$vuetify.breakpoint.xs || _vm.$vuetify.breakpoint.sm
              ? ""
              : "fill-height",
          attrs: { fluid: "" },
        },
        [
          _c(
            "v-row",
            { attrs: { align: "center", justify: "center" } },
            [
              _c(
                "v-col",
                {
                  class:
                    _vm.$vuetify.breakpoint.xs || _vm.$vuetify.breakpoint.sm
                      ? ""
                      : "ma-0 pa-0",
                  attrs: { cols: "12", sm: "12", md: "12" },
                },
                [
                  _c(
                    "v-row",
                    {
                      class:
                        _vm.$vuetify.breakpoint.xs || _vm.$vuetify.breakpoint.sm
                          ? "fill-height"
                          : "",
                      attrs: { align: "center", justify: "center" },
                    },
                    [
                      _c("sideContainer", {
                        attrs: { system_setting: _vm.system_setting },
                      }),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        {
                          class: _vm.$vuetify.breakpoint.xs
                            ? "ma-0 pa-3 PB-0"
                            : "ma-0 pa-0",
                          attrs: { cols: "12", md: "5" },
                        },
                        [
                          _c(
                            "v-row",
                            { attrs: { align: "center", justify: "center" } },
                            [
                              _c(
                                "v-col",
                                {
                                  staticClass: "text-left",
                                  attrs: {
                                    cols: "12",
                                    md: "12",
                                    lg: "12",
                                    sm: "7",
                                  },
                                },
                                [
                                  !_vm.isForgotPassword
                                    ? _c(
                                        "v-card-text",
                                        [
                                          _c(
                                            "v-form",
                                            {
                                              ref: "loginForm",
                                              staticClass: "text-center",
                                              attrs: { "lazy-validation": "" },
                                              on: {
                                                submit: function ($event) {
                                                  $event.preventDefault()
                                                  return _vm.validate.apply(
                                                    null,
                                                    arguments
                                                  )
                                                },
                                              },
                                              model: {
                                                value: _vm.valid,
                                                callback: function ($$v) {
                                                  _vm.valid = $$v
                                                },
                                                expression: "valid",
                                              },
                                            },
                                            [
                                              _c(
                                                "v-row",
                                                {
                                                  attrs: {
                                                    align: "center",
                                                    justify: "center",
                                                  },
                                                },
                                                [
                                                  _c(
                                                    "v-col",
                                                    {
                                                      staticClass:
                                                        "ma-0 pa-0 text-left",
                                                      attrs: {
                                                        cols: "12",
                                                        md: "8",
                                                      },
                                                    },
                                                    [
                                                      _c(
                                                        "div",
                                                        {
                                                          staticClass:
                                                            "text-md-h5 text-xs-h5 text-sm-h6 font-weight-bold",
                                                        },
                                                        [
                                                          _vm._v(
                                                            "\n                                                        Account "
                                                          ),
                                                          _c(
                                                            "span",
                                                            {
                                                              staticClass:
                                                                "font-weight-regular",
                                                            },
                                                            [_vm._v("Login")]
                                                          ),
                                                        ]
                                                      ),
                                                    ]
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-col",
                                                    {
                                                      staticClass:
                                                        "ma-0 pa-0 mt-4",
                                                      attrs: {
                                                        cols: "12",
                                                        md: "8",
                                                      },
                                                    },
                                                    [
                                                      _c("v-text-field", {
                                                        attrs: {
                                                          outlined: "",
                                                          label: "Username",
                                                          rules:
                                                            _vm.loginEmailRules,
                                                          name: "Username",
                                                          "prepend-inner-icon":
                                                            "mdi-account",
                                                          dense: "",
                                                          type: "text",
                                                          color:
                                                            _vm.system_setting
                                                              .color,
                                                          required: "",
                                                        },
                                                        model: {
                                                          value:
                                                            _vm.form.username,
                                                          callback: function (
                                                            $$v
                                                          ) {
                                                            _vm.$set(
                                                              _vm.form,
                                                              "username",
                                                              $$v
                                                            )
                                                          },
                                                          expression:
                                                            "form.username",
                                                        },
                                                      }),
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-col",
                                                    {
                                                      staticClass:
                                                        "ma-0 pa-0 mt-2 mb-0",
                                                      attrs: {
                                                        cols: "12",
                                                        md: "8",
                                                      },
                                                    },
                                                    [
                                                      _c("v-text-field", {
                                                        staticClass:
                                                          "mb-0 pb-0",
                                                        attrs: {
                                                          dense: "",
                                                          outlined: "",
                                                          "append-icon":
                                                            _vm.show
                                                              ? "mdi-eye"
                                                              : "mdi-eye-off",
                                                          rules: [
                                                            _vm.rules.required,
                                                            _vm.rules.min,
                                                            _vm.rules.blank,
                                                          ],
                                                          type: _vm.show
                                                            ? "text"
                                                            : "password",
                                                          name: "password",
                                                          label: "Password",
                                                          "prepend-inner-icon":
                                                            "mdi-lock",
                                                          hint: "At least 6 characters",
                                                          color:
                                                            _vm.system_setting
                                                              .color,
                                                          counter: "",
                                                        },
                                                        on: {
                                                          "click:append":
                                                            function ($event) {
                                                              _vm.show =
                                                                !_vm.show
                                                            },
                                                        },
                                                        model: {
                                                          value:
                                                            _vm.form.password,
                                                          callback: function (
                                                            $$v
                                                          ) {
                                                            _vm.$set(
                                                              _vm.form,
                                                              "password",
                                                              $$v
                                                            )
                                                          },
                                                          expression:
                                                            "form.password",
                                                        },
                                                      }),
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-col",
                                                    {
                                                      staticClass:
                                                        "ma-0 pa-0 d-flex",
                                                      attrs: {
                                                        cols: "12",
                                                        md: "8",
                                                      },
                                                    },
                                                    [
                                                      _c(
                                                        "span",
                                                        [
                                                          _c("v-checkbox", {
                                                            staticClass:
                                                              "ma-0 pa-0",
                                                            attrs: {
                                                              "hide-spin-buttons":
                                                                "",
                                                              label:
                                                                "Remember me",
                                                            },
                                                            model: {
                                                              value:
                                                                _vm.form
                                                                  .remember,
                                                              callback:
                                                                function ($$v) {
                                                                  _vm.$set(
                                                                    _vm.form,
                                                                    "remember",
                                                                    $$v
                                                                  )
                                                                },
                                                              expression:
                                                                "form.remember",
                                                            },
                                                          }),
                                                        ],
                                                        1
                                                      ),
                                                      _vm._v(" "),
                                                      _c("v-spacer"),
                                                      _vm._v(" "),
                                                      _c(
                                                        "span",
                                                        { staticClass: "mt-0" },
                                                        [
                                                          _c(
                                                            "a",
                                                            {
                                                              staticStyle: {
                                                                "text-decoration":
                                                                  "none",
                                                              },
                                                              attrs: {
                                                                href: "#",
                                                              },
                                                              on: {
                                                                click:
                                                                  function (
                                                                    $event
                                                                  ) {
                                                                    $event.preventDefault()
                                                                    ;(_vm.isForgotPassword =
                                                                      !_vm.isForgotPassword),
                                                                      (_vm.IsloadingComponent =
                                                                        !_vm.IsloadingComponent)
                                                                  },
                                                              },
                                                            },
                                                            [
                                                              _vm._v(
                                                                "Forgot Password?"
                                                              ),
                                                            ]
                                                          ),
                                                        ]
                                                      ),
                                                    ],
                                                    1
                                                  ),
                                                  _vm._v(" "),
                                                  _c(
                                                    "v-col",
                                                    {
                                                      class: _vm.$vuetify
                                                        .breakpoint.mdAndUp
                                                        ? "ma-0 pa-0 text-left"
                                                        : "ml-0 pl-0 pr-0 mr-0 mt-1",
                                                      attrs: {
                                                        cols: "12",
                                                        md: "8",
                                                      },
                                                    },
                                                    [
                                                      _c(
                                                        "v-btn",
                                                        {
                                                          staticClass: "mb-5",
                                                          attrs: {
                                                            dark: "",
                                                            color:
                                                              _vm.system_setting
                                                                .color,
                                                            type: "submit",
                                                            block:
                                                              !_vm.$vuetify
                                                                .breakpoint
                                                                .mdAndUp,
                                                            large:
                                                              !_vm.$vuetify
                                                                .breakpoint
                                                                .mdAndUp,
                                                            rounded:
                                                              !_vm.$vuetify
                                                                .breakpoint
                                                                .mdAndUp,
                                                            loading:
                                                              _vm.isLoggin,
                                                          },
                                                        },
                                                        [
                                                          _c(
                                                            "v-icon",
                                                            {
                                                              staticClass:
                                                                "mr-3",
                                                            },
                                                            [
                                                              _vm._v(
                                                                "mdi-login"
                                                              ),
                                                            ]
                                                          ),
                                                          _vm._v(
                                                            "\n                                                        Login\n                                                    "
                                                          ),
                                                        ],
                                                        1
                                                      ),
                                                    ],
                                                    1
                                                  ),
                                                ],
                                                1
                                              ),
                                            ],
                                            1
                                          ),
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                  _vm._v(" "),
                                  _vm.isForgotPassword
                                    ? _c(
                                        "v-card-text",
                                        [
                                          _c(
                                            "div",
                                            { staticClass: "text-center" },
                                            [
                                              _vm.IsloadingComponent
                                                ? _c("v-progress-circular", {
                                                    attrs: {
                                                      color: "primary",
                                                      indeterminate: "",
                                                    },
                                                  })
                                                : _vm._e(),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c("forgotPassword", {
                                            on: {
                                              toggleIsloading: function (
                                                $event
                                              ) {
                                                _vm.IsloadingComponent =
                                                  !_vm.IsloadingComponent
                                              },
                                              toggleLogin: function ($event) {
                                                _vm.isForgotPassword =
                                                  !_vm.isForgotPassword
                                              },
                                            },
                                          }),
                                        ],
                                        1
                                      )
                                    : _vm._e(),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);