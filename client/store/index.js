import Vuex from 'vuex';
import Vue from 'vue';
import Xhr from '../xhr';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: [],
    me: {},
  },

  actions: {
    async fetchUsers({ commit, state }) {
      if (state.users.length > 0) {
        return state.users;
      }

      const { data } = await Xhr.get('users');
      commit('SET_USERS', data);
      return data;
    },

    async decodeJwt({ commit, state }) {
      if (state.me.id) {
        return state.me;
      }

      return import('js-cookie').then(Cookie => {
        const jwt = Cookie.get('access_token');
        const [header, payload] = jwt.split('.');
        commit('SET_ME', JSON.parse(window.atob(payload)));
      });
    },
  },

  mutations: {
    SET_ME(state, user) {
      state.me = user;
    },

    SET_USERS(state, items) {
      state.users = items;
    },
  },
});
