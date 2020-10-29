<template>
  <div id="app">
    <Setup  v-on:showEditor="handleShow"/>
    <Editor v-if="showJsonEditor" :fieldTypes="formFields"/>
  </div>
</template>

<script>
import Editor from './components/Editor.vue'
import Setup from './components/Setup.vue'

export default {
  name: 'app',
  components: {
    Editor,
    Setup
  },
  data: () => {
      return {
        showJsonEditor: false,
        formFields: null
      }
  },
  methods: {
    handleShow(fields) {
      console.log('fields on emit', fields)
      this.showJsonEditor = true;
      this.formFields = fields;
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}


</style>
