<template>
  <div>
    <h1>These fields are selected for this flow</h1>
    <ul>
      <p v-for="field in fields" :key="fields.indexOf(field)">
        {{field}}
      </p>
      <button class="btn-group-fields" @click="showModal = true;" style="margin-right: 10px;">Group fields</button>
      <button class="btn-next-step" @click="showJsonEditor()" >Edit field content</button>
    </ul>
    <GroupFields v-if="showModal" :fields="fields"/>
  </div>
</template>

<script>
  import dummyFields from '../lib/dummyFields';
  import GroupFields from './GroupFields'
  export default {
    name: 'Setup',
    components: {
      GroupFields
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