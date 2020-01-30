import Vue from 'vue';
import Social from './Social.vue';
import vuetify from './plugins/vuetify';
import router from './router';

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  render: h => h(Social)
}).$mount('#app')
