<template>
    <article class="tile is-child notification is-warning">
      <div class="columns">
        <div class="column is-narrow">
          <b-field
              label="Kanton">
            <b-select placeholder="" expanded v-model="kanton">
              <option v-for="kanton in listKanton" v-bind:key="kanton">
                {{ kanton }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field
              label="Ort">
            <b-select placeholder="" expanded v-model="ort">
              <option v-for="ort in listOrt" v-bind:key="ort">
                {{ ort }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>




      <b-field
          label="Bad">
        <b-select placeholder="" expanded v-model="bad">
          <option v-for="bad in listBad" v-bind:key="bad">
            {{ bad }}
          </option>
        </b-select>
      </b-field>

      <b-field
          label="Becken">
        <b-select placeholder="" expanded v-model="becken" @input="beckenChange($event)">
          <option v-for="becken in listBecken" v-bind:key="becken">
            {{ becken }}
          </option>
        </b-select>
      </b-field>
    </article>
</template>

<script>
export default {
  name: 'SelectTile',
  data: function () {
    return {
      kanton: undefined,
      ort: undefined,
      bad: undefined,
      becken: undefined,
      beckenObject: undefined
    }
  },
  props: {
    all_current: Array
  },
  methods: {
    // onchange, onclick ...
    beckenChange: function () {
      let newArray = this.all_current.filter(item => (
          (item.kanton === this.kanton || this.kanton === undefined)
          && (item.ort === this.ort || this.ort === undefined)
          && (item.bad === this.bad || this.bad === undefined)
          && (item.becken === this.becken || this.becken === undefined)
      ));
      this.$emit('updateBecken', newArray[0]) // handle data and give it back to parent by interface
    }
  },
  computed: {
    listKanton() {
      return ([...new Set(this.all_current.map(item => item.kanton))].sort());
    },
    listOrt() {
      // Kanton filtern
      let newArray = [...new Set(
          this.all_current
              .filter(item => (item.kanton === this.kanton || this.kanton === undefined))
              .map(item => item.ort)
              .sort()
      )];
      if (!newArray.includes(this.ort)) {
        console.log("ungültiger Ort");
        //this.ort = undefined;
      }
      return (newArray);
    },
    listBad() {
      // Kanton & Ort filtern
      let newArray = this.all_current.filter(item => (
          (item.kanton === this.kanton || this.kanton === undefined)
          && (item.ort === this.ort || this.ort === undefined)
      ));
      return ([...new Set(newArray.map(item => item.bad))].sort());
    },
    listBecken() {
      // Kanton & Ort & Bad filtern
      let newArray = this.all_current.filter(item => (
          (item.kanton === this.kanton || this.kanton === undefined)
          && (item.ort === this.ort || this.ort === undefined)
          && (item.bad === this.bad || this.bad === undefined)
      ));
      return ([...new Set(newArray.map(item => item.becken))]);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-warning {
  background-color: #7986CB !important;
  color: #fff !important;
}
label {
  color: #fff !important;
}
</style>
