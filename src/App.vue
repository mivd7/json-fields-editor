<template>
  <div id="app">
    <h1>Fields Configurator</h1>
    <FieldsConfigurator  v-if="!showJsonEditor" :fieldProps="fields" v-on:configuratorResult="handleResult"/>
    <Editor v-if="showJsonEditor" :fields="fields" v-on:backToConfigurator="handleBack"/>
  </div>
</template>

<script>
import Editor from './components/Editor.vue'
import FieldsConfigurator from './components/FieldsConfigurator.vue'

export default {
  name: 'app',
  components: {
    Editor,
    FieldsConfigurator
  },
  data: () => {
      return {
        showJsonEditor: false,
        fields: []
      }
  },
  methods: {
    handleResult(fields) {
      this.showJsonEditor = true;
      this.fields = fields;
    },
    handleBack(fields) {
      this.showJsonEditor = false;
      this.fields = fields;
    },
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

.switch-link {
  color: green;
  text-decoration: underline;
  cursor: pointer;
}
</style>
