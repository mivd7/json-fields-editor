<template>
  <div>
    <JsonEditor :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
        }" :objData="jsonData" v-model="jsonData"/>
    <button @click="handleSubmit">Submit</button>
    <button @click="addField">Add field</button>
  </div>
</template>

<script>
  export default {
    name: 'Editor',
    props: {
      fieldTypes: {
        type: Array
      }
    },
    data: () => {
      return {
        jsonData: {
          fields: []
        }
      }
    },
    created() {
      //
      console.log('fieldTypes props', this.fieldTypes)
      this.fieldTypes.map(fieldName => this.jsonData.fields.push({
        type: fieldName,
        header: 'FIELD_HEADER',
        description: 'FIELD DESCRIPTION',
        isParentField: false
      }))
    },
    methods: {
      handleSubmit() {
        console.log(JSON.stringify(this.jsonData));
      },
      addField() {
        console.log('hi!')
        this.jsonData.fields.push([{
           "type": "FIELD TYPE",
            "header": "FIELD HEADER",
            "description": "FIELD DESCRIPTION",
            "isParentField": false
        }])
      }
    },
  };
</script>
<style>
.val-input {
  min-width: 500px;
}
.block {
  border-bottom: 1px solid black;
}

.block .add-key {
  border-bottom: none !important;
}

.tools-types {
  display: none;
}

.json-desc {
  visibility: hidden;
}

.key-input {
   pointer-events: none;
}
</style>