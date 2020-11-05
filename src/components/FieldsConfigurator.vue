<template>
  <div class="row" v-if="!showChangeOrder && !showEditField">
    <div class="col-3">
      <div class="field-type-container">
        <h3>Field Types</h3>
        <!-- <p>Here are all the fieldtypes available to this flow</p> -->
        <draggable class="list-group" :list="availableFields" group="people" @change="handleFieldChange">
          <div class="list-group-item" v-for="(field, index) in availableFields" :key="index"
            style="background-color: transparent;">
            {{ field.type }}
          </div>
        </draggable>
      </div>
    </div>
    <div class="col-3">

      <h3>Field Groups </h3>
      <!-- <p>Here you can group fields together</p> -->

      <div class="field-group-container">
        <div class="field-group-list" v-for="(group, groupIndex) in groups" :key="groupIndex">

          <draggable class="list-group" v-if="group['group' + groupIndex]" :list="group['group' + groupIndex]"
            group="people" draggable=".list-group-item" :move="checkFieldMove" @change="handleOrderChange('group'+groupIndex)" :sort="checkFieldMove">
            <div slot="header" class="list-group-header" style="background-color: green; color: white;">
              <span>Group {{groupIndex + 1}}
                <a @click="editFieldContent(group['group' + groupIndex])" 
                  style="color: white; text-decoration: underline; text-align: right;">edit</a>
              </span>
            </div>

            <div class="list-group-item" v-for="(field, fieldIndex) in group['group' + groupIndex]"
              :key="fieldIndex">
              <span v-if="field.type.startsWith('parent')">Parent Field <a @click="editFieldContent(field)" style="color: green; text-decoration: underline; text-align: right;">edit</a></span>
              <span v-else>{{field.type}} <a @click="editFieldContent(field)" style="color: green; text-decoration: underline; text-align: right;">edit</a></span>
            </div>
          </draggable>
        </div>
      </div>
      <button @click="addGroup()">Add group</button>
    </div>
    <div class="col-3">
      <h3>Field Order</h3>
      <!-- <p>Change the show order of the fields</p> -->
      <div class="field-group-container">
        <div class="field-group-list">
          <draggable class="list-group" :list="orderedFields" group="people">
            <div v-for="(value, index) in orderedFields" :key="index">


              <div v-if="Array.isArray(value[Object.keys(value)[0]])" class="ordered-fields-item">{{index + 1}}.
                <span v-for="(val, valIndex) in value[Object.keys(value)[0]]" :key="valIndex">{{val.type}}, </span>
              </div>
              <div v-else class="ordered-fields-item">{{index + 1}}. {{value.type}}</div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
    <!-- <div class="col-3">
      <div class="field-type-container">
        <h3>Single Fields</h3>
        <draggable class="list-group" :list="singleFields" group="people">
          <div class="list-group-item" v-for="(singleField, index) in singleFields" :key="index"
            style="background-color: transparent;">
            {{ singleField.type }}
          </div>
        </draggable>
      </div>
    </div> -->
    <div class="btn-submit-container">
      <button class="btn-submit" @click="emitResult()">Save configuration</button>
    </div>
    <!-- <button @click="showChangeOrder = false">Back to grouping</button> -->

  </div>
  <div v-else-if="showEditField" class="row">
    <EditFieldForm :field="editFieldItem" v-on:fieldUpdated="showEditField = false" />
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
        groups: [],
        orderedFields: [],
        groupAmount: 0,
        showChangeOrder: false,
        showEditField: false,
        editFieldItem: {}
      };
    },
    methods: {
      addGroup: function () {
        let newGroup = {
          [`group${this.groupAmount}`]: [{
            type: 'parent_field_group' + this.groupAmount,
            header: '',
            description: ''
          }]
        }
        this.groups.push(newGroup)
        this.groupAmount++
      },
      handleOrderChange: function (parentFieldType) {
        // const doubleEntry = this.filterDuplicates(this.groups, parentFieldType);
        
        const groupExists = this.orderedFields.findIndex(field => Object.keys(field)[0] === parentFieldType) !== -1;
        const groupNumber = Number(parentFieldType.replace(/\D/g, ""));
        console.log(groupNumber)
        if (!groupExists) {
          const result = this.orderedFields.concat(this.groups)
          const noDuplicates = this.filterDuplicates(result, groupNumber - 1)
          this.orderedFields = noDuplicates;
          console.log('orderedFields after no duplicates filter', this.orderedFields)
        }
        
      },
      emitResult: function () {
        this.$emit('configuratorResult', this.orderedFields);
      },
      checkFieldMove: function(e) {
        if(e.draggedContext.element.type.startsWith('parent_field') || e.draggedContext.futureIndex === 0) {
          return false;
        }

      },
      handleFieldChange: function(e) {
        if(e.removed) {
          this.orderedFields = this.orderedFields.filter(field => field.type !== e.removed.element.type);
        }
      },
      filterDuplicates(fieldsArray, prevGroupNum) {
        const filter = fieldsArray.filter(el => Object.keys(el)[0] === 'group' + prevGroupNum);
        if(filter.length > 1) {
          const duplicateIndex = fieldsArray.findIndex(el => Object.keys(el)[0] ==='group' + prevGroupNum);
          fieldsArray.splice(duplicateIndex, 1);
        }
        return fieldsArray;
      },
      editFieldContent: function (item) {
        if (!Array.isArray(item)) {
          this.editFieldItem = item;
          this.showEditField = true;
        } else {
          this.editFieldItem = item.find(x => x.type.startsWith('parent_field'));
          this.showEditField = true;
        }
      },
    },
    created() {
      if (this.orderedFields.length === 0) {
        dummyFields.map(fieldType => this.availableFields.push({
          type: fieldType,
          header: '',
          description: '',
        }))
        this.orderedFields = [...this.availableFields];
      }
    },

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

  .btn-submit-container {
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

  .ordered-fields-item {
    margin-top: 5px;
    border: 1px solid grey;
  }
</style>