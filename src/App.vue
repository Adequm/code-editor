<template>
  <div 
    id="app" 
    class="container"
    :style="{ 'grid-template-columns': `${ editContainerWidth }px 1fr` }"
  >
    <div>
      <LangNav 
        :currentLang="currentLang" 
        :isShowFullCode="isShowFullCode"
        :isOpenSettings="isOpenSettings"
        :langsList="langsList"
        @setOpenSettings="isOpenSettings = $event"
        @setShowFullCode="isShowFullCode = $event"
        @setLang="setLang"
      />
      <template v-for="lang of langsList">
        <EditorBox 
          v-show="lang === currentLang"
          :key="lang"
          :theme="theme"
          :code="codes[lang]"
          :currentLang="lang"
          :width="editContainerWidth"
          :height="editContainerHeight"
          @setCode="setCode({ lang, code: $event })"
        />
      </template>
    </div>

    <BoxSeparator 
      :left="editContainerWidth"
      :maxOffsetX="maxOffsetX"
      @setOffsetX="setContainerWidth"
      @move="isMove = $event"
    />

    <div :style="{ 'pointer-events': isMove ? 'none' : '' }">
      <SettingsBox
        v-if="isOpenSettings" 
        :currentTheme="theme"
        :lightThemes="themesList.light"
        :darkThemes="themesList.dark"
        :style="{ width: `${ viewContainerWidth }px` }"
        @setTheme="setTheme"
      />
      <ViewBox 
        :isShowFullCode="isShowFullCode"
        :codes="codes"
      />
    </div>

  </div>
</template>

<script>
import EditorBox from './components/EditorBox';
import SettingsBox from './components/SettingsBox';
import ViewBox from './components/ViewBox';
import LangNav from './components/LangNav';
import BoxSeparator from './components/BoxSeparator';

import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  name: 'App',

  components: {
    SettingsBox,
    ViewBox,
    EditorBox,
    BoxSeparator,
    LangNav,
  },

  data: () => ({
    isMove: false,
    isShowFullCode: false,
    isOpenSettings: false,
    viewContainerWidth: 400,
    editContainerWidth: 400,
    editContainerHeight: 500,
    maxOffsetX: 0,
    minOffsetX: 400,
  }),

  computed: {
    ...mapState([
      'currentLang', 
      'langsList', 
      'codes', 
      'editWidth', 
      'theme',
      'themesList',
    ]),
  },

  methods: {
    ...mapMutations([
      'setLang',
      'setCode',
      'setTheme',
      'setEditWidth',
    ]),
    setContainerWidth(value) {
      this.editContainerWidth = value;
      this.viewContainerWidth = innerWidth - value - 6;
      this.setEditWidth(value);
    },
    onResize(width) {
      const editContainerWidth = typeof width == 'number' 
        ? this.editWidth 
        : this.editContainerWidth;
      this.maxOffsetX = innerWidth - this.minOffsetX;
      const maxWidth = Math.min(editContainerWidth, this.maxOffsetX);
      const curWidth = Math.max(this.minOffsetX, maxWidth);
      this.editContainerHeight = innerHeight - 60;
      this.setContainerWidth(curWidth);
    },
  },

  beforeMount() {
    require(['emmet/emmet'], data => {
      window.emmet = data.emmet;
    });

    this.onResize(this.editWidth || innerWidth/2 - 3);
    window.addEventListener('resize', this.onResize);
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
};
</script>

<style lang="scss">

body {
  font-size: 18px;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

.container {
  display: grid;
  gap: 6px;
  grid-template-columns: 1fr 1fr;
}
</style>
