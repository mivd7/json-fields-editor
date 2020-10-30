<template>
  <div class="row" v-if="!showChangeOrder">
    <div class="col-3">
      <div class="field-type-container">
        <h3>Field Types</h3>
        <draggable class="list-group" :list="fieldTypes" group="people" @change="log">
          <div class="list-group-item" v-for="(fieldType, index) in fieldTypes" :key="index" style="background-color: transparent;">
            {{ fieldType }}
          </div>
        </draggable>
      </div>
    </div>

    <div class="col-3">
      <div class="field-type-container">
        <h3>Single Fields</h3>
        <draggable class="list-group" :list="singleFields" group="people" @change="log">
          <div class="list-group-item" v-for="(singleField, index) in singleFields" :key="index" style="background-color: transparent;">
            {{ singleField }}
          </div>
        </draggable>
      </div>
    </div>

    <div class="col-3">
      <button @click="addGroup()">Add group</button>
      <h3>Field Groups </h3>
      
      <div  class="field-group-container">
        <div class="field-group-list" v-for="(group, groupIndex) in groups" :key="groupIndex">
          <draggable class="list-group" v-if="group['group' + groupIndex]" :list="group['group' + groupIndex]" group="people"
            @change="log">
            <div class="list-group-item" v-for="(fieldType, fieldIndex) in group['group' + groupIndex]"
              :key="fieldIndex">
              <div v-if="fieldType.startsWith('parent')" style="background-color: green; color: white;">Group {{groupIndex + 1}}</div>
              <span v-else>{{fieldType}}</span>
            </div>
          </draggable>
        </div>
      </div>
      
    </div>
    <button class="btn-submit" @click="submit()">Save</button>
  </div>
  <div v-else class="row">
    <div class="col-12">
      <h3>Field Order</h3>
      
      <div  class="field-group-container">
        <div class="field-group-list">
          <draggable class="list-group" :list="result" group="people"
            @change="log">
            <div class="list-group-item" v-for="(value, index) in result"
              :key="index">
              <div v-if="typeof value !== 'string'" v-for="()">
                <div v-if="value.startsWith('parent')" style="background-color: green; color: white;">Group {{index + 1}}</div>
                <span v-else>{{value}}</span>
              </div>
              <div v-if="typeof value !== 'string'">
                <div v-if="value.startsWith('parent')" style="background-color: green; color: white;">Group {{index + 1}}</div>
                <span v-else>{{value}}</span>
              </div>
            </div>
          </draggable>
        </div>
      </div>
      
    </div>
    <button class="btn-submit" @click="submitOrder()">Save</button>
  </div>
</template>
<script>
  import draggable from 'vuedraggable';
  import dummyFields from '../lib/dummyFields';

  export default {
    name: "FieldsConfigurator",
    components: {
      draggable
    },
    data() {
      return {
        fieldTypes: [...dummyFields],
        singleFields: [],
        groups: [],
        result: [],
        groupAmount: 0,
        showChangeOrder: false
      };
    },
    methods: {
      addGroup: function () {
        let newGroup = {
          [`group${this.groupAmount}`]: [`parent_field_group${this.groupAmount}`]
        }
        this.groups.push(newGroup)
        this.groupAmount++
      },
      submit: function() {
        //emit groups and do something with it
        this.result = this.groups.concat(this.singleFields)
        console.log(this.result)
        // this.showChangeOrder = true;
      },
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
    background-color: green;
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
</style>