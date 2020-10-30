<template>
  <div class="row" v-if="!showChangeOrder && !showEditField">
    <div class="col-3">
      <div class="field-type-container">
        <h3>Field Types</h3>
        <draggable class="list-group" :list="availableFields" group="people">
          <div class="list-group-item" v-for="(field, index) in availableFields" :key="index"
            style="background-color: transparent;">
            {{ field.type }}
          </div>
        </draggable>
      </div>
    </div>
    <div class="col-3">

      <h3>Field Groups </h3>

      <div class="field-group-container">
        <div class="field-group-list" v-for="(group, groupIndex) in groups" :key="groupIndex">
          <div class="list-group-item" style="background-color: green; color: white;">Group
                {{groupIndex + 1}}</div>
          <draggable class="list-group" v-if="group['group' + groupIndex]" :list="group['group' + groupIndex]"
            group="people">
            
            <div class="list-group-item" v-for="(field, fieldIndex) in group['group' + groupIndex]"
              :key="fieldIndex">
              <span>{{field.type}} <a @click="editFieldContent(field)" style="color: green; text-decoration: underline; text-align: right;">edit</a></span>
            </div>
          </draggable>
        </div>
      </div>
      <button @click="addGroup()">Add group</button>
    </div>
    
    <div class="col-3">
      <div class="field-type-container">
        <h3>Single Fields</h3>
        <draggable class="list-group" :list="singleFields" group="people">
          <div class="list-group-item" v-for="(singleField, index) in singleFields" :key="index"
            style="background-color: transparent;">
            {{ singleField.type }}
          </div>
        </draggable>
      </div>
    </div>

    <button class="btn-submit" @click="submit()">Save</button>

  </div>

  <div v-else-if="showChangeOrder" class="row">
    <div class="col-12">
      <h3>Field Order</h3>

      <div class="field-group-container">
        <div class="field-group-list">
          <draggable class="list-group" :list="result" group="people">
            <div v-for="(value, index) in result" :key="index">


              <div v-if="Array.isArray(value[Object.keys(value)[0]])" class="result-item">{{index + 1}}.
                  <span v-for="(val, valIndex) in value[Object.keys(value)[0]]" :key="valIndex">{{val.type}}, </span> 
              </div>
              <div v-else class="result-item">{{index + 1}}. {{value.type}}</div>
            </div>
          </draggable>
        </div>
      </div>

    </div>
    <button v-if="!showChangeOrder" class="btn-submit" @click="submit()">Edit order</button>
    <div class="btn-submit" v-else>
      <button @click="showChangeOrder = false">Back to grouping</button>
      <button @click="submitOrder()">Save configuration</button>
    </div>
  </div>
  <div v-else-if="showEditField" class="row">
    <EditFieldForm :field="editFieldItem" v-on:fieldUpdated="showEditField = false"/>
  </div>
</template>
<script>
  import draggable from 'vuedraggable';
  import dummyFields from '../lib/dummyFields';
  import EditFieldForm from './EditFieldForm'

  export default {
    name: "FieldsConfigurator",
    components: {
      draggable,
      EditFieldForm
    },
    data() {
      return {
        availableFields: [],
        singleFields: [],
        groups: [],
        result: [],
        groupAmount: 0,
        showChangeOrder: false,
        showEditField: false,
        editFieldItem: {}
      };
    },
    methods: {
      addGroup: function () {
        let newGroup = {
          [`group${this.groupAmount}`]: []
        }
        this.groups.push(newGroup)
        this.groupAmount++
      },
      submit: function () {
        if(this.availableFields.length > 0) {
          //add remaining field types as single field
          this.availableFields.map(fieldType => this.singleFields.push(fieldType))
          this.availableFields = [];
        }
        this.result = this.groups.concat(this.singleFields)
        console.log(this.result)
        this.showChangeOrder = true;
      },
      submitOrder: function () {
        this.$emit('configuratorResult', this.result);
      },
      editFieldContent: function(field) {
        this.editFieldItem = field;
        this.showEditField = true;
      }
    },
    created() {
      if(this.result.length === 0) {
        dummyFields.map(fieldType => this.availableFields.push({
          type: fieldType, 
          header: '',
          description: '',
        }))
      }
    }
  };
</script>
<style>
  .row {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
  }

  .col-3 {
    -ms-flex: 0 0 33%;
    -webkit-box-flex: 0;
    flex: 0 0 33%;
    max-width: 33%;
  }

  .col-12 {
    -ms-flex: 0 0 100%;
    -webkit-box-flex: 0;
    flex: 0 0 100%;
    max-width: 100%;
  }

  .list-group {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-direction: column;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
  }

  .list-group-item:first-child {
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
  }

  .list-group-item {
    position: relative;
    display: block;
    padding: .75rem 1.25rem;
    margin-bottom: -1px;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, .125);
  }

  .btn-submit {
    display: block;
    margin: 10px auto
  }

  .field-type-container {
    margin: 25px;
  }

  .field-group-list {
    padding: 15px;
    margin: 25px;
  }

  .field-group-list:first-child {
    padding: 0 15px 15px 15px;
    margin: 0 25px 25px 25px;
  }
  
  .result-item {
    margin-top: 5px;
    border: 1px solid grey;
  }
</style>