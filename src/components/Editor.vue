<template>
  <div>
    <JsonEditor :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
        }" :objData="jsonData" v-model="jsonData"/>
    
    <button @click="$emit('back', fields)">Back To Fields Configurator</button><br>
    <button @click="$emit('submit', jsonData.fields)" style="margin-top: 10px;">Submit Field Configuration</button>
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
        if(field.hasOwnProperty('groupId')) {
          let parentField = field.groupFields.find(subField => subField.type === 'parent_field_group' + field.groupId);
          parentField.isParentField = true;
          this.jsonData.fields.push([parentField]);
          this.jsonData.fields.push(field.groupFields.filter(x => x.type !== 'parent_field_group'+field.groupId))
        } else {
          this.jsonData.fields.push([field])
        }
      })
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

.json-desc {
  visibility: hidden;
}

.tools,
.v-json-edit-icon-add {
  display: none;
}
</style>