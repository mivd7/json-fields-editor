<template>
  <div>
    <JsonEditor :options="{
            confirmText: 'confirm',
            cancelText: 'cancel',
        }" v-bind:objData="jsonData" v-model="jsonData"/>
    <button @click="handleSubmit">Submit</button>
    <button @click="addField">Add field</button>
  </div>
</template>

<script>
  export default {
    name: 'Editor',
    data: () => {
      return {
        jsonData: {
          fields: [
            [{
              "type": "personal_fields",
              "header": "First we would love to know who you are",
              "description": "This is needed so we can validate our winner",
              "isParentField": true
            }],
            // [{
            //     "type": "first_name",
            //     "header": "Who wins the prize?",
            //     "description": "Let's start by grabbing your name",
            //     "subfieldLetter": "a"
            //   },
            //   {
            //     "type": "last_name",
            //     "header": "",
            //     "description": "",
            //     "subfieldLetter": "a"
            //   }
            // ],
            // [{
            //     "type": "gender",
            //     "header": "Would that be Mr. or Mrs. {{lead.last_name}}?",
            //     "description": "Select your gender below",
            //     "subfieldLetter": "b"

            //   },
            //   {
            //     "type": "date_of_birth",
            //     "header": "What's your date of birth?",
            //     "description": "You must be over 18 to participate",
            //     "subfieldLetter": "c"
            //   }
            // ],
            // [{
            //   "type": "contact_fields",
            //   "header": "Thanks {{lead.first_name}}, now we would need your contact info",
            //   "description": "We need this so we can reach you when you win",
            //   "isParentField": true
            // }],
            // [{
            //     "type": "email_address",
            //     "header": "What is the best email to reach you at?",
            //     "description": "",
            //     "subfieldLetter": "a"
            //   },
            //   {
            //     "type": "phone_cell",
            //     "header": "What is your phone number?",
            //     "description": "We may contact you by phone to validate private information",
            //     "subfieldLetter": "b"
            //   }
            // ],
            // [{
            //   "type": "address_fields",
            //   "header": "Where should we send your prize?",
            //   "description": "",
            //   "isParentField": true
            // }],
            // [{
            //     "type": "street",
            //     "header": "Enter your address details below",
            //     "description": "",
            //     "subfieldLetter": "a"
            //   },
            //   {
            //     "type": "number",
            //     "header": "",
            //     "description": "",
            //     "subfieldLetter": "b"
            //   },
            //   {
            //     "type": "zip_code",
            //     "header": "",
            //     "description": "",
            //     "subfieldLetter": "c"
            //   },
            //   {
            //     "type": "city",
            //     "header": "",
            //     "description": "",
            //     "subfieldLetter": "d"
            //   }
            // ],
            [{
              "type": "opt_in",
              "header": "Are you in or out?",
              "description": "We need your consent before we can let you continue",
              "isParentField": false
            }]
          ]
        }
      }
    },
    created() {
      //
      let addIcons = document.querySelectorAll(".v-json-edit-icon-add")
      addIcons.forEach(icon => {
        icon.style.visibility = 'hidden';
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