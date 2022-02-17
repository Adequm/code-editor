import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import themesList from './themes.json';

const store = {};
Vue.use(Vuex);

store.state = () => ({
  themesList,
  langsList: ['html', 'css', 'js'],
  currentLang: 'html',
  theme: 'monokai',
  editWidth: null,
  codes: {},
});


store.getters = {
  currentCode({ currentLang, codes }) {
    return codes[currentLang] || '';
  },
};


store.mutations = {
  setLang: (state, lang) => Vue.set(state, 'currentLang', lang),
  setCode: ({ codes }, { lang, code }) => Vue.set(codes, lang, code),
  setEditWidth: (state, width) => Vue.set(state, 'editWidth', width),
  setTheme: (state, theme) => Vue.set(state, 'theme', theme),
};


store.plugins = [createPersistedState({
  paths: ['lang', 'codes', 'theme', 'editWidth'],
})];

export default new Vuex.Store(store);
