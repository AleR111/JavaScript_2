Vue.component('catalog', {
    data(){
        return {
            catalogUrl: '',
            products: [],
            filtered: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    methods: {
        filter(value){
            console.log(123)
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="product__cards">
            <product ref="refref" v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
      return {
          cartAPI: API.cart,
      };
    },

    template: `
<!--    <div class="product-item">-->
<!--                <img :src="img" alt="Some img">-->
<!--                <div class="desc">-->
<!--                    <h3>{{product.product_name}}</h3>-->
<!--                    <p>{{product.price}}₽</p>-->
<!--                    <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>-->
<!--                </div>-->
<!--            </div>-->
            
            
           <div class="product__card">
                <a href="#"><img class="product__img" :src="product.img_src" alt="item"></a>
                <a class="product__cart" href="#"><img src="img/product-cart.svg" alt="cart"> Add to Cart</a>
                <div class="product__text">
                    <a class="product__name" href="#">{{product.product_name}}</a>
                    <p class="text">{{product.description}}</p>
                    <p class="product__price">\${{product.price}}</p>
               </div>
            </div>
    `
});
