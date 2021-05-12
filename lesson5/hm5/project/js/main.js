const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        cart: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        searchLine: '',
        productsSearched: [],
        isVisibleCart: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product) {
            console.log(product.id_product);
        },
        filterGoods() {
            const regExp = new RegExp(this.searchLine, 'igy');
            this.productsSearched = [];
            this.products.forEach(elem => {
                if(elem.product_name.match(regExp)) this.productsSearched.push(elem)
            });

            console.log(this.productsSearched)
        }
    },

    created() {
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                }
            });
        this.getJson(`${API + this.cartUrl}`)
            .then(data => this.cart = data.contents);
    },

});