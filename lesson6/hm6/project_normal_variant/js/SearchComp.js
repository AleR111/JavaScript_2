Vue.component('search', {
    props: ['value'],
    template: `<form action="#" class="search-form" @submit.prevent="$root.$refs.products.filter()">
<!--                <input type="text" class="search-field" v-model="$parent.userSearch1(userSearch)">-->
<input type="text" class="search-field" v-bind:value="value" v-on:input="$emit('input', $event.target.value)">
                <button class="btn-search" type="submit">
                    <i class="fas fa-search"></i>
                </button>
            </form>`,
    mounted() {
        console.log(parent)
    }
})