<template>
<div class="form-container">
  <h1 style="text-align: center;">Edit content for {{ field.type }}</h1>
    <label>Header</label><br><input class="input-field input-field__header" type="text" v-model="field.header" placeholder="Header"/><br>
    <label>Description</label><br><input class="input-field input-fieldfield__description" type="text" v-model="field.description" placeholder="Description"/><br>
    <div v-if="field.hasOwnProperty('subfieldLetter')" >
      <label>Subfield Letter*</label><br><input class="input-field input-field__subletter" type="text" v-model="field.subfieldLetter" placeholder="Subfield Letter"/><br>
      <span style="font-size: 12px; text-align: right;">*the letter that will appear in front of the sub question, leave blank if not wanted</span>
    </div>

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
    min-width: 300px;
  }
</style>