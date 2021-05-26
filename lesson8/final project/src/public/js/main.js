import cart from './CartComp'
import products from './ProductsComp'
import catalog from './CatalogComp'
import error from './CatalogNavCompComp'
import error from './CatalogNavCompComp'

const app = {
    el: '#app',
    components: {
        cart,
        products,
        catalog,
        search,
    },
    data: {
        userSearch: '',
        showCart: false,
        showCatalog: true,
        showProduct: false,
    },
    methods: {
        btnCartClicked() {
            if (this.showCart) return;
            this.showCart = true;
            this.showCatalog = false;
            this.showProduct = false;
        },
        btnProductClicked() {
            if (this.showProduct) return;
            this.showProduct = true;
            this.showCatalog = false;
        },
        btnCatalogClicked() {
            if (this.showCatalog) return;
            this.showCatalog = true;
            this.showProduct = false;
            this.showCart = false;
        },
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error);
                })
        },
        postJson(url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                  this.$refs.error.setError(error);
              });
        },
        putJson(url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                  this.$refs.error.setError(error);
              });
        },
        deleteJson(url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then(result => result.json())
              .catch(error => {
                  this.$refs.error.setError(error);
              });
        },
    },
    mounted() {
        console.log(this);
    }
};

export default app;
