Vue.component('catalog', {
    data() {
        return {
            catalogUrl: '',
            products: [],
            filtered: [],
            imgCatalog: 'https://placehold.it/200x150',
        }
    },
    methods: {
        filter(value) {
            console.log(123)
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div>
            <filters-el></filters-el>
            <section class="center">
                <div class="product__cards">
                    <product ref="refref" v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
                </div>
            </section>
            <pagination></pagination>
        </div>
    `
});
Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
            productsAPI: this.$root.$refs.products,
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
                <a href="#" @click="$root.btnProductClicked(), productsAPI.showFullProduct(product)"><img class="product__img" :src="product.img_src" alt="item"></a>
                <button class="product__cart" @click="cartAPI.addProduct(product)"><img src="img/product-cart.svg" alt="cart"> Add to Cart</button>
                <div class="product__text">
                    <a class="product__name" href="#" @click="$root.btnProductClicked(), productsAPI.showFullProduct(product)">{{product.product_name}}</a>
                    <p class="text">{{product.description}}</p>
                    <p class="product__price">\${{product.price}}</p>
               </div>
            </div>
    `
});

Vue.component('filters-el', {
    template: `
<section class="filters center">
        <details class="filter__categories">
            <summary class="filter__summary"><span class="filter_hidden">FILTER</span>
                <svg
                        class="filter__img_mobile" width="15" height="10" viewBox="0 0 15 10" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                    <path class="open__filter"
                          d="M0.833333 10H4.16667C4.625 10 5 9.625 5 9.16667C5 8.70833 4.625 8.33333 4.16667 8.33333H0.833333C0.375 8.33333 0 8.70833 0 9.16667C0 9.625 0.375 10 0.833333 10ZM0 0.833333C0 1.29167 0.375 1.66667 0.833333 1.66667H14.1667C14.625 1.66667 15 1.29167 15 0.833333C15 0.375 14.625 0 14.1667 0H0.833333C0.375 0 0 0.375 0 0.833333ZM0.833333 5.83333H9.16667C9.625 5.83333 10 5.45833 10 5C10 4.54167 9.625 4.16667 9.16667 4.16667H0.833333C0.375 4.16667 0 4.54167 0 5C0 5.45833 0.375 5.83333 0.833333 5.83333Z"
                          fill="black"/>
                </svg>
            </summary>

            <nav class="filter__nav">
                <details open>
                    <summary class="summary__category">CATEGORY</summary>
                    <ul class="filter__link">
                        <li><a href="#">Accessories</a></li>
                        <li><a href="#">Bags</a></li>
                        <li><a href="#">Denim</a></li>
                        <li><a href="#">Hoodies & Sweatshirts</a></li>
                        <li><a href="#">Jackets & Coats</a></li>
                        <li><a href="#">Polos</a></li>
                        <li><a href="#">Shirts</a></li>
                        <li><a href="#">Shoes</a></li>
                        <li><a href="#">Sweaters & Knits</a></li>
                        <li><a href="#">T-Shirts</a></li>
                        <li><a href="#">Tanks</a></li>
                    </ul>
                </details>
                <details>
                    <summary>BRAND</summary>
                    <ul class="filter__link">
                        <li><a href="#">Accessories</a></li>
                        <li><a href="#">Bags</a></li>
                        <li><a href="#">Denim</a></li>
                        <li><a href="#">Hoodies & Sweatshirts</a></li>
                    </ul>
                </details>
                <details>
                    <summary>DESIGNER</summary>
                    <ul class="filter__link">
                        <li><a href="#">Accessories</a></li>
                        <li><a href="#">Bags</a></li>
                        <li><a href="#">Denim</a></li>
                        <li><a href="#">Sweaters & Knits</a></li>
                        <li><a href="#">T-Shirts</a></li>
                        <li><a href="#">Tanks</a></li>
                    </ul>
                </details>
            </nav>

        </details>
        <div class="filters-down filters_center">
            <details>
                <summary class="filters__after filters__summary_center">TRENDING NOW</summary>
                <div class="filters__box_position filters__box_first">
                    <label for="bags">
                        <input id="bags" type="checkbox"> Bags
                    </label>
                    <label for="shirts">
                        <input id="shirts" type="checkbox"> Shirts
                    </label>
                    <label for="t-shirts">
                        <input id="t-shirts" type="checkbox"> T-Shirts
                    </label>
                    <label for="sk">
                        <input id="sk" type="checkbox"> Sweaters & Knits
                    </label>
                    <label for="knits">
                        <input id="knits" type="checkbox"> Knits
                    </label>
                </div>
            </details>
            <details>
                <summary class="filters__after filters__summary_center">SIZE</summary>
                <div class="filters__box_position">
                    <label for="xs">
                        <input id="xs" type="checkbox"> XS
                    </label>
                    <label for="s">
                        <input id="s" type="checkbox"> S
                    </label>
                    <label for="m">
                        <input id="m" type="checkbox"> M
                    </label>
                    <label for="l">
                        <input id="l" type="checkbox"> L
                    </label>
                </div>
            </details>
            <details>
                <summary class="filters__after filters__summary_center">PRICE</summary>
                <div class="filters__box_position">
                    <label for="min">
                        <input name="price" id="min" type="radio"> MIN
                    </label>
                    <label for="max">
                        <input name="price" id="max" type="radio"> MAX
                    </label>
                </div>
            </details>
        </div>
</section>
`
});

Vue.component('pagination', {

    template: `
    
        <nav class="center">
        <ul class="pagination">
            <li class="pagination__item">
                <a class="pagination__link " href="#">
                    <img src="img/back.svg" alt="back">
                </a>
            </li>
            <li class="pagination__item"><a class="pagination__link select_text" href="#">1</a></li>
            <li class="pagination__item"><a class="pagination__link " href="#">2</a></li>
            <li class="pagination__item"><a class="pagination__link " href="#">3</a></li>
            <li class="pagination__item"><a class="pagination__link " href="#">4</a></li>
            <li class="pagination__item"><a class="pagination__link " href="#">5</a></li>
            <li class="pagination__item"><a class="pagination__link " href="#">6</a></li>
            <li class="pagination__item pagination__dot">.....</li>
            <li class="pagination__item"><a class="pagination__link " href="#">20</a></li>
            <li class="pagination__item">
                <a class="pagination__link " href="#">
                    <img src="img/next.svg" alt="next">
                </a>
            </li>
        </ul>
        </nav>
    
    `

})
