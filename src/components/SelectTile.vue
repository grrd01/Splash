<template>
  <b-collapse :open="false" animation="slide" aria-id="contentIdForA11y1" v-model="isOpen">
    <article id="select-small" class="tile is-child notification is-warning is-hidden">
      <div class="columns mb-0">
        <div class="column is-narrow">
          <b-field label="">
            <b-select size="is-small" placeholder="Kanton" expanded v-model="kanton" @input="kantonChange($event)">
              <option v-for="kanton in listKanton" v-bind:key="kanton">
                {{ kanton }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field label="">
            <b-select size="is-small" placeholder="Ort" expanded v-model="ort" @input="ortChange($event)">
              <option v-for="ort in listOrt" v-bind:key="ort">
                {{ ort }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
      <b-field label="">
        <b-select size="is-small" placeholder="Bad" expanded v-model="bad" @input="badChange($event)">
          <option v-for="bad in listBad" v-bind:key="bad">
            {{ bad }}
          </option>
        </b-select>
      </b-field>
      <b-field label="">
        <b-select size="is-small" placeholder="Becken" expanded v-model="becken" @input="beckenChange($event)">
          <option v-for="becken in listBecken" v-bind:key="becken">
            {{ becken }}
          </option>
        </b-select>
      </b-field>
    </article>

    <article id="select-big" class="tile is-child notification is-warning ">
      <div class="columns mb-0">
        <div class="column is-narrow">
          <b-field label-for="Kanton" label="Kanton">
            <b-select id="Kanton" placeholder="" expanded v-model="kanton" @input="kantonChange($event)">
              <option v-for="kanton in listKanton" v-bind:key="kanton">
                {{ kanton }}
              </option>
            </b-select>
          </b-field>
        </div>
        <div class="column">
          <b-field label-for="Ort" label="Ort">
            <b-select id="Ort" placeholder="" expanded v-model="ort" @input="ortChange($event)">
              <option v-for="ort in listOrt" v-bind:key="ort">
                {{ ort }}
              </option>
            </b-select>
          </b-field>
        </div>
      </div>
      <b-field label-for="Bad" label="Bad">
        <b-select id="Bad" placeholder="" expanded v-model="bad" @input="badChange($event)">
          <option v-for="bad in listBad" v-bind:key="bad">
            {{ bad }}
          </option>
        </b-select>
      </b-field>
      <b-field label-for="Becken" label="Becken">
        <b-select id="Becken" placeholder="" expanded v-model="becken" @input="beckenChange($event)">
          <option v-for="becken in listBecken" v-bind:key="becken">
            {{ becken }}
          </option>
        </b-select>
      </b-field>
    </article>
  </b-collapse>
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
    all_current: Array,
    isOpen: Boolean
  },
  watch: {
    all_current: function(newVal, oldVal) {
      console.log('Prop changed: ', newVal, ' | was: ', oldVal);
      this.beckenChange();
    }
  },
  methods: {
    // onchange, onclick ...
    kantonChange: function () {
      this.ort = undefined;
      this.bad = undefined;
      this.becken = undefined;
      this.beckenChange();
    },
    ortChange: function () {
      this.bad = undefined;
      this.becken = undefined;
      this.beckenChange();
    },
    badChange: function () {
      this.becken = undefined;
      this.beckenChange();
    },
    beckenChange: function () {
      let newArray = this.all_current.filter(item => (
          (item.kanton === this.kanton || this.kanton === undefined)
          && (item.ort === this.ort || this.ort === undefined)
          && (item.bad === this.bad || this.bad === undefined)
          && (item.becken === this.becken || this.becken === undefined)
      ));
      if (newArray.length === 1) {
        this.kanton = newArray[0].kanton
        this.ort = newArray[0].ort
        this.bad = newArray[0].bad
        this.becken = newArray[0].becken
        localStorage.kanton = this.kanton
        localStorage.ort = this.ort
        localStorage.bad = this.bad
        localStorage.becken = this.becken
        this.$emit('updateBecken', newArray[0]) // handle data and give it back to parent by interface
      } else {
        this.$emit('updateBecken', {
          ort: "",
          bad: "kein Bad ausgewählt",
          becken: "kein Becken ausgewählt",
          temp: 0,
          date: "kein Bad ausgewählt"
        }) // handle data and give it back to parent by interface
      }
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
      return ([...new Set(newArray.map(item => item.becken))].sort());
    }
  },
  mounted () {
    if (localStorage.kanton) {
      this.kanton = localStorage.kanton;
    }
    if (localStorage.ort) {
      this.ort = localStorage.ort;
    }
    if (localStorage.bad) {
      this.bad = localStorage.bad;
    }
    if (localStorage.becken) {
      this.becken = localStorage.becken;
      this.beckenChange();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-warning {
  background-color: #2B7CD3 !important;
  color: #fff !important;
}
/deep/ .label {
  color: #fff !important;
}
#select-small {
  min-height: calc(100vh - 177px);
}
.fillHeight {
  min-height: calc(100vh - 177px);
}
</style>
