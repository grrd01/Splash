<template>
    <div id="app">
        <section class="section">
            <div class="container">
                <div class="tile is-ancestor">
                    <div class="tile is-vertical is-12">
                        <div class="tile">
                            <TitleTile :value="value" :test="test" :checkbox="checkbox" @interface="updateCheckbox" @updateTest="updateTest"/>
                            <ThermometerTile :value="value" :test="test" :checkbox="checkbox"/>
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
            value: 10,
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
            .then(response => (this.value = parseFloat(response.data['52']['temp'])))
    }
}
</script>

<style>

</style>
