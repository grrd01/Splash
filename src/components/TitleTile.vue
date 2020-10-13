<template>
    <div class="tile is-parent is-vertical">
        <article class="tile is-child notification is-primary">
            <p class="title">Aare</p>
            <p class="subtitle">Marzili Bern</p>
        </article>
        <article class="tile is-child notification is-warning">
            <p class="title">{{ value }}</p>
            <p class="subtitle">Test: {{ test }}</p>
            <b-field label="Test-Wert">
                <b-input v-model.number="myTest" type="number" step="0.1"></b-input>
            </b-field>
            <b-field label="Simple">
                <b-slider v-model="myTest" :min="-10" :max="40" :step="0.1" @input="myTestChange($event)"></b-slider>
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
        msg: String,
        value: Number,
        test: Number,
        checkbox: Boolean
    },
    methods: {
        // maybe onchagne may onclick whatever..
        myCheckboxChange: function () {
            this.$emit('interface', this.myCheckbox) // handle data and give it back to parent by interface
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

</style>
