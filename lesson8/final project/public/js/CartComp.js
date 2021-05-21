Vue.component('cart', {
    data() {
        return {
            imgCart: 'https://placehold.it/50x100',
            cartUrl: '/getBasket.json',
            cartItems: [],
            showCart: false,
        }
    },
    methods: {
        addProduct(product) {
            let find = this.cartItems.find(el => el.id_product === product.id_product);
            if (find) {
                this.$parent.putJson(`/api/cart/${find.id_product}`, {quantity: 1});
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                        }
                    });
            }
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        if (item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1)
                        }
                    }
                })
        },
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
<!--        <div>-->
<!--            <button class="btn-cart" type="button" @click="showCart = !showCart">Корзина</button>-->
<!--            <div class="cart-block" v-show="showCart">-->
<!--                <p v-if="!cartItems.length">Корзина пуста</p>-->
<!--                <cart-item class="cart-item" -->
<!--                v-for="item of cartItems" -->
<!--                :key="item.id_product"-->
<!--                :cart-item="item" -->
<!--                :img="imgCart"-->
<!--                @remove="remove">-->
<!--                </cart-item>-->
<!--            </div>-->
<!--        </div>-->
        <div class="cart-block">
            <div class="item-cart cart-block__left">
                <p v-if="!cartItems.length" class="cart__text_empty">Cart empty</p>
                <cart-item class="cart-item" 
                v-for="item of cartItems" 
                :key="item.id_product"
                :cart-item="item" 
                :img="imgCart"
                @remove="remove">
                </cart-item>
                <div v-show="!showCart" class="item-cart__box-butt">
                    <button class="item-cart__butt">CLEAR SHOPPING CART</button>
                    <button class="item-cart__butt">CONTINUE SHOPPING</button>
                </div>
            
            </div>
            
            <cart-block__right :cart-item="cartItems"></cart-block__right>
        </div>
`
});

Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `
<!--                <div class="cart-item">-->
<!--                <div class="product-bio">-->
<!--                    <img :src="img" alt="Some image">-->
<!--                    <div class="product-desc">-->
<!--                        <p class="product-title">{{cartItem.product_name}}</p>-->
<!--                        <p class="product-quantity">Количество: {{cartItem.quantity}}</p>-->
<!--                        <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div class="right-block">-->
<!--                    <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>-->
<!--                    <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>-->
<!--                </div>-->
<!--            </div>-->
            
            <div class="order">
                <div class="order__box-img"><img class="order__img" :src="cartItem.img_src" alt="man"></div>
                <div class="order__descrip">
                    <a href="#" class="order__name">{{cartItem.product_name}}</a>
                    <ul class="order__param">
                        <li>Price: <span class="select_text">\${{cartItem.price}}</span></li>
                        <li>Color: <span>Red</span></li>
                        <li>Size: <span>Xl</span></li>
                        <li>Quantity: <input class="order__param_quantity" type="number" value="1" min="0" max="100">
                        </li>
                    </ul>
                </div>
                <button class="butt-clouse"><img class="butt-clouse__img" src="img/butt_clouse.svg"
                                                 alt="clouse"></button>
            </div>
    `
});

Vue.component('cart-block__right', {
    props: ['cartItem'],
    template: `            
            <div class="cart-block__right">
            <form action="#" class="form cart-block__form">
                <h3 class="form__heading">SHIPPING ADRESS</h3>
                <input class="form__input" type="text" placeholder="Bangladesh">
                <input class="form__input" type="text" placeholder="State">
                <input class="form__input cart-block__input" type="text" placeholder="Postcode / Zip">
                <button class="form__butt cart-block__butt">GET A QUOTE</button>
            </form>
            <div class="checkout">
                <ul class="checkout__content">
                    <li class="checkout__cost">SUB TOTAL <span class="checkout__cost_money"></span>$900</li>
                    <li class="checkout__cost select_text">GRAND TOTAL
                        <hr class="checkout__cost_rule">
                        <span class="checkout__cost_money select">$900</span>
                    </li>
                </ul>
                <hr class="checkout__rule">
                <button class="checkout__butt">PROCEED TO CHECKOUT</button>
            </div>
        </div>
    `
});