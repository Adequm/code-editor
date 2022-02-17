<template>
  <div>
    <Editor 
      style="font-size: 18px;"
      :key="width + '|' + height + '|' + theme"
      :value="code"
      :lang="currentLang" 
      :theme="theme" 
      :width="width" 
      :height="height"
      @init="editorInit" 
      @input="$emit('setCode', $event)"
      :options="options"
    />
  </div>
</template>


<script>
import Editor from 'vue2-ace-editor';

export default {
  name: 'EditorBox',

  components: {
    Editor,
  },

  props: {
    currentLang: {
      type: String,
      default: 'html',
    },
    theme: {
      type: String,
      default: 'chrome',
    },
    code: String,
    width: Number,
    height: Number,
  },
  
  computed: {
    options() {
      return {
        tabSize: 2,
        enableBasicAutocompletion: true,
        enebleLiveAutocompletion: true,
        enebleSnippets: true,
      }
    },
  },

  methods: {
    editorInit() {
      require('brace/ext/language_tools');
      require(`brace/theme/${ this.theme }`);

      if(this.currentLang === 'html') {
        require('brace/mode/html');    
        require('brace/snippets/html');
      }
      if(this.currentLang === 'css') {
        require('brace/mode/css');       
        require('brace/snippets/css');
      }
      if(this.currentLang === 'js') {
        require('brace/mode/javascript');     
        require('brace/snippets/javascript');
      }
    }
  },
};
</script>