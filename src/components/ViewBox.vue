<template>
  <div 
    style="height: 100%"
    :style="{ 'overflow-y': isShowFullCode ? '' : 'hidden' }"
  >
    <div v-if="isShowFullCode">
      <pre v-text="code"/>
    </div>
    <iframe
      v-else
      :key="code"
      :srcdoc="code"
    />
  </div>
</template>

<script>
export default {
  name: 'ViewBox',

  props: {
    codes: Object,
    isShowFullCode: Boolean,
  },

  data: () => ({
    JSON,
  }),

  computed: {
    code() {
      const { html, css, js } = this.codes;
      const wrapCSS = css ? `<style>${ css }</style>` : '';
      let wrapJS = js ? `<script>${ js }</sc` : '';
      wrapJS += js ? `ript>` : '';

      if(!html && !css && !js) return '';
      return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  ${ wrapCSS }
</head>
<body>
  ${ (html || '') + wrapJS }
</body>
</html>`
    },
  },
};
</script>

<style scoped>
iframe {
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
}
pre {
  padding: 10px;
  max-height: 100vh;
  overflow: scroll;
}
</style>