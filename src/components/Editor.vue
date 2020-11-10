<template>
  <div>
    <JsonEditor :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
        }" :objData="jsonData" v-model="jsonData"/>
    <button @click="handleSubmit">Submit</button>
    <button @click="$emit('backToConfigurator')">Back</button>
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
          const groupName = Object.keys(field)[0];
          let parentField = field[groupName].find(subField => subField.type === 'parent_field_' + groupName);
          parentField.isParentField = true;
          this.jsonData.fields.push([parentField]);
          this.jsonData.fields.push(field[groupName].filter(x => x.type !== 'parent_field_' + groupName))
        } else {
          this.jsonData.fields.push([field])
        }
      })
    },
    methods: {
      handleSubmit() {
        //send to ifrrame parent
        window.alert(JSON.stringify(this.jsonData));
      },
      
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