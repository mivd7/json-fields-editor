<template>
<div class="form-container">
  <h1 style="text-align: center;">Edit content for {{ field.type }}</h1>
  <input class="input-field input-field__header" type="text" v-model="field.header" placeholder="Header"/><br>
  <input class="input-field input-field__description" type="text" v-model="field.description" placeholder="Description"/><br>
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
  .input-field {
    margin: 10px 0;
    padding: 10px;
    border-radius: 10px;
    border-color: lightgrey;
    min-width: 150px;
  }
</style>