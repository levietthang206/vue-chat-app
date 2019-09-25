// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from 'firebase/app';

// import BootstrapVue
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import Vue Scroll
import VueChatScroll from 'vue-chat-scroll'
Vue.use(VueChatScroll);


// import firebase
const firebaseConfig = {
  apiKey: "AIzaSyCtcYtWj3IvPNYYf_MVbYI1Xikqo2e-Wzg",
  authDomain: "vue-chat-app-815d1.firebaseapp.com",
  databaseURL: "https://vue-chat-app-815d1.firebaseio.com",
  projectId: "vue-chat-app-815d1",
  storageBucket: "vue-chat-app-815d1.appspot.com",
  messagingSenderId: "781672373509",
  appId: "1:781672373509:web:57d03509f5dd1c59d3eb6c"
};
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false

// use Bootstrap Vue
Vue.use(BootstrapVue)

 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
