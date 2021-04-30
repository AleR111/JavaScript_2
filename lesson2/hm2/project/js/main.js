'use strict';

class ProductList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.allProducts = [];

        this.fetchGoods();
        this.render();
    }

    fetchGoods() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    render() {
        const block = document.querySelector(this.container);

        for (const good of this.goods) {
            const productObject = new ProductItem(good);
            // console.log(productObject);
            this.allProducts.push(productObject);
            block.insertAdjacentHTML('afterbegin', productObject.render());
        }
    }

    getTotalPriceOfProduct() {
       return this.goods.reduce((total, elem) =>
           total +=  elem.price
        , 0)
    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
                      <img src="${this.img}" alt="Some img">
                      <div class="desc">
                          <h3 class="product-item__header">${this.title}</h3>
                          <p class="product-item__text">${this.price} \u20bd</p>
                          <button class="buy-btn">Купить</button>
                      </div>
                  </div>`;
    }
}
const product = new ProductList();
console.log(product.getTotalPriceOfProduct());

// task 1
// class CartList{
// constructor(){...}
// render()
// remoteItem()
// buyAllCart()
// getTotalPriceOfCart()
// }
//
// class CartItem{
// constructor(){...}
// render()
// increaseAmount()
// decreaseAmount()
// }