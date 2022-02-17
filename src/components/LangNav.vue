<template>
  <nav class="nav">
    <button
      v-for="langName of ['html', 'css', 'js']"
      :key="langName"
      class="nav__item"
      :class="{ 'nav__item-active': currentLang == langName }"
      @click="$emit('setLang', langName)"
      v-text="langName.toUpperCase()"
    />
    <button 
      class="nav__item nav__item-icon"
      @click="$emit('setOpenSettings', !isOpenSettings)"
    >
      <Icon 
        :type="isOpenSettings ? 'x' : 'settings'"
        style="margin: auto"
      />
    </button>
    <button 
      class="nav__item nav__item-icon"
      @click="$emit('setShowFullCode', !isShowFullCode)"
    >
      <Icon 
        :type="isShowFullCode ? 'eye-off' : 'eye'"
        style="margin: auto"
      />
    </button>
  </nav>
</template>

<script>
import Icon from './Icon';

export default {
  name: 'LangNav',

  components: {
    Icon,
  },

  props: {
    isOpenSettings: Boolean,
    isShowFullCode: Boolean,
    currentLang: {
      type: String,
      default: 'html',
    },
  },
};
</script>

<style lang="scss" scoped>
.nav {
  box-sizing: border-box;
  height: 60px;
  padding: 10px;
  grid-area: nav;
  display: grid;
  grid-template-columns: repeat(3, 1fr) 40px 40px; 
  gap: 10px;
  background-color: #2F3129;

  &__item {
    height: 100%;
    outline: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    background-color: #555651;
    font-weight: bold;
    font-size: 16px;
    color:#F8F8F2;
    &:hover {
      background-color: #272822;
    }
    &-active {
      background-color: #202020;
      color: #66D9CE;
    }
    &-icon {
      display: flex;
    }
  }
}
</style>