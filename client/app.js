import Vue from 'vue';
import './sass/app';
import Notyf from './notyf';

import router from './router';
import store from './store';
import App from './pages/App';

new Vue({
  router,
  store,
  provide: () => {
    return {
      notyf: Notyf,
    };
  },
  el: '#app',
  render: h => h(App),
});
