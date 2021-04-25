'use strict'

class CalcBurger {
    constructor(userSettings) {
        this.paramSize = null;
        this.paramStuf = null;
        this.paramTopping = [];


        this.settings = {
            selectorTotalPrise: '.total-price',
            selectorTotalCal: '.total-cal',
            nameCaseSize: 'size',
            nameCaseStuffing: 'stuffing',
            nameCaseToppings: 'toppings',
        }
        this.totalPrise = null;
        this.totalCal = null;
        this.caseSize = null;
        this.caseStuffing = null;
        this.caseToppings = null;

        this.init(userSettings)
        this.getData();
    }

    init(userSettings){

        Object.assign(this.settings, userSettings);

        this.totalPrise = document.querySelector(`${this.settings.selectorTotalPrise}`);
        this.totalCal = document.querySelector(`${this.settings.selectorTotalCal}`);
        this.caseSize = this.settings.nameCaseSize;
        this.caseStuffing = this.settings.nameCaseStuffing;
        this.caseToppings = this.settings.nameCaseToppings;
    }

    getData(){
        const radios = document.querySelectorAll('input')
        for (const elem of radios) {
            elem.addEventListener('click',  () => {
                switch (elem.name) {
                    case this.caseSize: this.paramSize = elem.id;
                    break;
                    case this.caseStuffing: this.paramStuf = elem.id;
                    break;
                    case this.caseToppings: if(elem.checked) {
                        this.paramTopping.push(elem.id);
                    } else this.paramTopping.splice(this.paramTopping.indexOf(elem.id),1);
                }
                this.canCalculate()
            })
        }
    }

    canCalculate(){
        if (!(this.paramStuf && this.paramSize)) return;
        this.makeCalculation(this.paramSize, this.paramStuf, this.paramTopping[0], this.paramTopping[1]);
    }

    makeCalculation(size, stuf, topping1, topping2){
        const totalPrice = hamburger.getPrice(size) + hamburger.getPrice(stuf) + hamburger.getPrice(topping1) + hamburger.getPrice(topping2);
        this.totalPrise.innerHTML = totalPrice;
        const totalCal = hamburger.getCal(size) + hamburger.getCal(stuf) + hamburger.getCal(topping1) + hamburger.getCal(topping2);
        this.totalCal.innerHTML = totalCal;
    }
}

class Hamburger {

    constructor(paramPrice, paramCalories) {
        this.price = paramPrice;
        this.calories = paramCalories;
    }

    getPrice(param){
        if (!param) return 0;
        return this.price[`${param}`];
    }

    getCal(param){
        if (!param) return 0;
        return this.calories[`${param}`];
    }

}

const hamburger = new Hamburger({s: 50, l: 100, cheese: 10, salad: 20, potato: 15, spices: 15, mayo: 20},
    {s: 20, l: 40, cheese: 20, salad: 5, potato: 10, spices: 0, mayo: 5});
new CalcBurger();

