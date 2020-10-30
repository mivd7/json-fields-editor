<template>
  <div id="app">
    <h1>Fields Configurator</h1>
    <FieldsConfigurator  v-if="!showJsonEditor" v-on:configuratorResult="handleResult"/>
    <Editor v-if="showJsonEditor" :fields="fields"/>
    <a @click="showJsonEditor = !showJsonEditor" class="switch-link">
      {{!showJsonEditor ? 'Edit JSON data' : 'Group Fields'}}
    </a>
  </div>
</template>

<script>
import Editor from './components/Editor.vue'
import FieldsConfigurator from './components/FieldsConfigurator.vue'
import dummyFields from './lib/dummyFields';

export default {
  name: 'app',
  components: {
    Editor,
    FieldsConfigurator
  },
  data: () => {
      return {
        showJsonEditor: false,
        fields: [...dummyFields]
      }
  },
  methods: {
    handleResult(fields) {
      console.log(fields)
      this.showJsonEditor = true;
      this.fields = fields;
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

.switch-link {
  color: green;
  text-decoration: underline;
  cursor: pointer;
}
</style>
