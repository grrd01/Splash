<template>
    <div class="tile is-child is-vertical">
        <article class="tile is-child notification is-primary">
            <p class="title">{{ bad }}</p>
            <p class="subtitle">{{ becken }}</p>
        </article>
        <article class="tile is-child notification is-warning">
            <p class="title">{{ temp }}</p>
            <p class="subtitle">Test: {{ test }}</p>
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
    </div>
</template>

<script>
export default {
    name: 'TitleTile',
    data: function () {
        return {
            myCheckbox: Boolean,
            myTest: Number
        }
    },
    props: {
        bad: String,
        becken: String,
        temp: Number,
        test: Number,
        checkbox: Boolean
    },
    methods: {
        // maybe onchagne may onclick whatever..
        myCheckboxChange: function () {
            this.$emit('updateCheckbox', this.myCheckbox) // handle data and give it back to parent by interface
        },
        myTestChange: function () {
            this.$emit('updateTest', this.myTest) // handle data and give it back to parent by interface
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
    .is-warning {
        background-color: #7986CB !important;
        color: #000 !important;
    }
    .is-primary {
        background-color: #303F9F !important;
    }
    b-field {
        color: #000 !important;
    }
    b-slider {
        background: #303F9F!important;
    }
</style>
