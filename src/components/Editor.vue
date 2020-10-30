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
      fields: {
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
      this.fields.map(field => {
        if(Object.keys(field)[0].startsWith('group')) {
          console.log('groupField obj', field[Object.keys(field)[0]])
          this.jsonData.fields.push(field[Object.keys(field)[0]])
        } else {
          this.jsonData.fields.push(field)
        }
      })
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