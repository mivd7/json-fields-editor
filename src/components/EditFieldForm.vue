<template>
<div class="form-container">
  <h1 style="text-align: center;">Edit content for {{ field.type }}</h1>
  <input type="text" v-model="field.header" placeholder="Header"/><br>
  <input type="text" v-model="field.description" placeholder="Description"/><br>
  <button @click="done">Done</button>
</div>
</template>

<script>
export default {
  name: 'EditFieldForm',
  props: {
    field: {
      type: Object,
      required: true,
    }
  },
  methods: {
    done() {  
       this.$emit('fieldUpdated', this.field)
    }
  }
}
</script>

<style>
  .form-container{
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>