<template>
  <div class="settings">
    <div class="settings__wrapper">
      <h2>Тема</h2>
      <select :value="currentTheme" @input="$emit('setTheme', $event.target.value)">
        <optgroup label="Светлые темы">
          <option 
            v-for="theme of lightThemes"
            :key="theme"
            :value="theme"
            v-text="theme"
          />
        </optgroup>
        <optgroup label="Темные темы">
          <option 
            v-for="theme of darkThemes"
            :key="theme"
            :value="theme"
            v-text="theme"
          />
        </optgroup>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SettingsBox',

  props: {
    currentTheme: String,
    lightThemes: Array,
    darkThemes: Array,
  },
}
</script>

<style lang="scss" scoped>
.settings {
  position: fixed;
  display: flex;
  height: 100%;
  background-color: #0008;
  &__wrapper {
    padding: 20px;
    width: 200px;
    border-radius: 5px;
    background-color: #fff;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      margin: 0;
    }
    select {
      width: 100%;
      height: 40px;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>