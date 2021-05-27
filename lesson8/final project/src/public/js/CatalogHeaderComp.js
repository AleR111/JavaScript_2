const search = {
    data(){
        return {
            userSearch: ''
        }
    },
    template: `
            <form action="#" class="search-form" v-on:input="$root.$refs.catalog.filter(userSearch)" @submit.prevent="$root.btnCatalogClicked()">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <img class="header__search" src="img/search.svg" alt="search">
                </button>
            </form>
    `
};

const top = {

    components: { search },
    template: `
<header class="header center">
    <div class="header__left">
        <a href="index.html"><img class="brand" src="img/logo.svg" alt="logo"></a>
        
        <search></search>
        
    </div>
    <div class="header__right">
        <input class="check__menu" id="switch" type="checkbox">
        <label class="header__link switch__menu" for="switch"><img src="img/menu.svg"
                                                                   alt="menu"></label>
        <div class="menu menu__height">
            <div class="menu__icon">
                <a class="header__link" href="registration.html"><img src="img/account.svg"
                                                                      alt="account"></a>
                <a class="header__link" href="cart.html"><img src="img/cart.svg" alt="cart"></a>
            </div>
            <div class="menu__box">
                <div class="menu__block">

                    <h3 class="menu__heading">MENU</h3>
                    <div class="menu_table">
                        <div class="menu__category">

                            <h3 class="menu__heading select_text">MAN</h3>
                            <ul class="menu-man">
                                <li><a class="menu__link" href="#">Accessories</a></li>
                                <li><a class="menu__link" href="#">Bags</a></li>
                                <li><a class="menu__link" href="#">Denim</a></li>
                                <li><a class="menu__link" href="#">T-Shirts</a></li>
                            </ul>
                        </div>
                        <div class="menu__category">
                            <h3 class="menu__heading select_text">WOMAN</h3>
                            <ul class="menu-woman">
                                <li><a class="menu__link" href="#">Accessories</a></li>
                                <li><a class="menu__link" href="#">Jackets & Coats</a></li>
                                <li><a class="menu__link" href="#">Polos</a></li>
                                <li><a class="menu__link" href="#">T-Shirts</a></li>
                                <li><a class="menu__link" href="#">Shirts</a></li>
                            </ul>
                        </div>
                        <div class="menu__category">
                            <h3 class="menu__heading select_text">KIDS</h3>
                            <ul class="kids">
                                <li><a class="menu__link" href="#">Accessories</a></li>
                                <li><a class="menu__link" href="#">Jackets & Coats</a></li>
                                <li><a class="menu__link" href="#">Polos</a></li>
                                <li><a class="menu__link" href="#">T-Shirts</a></li>
                                <li><a class="menu__link" href="#">Shirts</a></li>
                                <li><a class="menu__link" href="#">Bags</a></li>
                            </ul>
                        </div>
                    </div>
                    <label for="switch" class="butt-clouse butt-clouse">
                        <svg class="butt-clouse__img " width="18" height="18" viewBox="0 0 18 18" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path class="butt-clouse__img_theme_dark"
                                  d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"
                                  fill="#575757"/>
                        </svg>
                    </label>
                </div>
            </div>
        </div>
        <a class="header__link header__link_hidden" href="registration.html"><img src="img/account.svg"
                                                                                  alt="account"></a>
        <a @click="$root.btnCartClicked()" class="header__link header__link_hidden" href="#"><img src="img/cart.svg" alt="cart"></a>
    </div>
</header>
`
};



export default top;