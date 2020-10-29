<template>
  <div>
    <h1>These fields are selected for this flow</h1>
    <ul>
      <p v-for="field in fields" :key="fields.indexOf(field)">
        {{field}}
      </p>
      <button class="btn-group-fields" @click="showModal = true;">Group fields</button>
      <button class="btn-next-step" @click="showJsonEditor()" >Manage field content</button>
    </ul>
    <GroupFieldsModal v-if="showModal" v-on:close="showModal = false" :fields="fields"/>
  </div>
</template>

<script>
  import dummyFields from '../lib/dummyFields';
  import GroupFieldsModal from './GroupFieldsModal'
  export default {
    name: 'Setup',
    components: {
      GroupFieldsModal
    },
    data: () => {
      return {
        fields: dummyFields,
        showModal: false
      }
    },
    methods: {
      showJsonEditor() {
        console.log('hi!')
        this.$emit('showEditor', this.fields)
      }
    }
  };
</script>
<style>
  .btn-group-fields {
    margin-top: 10px;
  }

</style>