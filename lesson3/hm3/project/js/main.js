'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// Переделать в ДЗ не использовать fetch а Promise
// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//             let xhr = new XMLHttpRequest();
//             xhr.open('GET', url, true);
//             xhr.onreadystatechange = () => {
//                 if (xhr.readyState === 4) {
//                     if (xhr.status !== 200) {
//                         reject('Error');
//                     } else {
//                         resolve(xhr.responseText);
//                     }
//                 }
//             };
//             xhr.send();
//         }
//     )
// };

// –--------------------------------

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allProducts = [];

        // this._fetchGoods();
        // this._render();

        this._getProducts()
            .then((data) => {
                this._goods = data;
                console.log(data)
                this._render();
            });
    }

    // _fetchGoods() {
    //     getRequest(`${API}/catalogData.json`)
    //         .then(data => {
    //             this._goods = JSON.parse(data);
    //             console.log(this._goods);
    //             this._render();
    //         })
    // }

    _getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    _render() {
        const block = document.querySelector(this.container);

        for (const good of this._goods) {
            const productObject = new ProductItem(good);
            // console.log(productObject);
            this._allProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
        }

    }

    getTotalPriceOfProduct() {
        return this._goods.reduce((total, elem) =>
                total += elem.price
            , 0)
    }

    getGood(id) {
        return  this._goods.find((elem) => elem.id_product === id)
    }

}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }

    render() {
        return `<div class="product-item">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3 class="product-item__header">${this.title}</h3>
                          <p class="product-item__text">${this.price} \u20bd</p>
                          <button class="buy-btn" data-id="${this.id}" >Купить</button>
                      </div>
                  </div>`;
    }
}

class CartList {
    constructor(container, btnCart, cartBtnDel, btnAddGood) {
        this.container = container;
        this.block = document.querySelector(this.container);
        this.btnCart = document.querySelector(btnCart);
        this.cartBtnDel = cartBtnDel;
        this._data = null;
        this.handlerShowCart();

        this._getCartGoods()
            .then((data) => {
                this._data = data;
                this._render();
                this.handlerAddToCart(btnAddGood);
            });
    }

    handlerShowCart() {
        this.btnCart.addEventListener('click', () => {
            this.block.classList.toggle('visibility')
        })
    }

    handlerDeleteGoodCart(cartBtnDel) {
        const btnDel = document.querySelectorAll(cartBtnDel)
        for (const elem of btnDel) {
            elem.addEventListener('click', event => {
                this.canDeleteGood(event)
            })
        }
    }

    canDeleteGood(event) {
        this._deleteFromBasket()
            .then(data => {
                if (data.result !== 1) return;
                this.deleteGood(event)
            })
    }

    _deleteFromBasket() {
        return fetch(`${API}/deleteFromBasket.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error)
            })
    }

    deleteGood(event) {
        const id = +event.target.dataset.id;
        const item = this._data.contents.find((elem) => elem.id_product === id)
        if (item.quantity !== 1) {
            --item.quantity
        } else this._data.contents.splice(this._data.contents.indexOf(item), 1)
        this.block.innerHTML = ''
        this._render();
    }

    handlerAddToCart(btnAddGood) {
        const btnAdd = document.querySelectorAll(btnAddGood)
        for (const elem of btnAdd) {
            elem.addEventListener('click', event => {
                this.canAddGood(event)
            })
        }
    }

    _addToBasket() {
        return fetch(`${API}/addToBasket.json`)
            .then(response => response.json())
            .catch(error => {
                console.log(error)
            })
    }

    canAddGood(event) {
        this._addToBasket()
            .then(data => {
                if (data.result !== 1) return;
                this.addGood(event)
            })
    }

    addGood(event) {
        const id = +event.target.dataset.id;
        const item = this._data.contents.find((elem) => elem.id_product === id)
        if (item) {
            ++item.quantity
        } else {
            const good = productList.getGood(id)
            good.quantity = 1
            this._data.contents.push(good)
        }
        this.block.innerHTML = ''
        this._render();
    }

    _getCartGoods() {
        return fetch(`${API}/getBasket.json`)
            .then((response) => response.json())
            .catch((error) => {
                console.log(error);
            });
    }

    _render() {
            for (const good of this._data.contents) {
            const CartObject = new CartItem(good);
            this.block.insertAdjacentHTML('afterbegin', CartObject.render());
        }

        this.block.insertAdjacentHTML('beforeend', this.renderTotalPrice());
        this.handlerDeleteGoodCart(this.cartBtnDel);
    }

    getTotalCartPrice() {
        return this._data.contents.reduce((total, elem) =>
                total += elem.price * elem.quantity
            , 0)
    }

    renderTotalPrice() {
        return `<div class="cart__total-price"
                    <p class="cart-item__text">Стоимость покупок: ${this.getTotalCartPrice()} \u20bd</p>     
                </div>`;


    }
}

class CartItem {
    constructor(good) {
        this.title = good.product_name;
        this.price = good.price;
        this.quantity = good.quantity;
        this.id = good.id_product;
    }

    render() {
        return `<div class="cart-item" data-id="${this.id}">
                     
                          <div class="cart__content">
                          <h3 class="cart-item__header">${this.title}</h3>
                          <p class="cart-item__text">${this.price} \u20bd</p>
                          <p class="cart-item__quantity">${this.quantity} шт.</p>
                          </div>
                          <button class="cart__btn-del" data-id=${this.id}>Удалить</button>
                      
                  </div>`;
    }
}

const productList = new ProductList();
new CartList('.cart__box', '#btn-cart', '.cart__btn-del', '.buy-btn')
// console.log(product.getTotalPriceOfProduct());
