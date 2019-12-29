import Vue from 'vue';

export default {
  abrir(parent, modal, propsData = {}) {
    const Modal = Vue.extend(modal);
    const main = document.getElementById('main');
    return new Modal({
      el: main.appendChild(document.createElement('div')),
      parent,
      propsData,
    });
  },
};
