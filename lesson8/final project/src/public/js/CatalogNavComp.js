const navEl = {
    data() {
        return {
            showCart: this.$root.showCart,
        }
    },
    template: `
<nav class="category center">
        <div class="category__name" v-if='!this.$root.showCart'>NEW ARRIVALS</div>
        <div class="category__name" v-if='this.$root.showCart'>SHOPPING CART</div>
        <ol class="crumb" v-if='!this.$root.showCart'>
            <li class="crumb__item"><a href="index.html">HOME</a></li>
            <li class="crumb__item"><a href="#">MEN</a></li>
            <li class="crumb__item" aria-current="page"><a class="active" href="#">NEW ARRIVALS</a></li>
        </ol>

</nav>
`
};

export default navEl;