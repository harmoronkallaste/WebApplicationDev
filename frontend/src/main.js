import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/styles.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart, faRightToBracket, faHouse } from '@fortawesome/free-solid-svg-icons';

// Add desired icons to the library
library.add(faHeart, faRightToBracket, faHouse);


createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .use(store)
  .use(router)
  .mount('#app');