<template>
  <b-collapse :open="true" animation="slide" >
    <div class="tile is-child is-vertical">
      <article id="title" class="tile is-child notification is-primary is-flex">
        <div>
          <p class="title">{{ titel }}</p>
          <p class="subtitle">{{ becken }}</p>
        </div>
        <button
            class="button is-medium is-warning is-hidden-tablet"
            @click="isOpenChange()"
            aria-controls="contentIdForA11y1"
            aria-label="Auswahl anzeigen/ausblenden">
          <b-icon
              pack="fas"
              icon="angle-down"
              size="is-small"
              v-if="!isOpen">
          </b-icon>
          <b-icon
              pack="fas"
              icon="angle-up"
              size="is-small"
              v-if="isOpen">
          </b-icon>
        </button>
      </article>
      <b-collapse animation="slide" v-model="isTest">
        <article class="tile is-child notification is-warning">
          <p class="title">{{ temp }}&deg;</p>
          <p class="subtitle">Test: {{ test }}&deg;</p>
          <b-field label="Test-Wert">
            <b-input v-model.number="myTest" type="number" step="0.1" aria-label="Test-Wert"></b-input>
          </b-field>
          <b-field label="Slider">
            <b-slider v-model="myTest" :min="-10" :max="40" :step="0.1" @input="myTestChange($event)" aria-label="slider"></b-slider>
          </b-field>
          <b-checkbox v-model="myCheckbox"  @change.native="myCheckboxChange($event)">
            Test-Wert verwenden
          </b-checkbox>
        </article>
      </b-collapse>
    </div>
  </b-collapse>

</template>

<script>
export default {
    name: 'TitleTile',
    data: function () {
      return {
        myCheckbox: Boolean,
        myTest: Number,
        isTest: false
      }
    },
    props: {
      ort: String,
      bad: String,
      becken: String,
      temp: Number,
      test: Number,
      checkbox: Boolean,
      isOpen: Boolean
    },
    computed: {
      titel() {
        if (this.bad.includes(this.ort)) {
          return (this.bad);
        } else {
          return (this.bad + " " + this.ort);
        }
      }
    },
    methods: {
      // maybe onchagne may onclick whatever..
      myCheckboxChange: function () {
        this.$emit('updateCheckbox', this.myCheckbox) // handle data and give it back to parent by interface
      },
      myTestChange: function () {
        this.$emit('updateTest', this.myTest)
      },
      isOpenChange: function () {
        this.$emit('updateIsOpen', !(this.isOpen))
      }
    },
    beforeMount () {
      this.myCheckbox = this.checkbox
      this.myTest = this.test
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #title {
    justify-content: space-between;
  }
  .title, .subtitle, /deep/ .label, /deep/ .control-label {
    color: #fff !important;
  }
  .is-warning {
    background-color: #2B7CD3 !important;
    color: #000 !important;
  }
  .is-primary {
    background-color: #103F91 !important;
  }
  /deep/ .b-slider.is-primary .b-slider-fill {
    background: #103F91!important;
  }
  /deep/ .b-checkbox.checkbox input[type=checkbox] + .check {
    border: 2px solid white;
  }
  /deep/ .b-checkbox.checkbox input[type=checkbox]:active + .check {
    border: 2px solid #103F91;
  }
  /deep/ .b-checkbox.checkbox input[type=checkbox]:checked + .check {
    background: #103F91 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Cpath style='fill:%23fff' d='M 0.04038059,0.6267767 0.14644661,0.52071068 0.42928932,0.80355339 0.3232233,0.90961941 z M 0.21715729,0.80355339 0.85355339,0.16715729 0.95961941,0.2732233 0.3232233,0.90961941 z'%3E%3C/path%3E%3C/svg%3E") no-repeat center center;
    border-color: white;
  }
  /deep/ .icon {
    color: white
  }

</style>
