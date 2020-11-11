<template>
  <div class="row" v-if="!showEditField">
    <div class="col-3" style="position: relative;">
      <div class="row" >
          <div class="col-9">      
            <h3 style="text-align: right;">Field Types </h3>
          </div>
          <div class="col-3" style="text-align: left;">
            <div @mouseover="handleMouseOver('types')" @mouseout="handleMouseLeave"> 
              <img src="../assets/information.png" alt="wtf??" class="question-mark-icon"/>
              <HelpModal v-if="helpTopic === 'types'" :show="showHelpModal" :content="helpContent" v-on:close="showHelpModal = false"/>
            </div>
          </div>
      </div>
      <div class="field-type-container">        
        <draggable class="available-fields-list-group list-group" :move="checkSingleFieldMove" :list="availableFields" group="people" @change="handleFieldChange">
          <div class="list-group-item" v-for="(field, index) in availableFields" :key="index"
            style="background-color: transparent;">
            {{ field.type }}
          </div>
        </draggable>
      </div>
    </div>

    <div class="col-3" style="position: relative;">
      <div class="row" >
        <div class="col-9">      
          <h3 style="text-align: right;">Field Groups </h3>
        </div>
        <div class="col-3" style="text-align: left;">
          <div @mouseover="handleMouseOver('groups')" @mouseout="handleMouseLeave"> 
              <img  src="../assets/information.png" alt="wtf??" class="question-mark-icon"/>
              <HelpModal v-if="helpTopic === 'groups'" :show="showHelpModal" :content="helpContent" v-on:close="showHelpModal = false"/>
          </div>
        </div>
      </div>
      <div class="field-group-container" v-if="groups.length > 0">
        <div class="field-group-list" v-for="group in groups" :key="group.groupId">

          <draggable class="group-fields-list-group list-group" v-if="group.groupFields" :list="group.groupFields"
            group="people" draggable=".list-group-item" :move="checkGroupFieldMove" @change="handleOrderChange" :sort="checkGroupFieldMove">
            <div slot="header" class="list-group-header" style="background-color: green; color: white;">
              <span>Group {{group.groupId + 1}}</span>
            </div>

            <div class="list-group-item" v-for="(field, fieldIndex) in group.groupFields"
              :key="fieldIndex">
              <span v-if="field.type.startsWith('parent')">Parent Field <a @click="editFieldContent(field)" style="color: green; text-decoration: underline; text-align: right;">edit</a></span>
              <span v-else>{{field.type}} <a @click="editFieldContent(field, group.groupId)" style="color: green; text-decoration: underline; text-align: right;">edit</a></span>
            </div>
          </draggable>
        </div>
      </div>
      <button @click="addGroup()">Add group</button>
    </div>

    <div class="col-3" style="position: relative;">
      <div class="row" >
        <div class="col-9">      
          <h3 style="text-align: right;">Field Order </h3>
        </div>
        <div class="col-3" style="text-align: left;">
          <div @mouseover="handleMouseOver('order')" @mouseout="handleMouseLeave"> 
              <img src="../assets/information.png" alt="wtf??" class="question-mark-icon"/>
              <HelpModal v-if="helpTopic === 'order'" :show="showHelpModal" :content="helpContent" v-on:close="showHelpModal = false"/>
          </div>
        </div>
        
      </div>
      <div class="field-group-container">
        <div class="field-group-list">
          <draggable class="order-fields-list-group list-group" :move="checkOrderMove" :list="orderedFields" group="people">
            <div v-for="(field, index) in orderedFields" :key="index">
              <div v-if="field.hasOwnProperty('groupId')" class="list-group-item">{{index + 1}}. 
                <!-- {{field.groupFields.map(groupField => groupField.type)}} -->
                <span v-for="(groupField, index) in field.groupFields" :key="index">{{groupField.type}}, </span>
              </div>
              <div v-else class="list-group-item">{{index + 1}}. {{field.type}} <a @click="editFieldContent(field)" style="color: green; text-decoration: underline; text-align: right;">edit</a></div>
            </div>
          </draggable>
        </div>
      </div>
    </div>
   
    <div class="btn-submit-container">
      <button class="btn-submit" @click="$emit('configurator-result', this.orderedFields)">Show Overview</button>
      <button @click="$emit('submit', jsonData.fields)" style="margin-top: 10px;">Submit Field Configuration</button>
    </div>
  </div>
  
  <div v-else-if="showEditField" class="row">
    <EditFieldForm :field="editFieldItem" v-on:fieldUpdated="showEditField = false" />
  </div>
