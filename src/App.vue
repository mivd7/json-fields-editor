<template>
  <div id="app">
    <h1 style="text-align: left;">Fields</h1>
    <FieldsView  v-if="!showJsonEditor" v-on:showEditor="handleShow"/>
    <Editor v-if="showJsonEditor" :fieldTypes="fields"/>
    <a @click="showJsonEditor = !showJsonEditor" class="switch-link">
      {{!showJsonEditor ? 'Edit Field Content' : 'Group Fields'}}
    </a>
  </div>
</template>

<script>
import Editor from './components/Editor.vue'
import FieldsView from './components/FieldsView.vue'
import dummyFields from './lib/dummyFields';

export default {
  name: 'app',
  components: {
    Editor,
    FieldsView
  },
  data: () => {
      return {
        showJsonEditor: false,
        fields: dummyFields
      }
  },
  methods: {
    handleShow(fields) {
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
