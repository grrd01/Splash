<template>
  <div id="app">
    <section class="section">
      <div class="container">
        <div class="tile is-ancestor">
          <div class="tile is-vertical is-12">
            <div class="tile">
              <div class="tile is-parent is-vertical">
                <TitleTile :ort="ort" :bad="bad" :becken="becken" :temp="temp" :test="test" :checkbox="checkbox" :isOpen="isOpen"
                           @updateIsOpen="updateIsOpen" @updateCheckbox="updateCheckbox" @updateTest="updateTest"/>
                <SelectTile :all_current="all_current" :isOpen="isOpen" @updateBecken="updateBecken"/>
              </div>
              <ThermometerTile :temp="temp" :datum="datum" :test="test" :checkbox="checkbox"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TitleTile from './components/TitleTile.vue'
import SelectTile from './components/SelectTile.vue'
import ThermometerTile from './components/ThermometerTile.vue'
import axios from "axios";

export default {
  name: 'App',
  components: {
    TitleTile,
    SelectTile,
    ThermometerTile
  },
  data: function () {
    return {
      test: 0,
      temp: 0,
      datum: "kein Bad ausgewählt",
      checkbox: false,
      all_current: [],
      badObject: {},
      ort: "",
      bad: "kein Bad ausgewählt",
      becken: "kein Becken ausgewählt",
      isOpen: true
    }
  },
  methods: {
    updateCheckbox: function (event) {
      this.checkbox = event
    },
    updateTest: function (event) {
      this.test = event
    },
    updateIsOpen: function (event) {
      this.isOpen = event
    },
    updateBecken: function (event) {
      this.badObject = event
      this.ort = this.badObject.ort
      this.bad = this.badObject.bad
      this.becken = this.badObject.becken
      this.temp = parseFloat(this.badObject.temp)
      this.datum = this.badObject.date
      localStorage.bad = this.bad;
      localStorage.becken = this.becken;
      localStorage.temp = this.temp;
      localStorage.datum = this.datum;
    },
    resize() {
      if (window.innerWidth > 768) {
      // if (document.documentElement.clientWidth > 768) {
        this.isOpen = true;
        document.getElementById("select-big").classList.add("fillHeight");
      } else {
        document.getElementById("select-big").classList.remove("fillHeight");
      }
      if (window.innerHeight < 456) {
        document.getElementById("select-small").classList.remove("is-hidden");
        document.getElementById("select-big").classList.add("is-hidden");
      } else {
        document.getElementById("select-small").classList.add("is-hidden");
        document.getElementById("select-big").classList.remove("is-hidden");
      }
    }
  },
  mounted () {
    this.resize();
    /*
      axios
          .get('https://www.wiewarm.ch:443/api/v1/temperature.json/17')
          .then((response) => {
              this.temp = parseFloat(response.data['52']['temp'])
              this.datum = (new Date(Date.parse(response.data['52']['date']))).toLocaleDateString('de-CH',{ day: '2-digit', month: '2-digit',year: 'numeric', hour: '2-digit', minute: '2-digit'  })
          })

     */
    if (localStorage.ort) {
      this.ort = localStorage.ort;
    }
    if (localStorage.bad) {
      this.bad = localStorage.bad;
    }
    if (localStorage.becken) {
      this.becken = localStorage.becken;
    }
    if (localStorage.temp) {
      this.temp = parseFloat(localStorage.temp);
    }
    if (localStorage.datum) {
      this.datum = localStorage.datum;
    }
    axios
      .get('https://www.wiewarm.ch:443/api/v1/temperature/all_current.json/0')
      .then((response) => {
        this.all_current = response.data
      })
  },
  created() {
    window.addEventListener("resize", this.resize);
  },
  destroyed() {
    window.removeEventListener("resize", this.resize);
  }
}
</script>

<style>
  .section {
    padding: 1.5rem 1.5rem !important;
  }
</style>