</template>
<script>
  import draggable from 'vuedraggable';
  import EditFieldForm from './EditFieldForm';
  import HelpModal from './HelpModal';

  export default {
    name: "FieldsConfigurator",
    components: {
      draggable,
      EditFieldForm,
      HelpModal
    },
    props: {
      fieldProps: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        availableFields: [],
        groups: [],
        orderedFields: [],
        showEditField: false,
        showHelpModal: false,
        helpTopic: '',
        helpContent: '',
        editFieldItem: {}
      };
    },
    methods: {
      addGroup: function () {
        let newGroup = {
          groupId: this.groups.length,
          groupFields: [{
            type: 'parent_field_group' + this.groups.length,
            header: '',
            description: ''
          }]
        }
        this.groups.push(newGroup)
      },
      checkSingleFieldMove: function(e) {
        if(e.to.getAttribute('class').includes('order-fields-list-group')) {
          return false;
        }
      },
      checkGroupFieldMove: function(e) {
        if(e.draggedContext.element.type.startsWith('parent_field') || e.draggedContext.futureIndex === 0) {
          return false;
        }
      },
      checkOrderMove: function(e) {
        if(!e.to.getAttribute('class').includes('order-fields-list-group')) {
          return false;
        }
      },
      editFieldContent: function (item, groupId) {
        this.editFieldItem = item;
        if(typeof groupId !== 'undefined') {
          const group = this.groups.find(group => group.groupId === groupId);
          const subFields = group.groupFields.filter(groupField => groupField.type !== 'parent_field_group' + group.groupId);
          subFields.forEach(function (subField, index) {
            subField.subfieldLetter = String.fromCharCode(65 + index).toLowerCase();
          });
          this.editFieldItem = subFields.find(subField => subField.type === item.type);
        }
        this.showEditField = true;
      },
      handleOrderChange: function () {
        const singleFields = this.orderedFields.filter(field => !field.hasOwnProperty('groupFields'));
        this.orderedFields = this.groups.concat(singleFields);
      },
      handleFieldChange: function(e) {
        if(e.removed) {
          this.orderedFields = this.orderedFields.filter(field => field.type !== e.removed.element.type);
        }
      },
      handleMouseOver: function (column) {
        this.helpTopic = column;
        switch (column) {
          case 'types':
            this.helpContent = 'All the field types currently available for this flow';
            break;
          case 'groups':
            this.helpContent = 'Make a group to show multiple fields in one step. The parent field represents the step preceeding the grouped fields'
            break;
          case 'order':
            this.helpContent = 'Drag and drop the fields and field groups to decide the order of how the fields are shown.'
            break;
          default:
            break;
        }
        this.showHelpModal = true
      },
      handleMouseLeave: function() {
        this.helpTopic = '';
        this.showHelpModal = false;
      },
      handleIncomingMessage(e) {
        const validOrigins = ["http://ap.localtest.me", "http://bob.zalinco.com", "http://ap.d-promo.com"]
        if (validOrigins.indexOf(e.origin) !== -1 && this.orderedFields.length === 0) {
          //handle initial input from bob iframe parent
          const fieldInput = JSON.parse(e.data);
          this.setupFieldsConfigurator(fieldInput);
        }   
      },
      setupFieldsConfigurator(initialFields) {
        if(Array.isArray(initialFields[0])) {
          initialFields.map((element, index) => {
            if(element.length > 1) {
              element.unshift(initialFields[index - 1][0])
              this.groups.push({
                groupId: this.groups.length,
                groupFields: element
              })
            } else if(!element[0].type.startsWith('parent')) {
              this.availableFields.push(element[0])
            }
          });
          this.orderedFields = this.groups.concat(this.availableFields);
        } else {
          initialFields.map(field => {
            if(field !== 'address_fields') {
              this.availableFields.push({
                  type: field,
                  header: '',
                  description: '',
              })
            } else {
              this.availableFields.push({
                type: 'street',
                header: '',
                description: '',
              }, {
                type: 'number',
                header: '',
                description: '',
              },{
                type: 'zip_code',
                header: '',
                description: '',
              },{
                type: 'city',
                header: '',
                description: '',
              })
            }
          });
          this.orderedFields = [...this.availableFields];
        }
      }
    },
    created() {
      window.addEventListener('message', this.handleIncomingMessage, false);
      if(this.fieldProps.length > 0) {
        this.groups = this.fieldProps.filter(field => field.hasOwnProperty('groupId'));
        this.availableFields = this.fieldProps.filter(field => !field.hasOwnProperty('groupId'));
        this.orderedFields = this.groups.concat(this.availableFields);
      }
    },
  }
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

  .col-9 {
    -ms-flex: 0 0 67%;
    -webkit-box-flex: 0;
    flex: 0 0 67%;
    max-width: 67%;
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
    margin: 0 25px 25px 25px;
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

  .question-mark-icon {
    width: 12.5%;
    margin: 21px 5px 0;
  }
</style>