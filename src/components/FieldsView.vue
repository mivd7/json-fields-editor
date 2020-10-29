<template>
  <div class="row">
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
      <h3>Field Groups</h3>
      <div v-if="groups.length > 0" class="field-group-container">
        <div class="field-group-list" v-for="(group, groupIndex) in groups" :key="groupIndex">
          <draggable class="list-group" :list="group['group' + groupIndex]" group="people"
            @change="log">
            <div class="list-group-item" v-for="(fieldType, fieldIndex) in group['group' + groupIndex]"
              :key="fieldIndex">
              <div v-if="fieldType.startsWith('parent')" style="background-color: green; color: white;">Group {{groupIndex}}</div>
              <span v-else>{{fieldType}}</span>
            </div>
          </draggable>
        </div>
      </div>
      <button style="margin-top: 10px;" @click="addGroup()">Add subfield group {{groupAmount + 1}}</button>
      <button style="margin-top: 10px;" @click="submitGroups()">Submit groups</button>
    </div>
  </div>
</template>
<script>
  import draggable from 'vuedraggable';
  import dummyFields from '../lib/dummyFields';

  export default {
    name: "FieldsView",
    // display: "Two Lists",
    // order: 1,
    components: {
      draggable
    },
    data() {
      return {
        fieldTypes: [...dummyFields],
        groups: [],
        groupAmount: 0,
      };
    },
    methods: {
      addGroup: function () {
        let obj = {
          [`group${this.groupAmount}`]: [`parent_field_group_${this.groupAmount}`]
        }
        this.groups.push(obj)
        this.groupAmount++
      },
      submitGroups: function() {
        //emit groups and do something with it
        console.log(this.groups)
      },
      replace: function () {
        this.list = [{
          name: "Edgard"
        }];
      },
      clone: function (el) {
        return {
          name: el.name + " cloned"
        };
      },
      log: function (evt) {
        window.console.log(evt);
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
    -ms-flex: 0 0 50%;
    -webkit-box-flex: 0;
    flex: 0 0 25%;
    max-width: 25%;
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

  .field-type-container {
    margin: 25px;
  }

  .field-group-list {
    padding: 15px;
    margin: 25px;
  }
</style>