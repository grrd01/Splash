<template>
    <div id="app">
        <section class="section">
            <div class="container">
                <div class="tile is-ancestor">
                    <div class="tile is-vertical is-12">
                        <div class="tile">
                            <TitleTile :temp="temp" :test="test" :checkbox="checkbox" @interface="updateCheckbox" @updateTest="updateTest"/>
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
import ThermometerTile from './components/ThermometerTile.vue'
import axios from "axios";

export default {
    name: 'App',
    components: {
        TitleTile,
        ThermometerTile
    },
    data: function () {
        return {
            test: 0,
            temp: 10,
            datum: "please wait",
            checkbox: false
        }
    },
    methods: {
        updateCheckbox: function (event) {
            this.checkbox = event
        },
        updateTest: function (event) {
            this.test = event
        }
    },
    mounted () {
        axios
            .get('https://www.wiewarm.ch:443/api/v1/temperature.json/17')
            .then((response) => {
                this.temp = parseFloat(response.data['52']['temp'])
                this.datum = (new Date(Date.parse(response.data['52']['date']))).toLocaleDateString('de-CH',{ day: '2-digit', month: '2-digit',year: 'numeric', hour: '2-digit', minute: '2-digit'  })
            })
    }
}
</script>

<style>
    .section {
        padding: 1.5rem 1.5rem !important;
    }
</style>
