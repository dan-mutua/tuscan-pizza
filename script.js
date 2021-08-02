function Pizza(size, crust) {
    this.size = size;
    this.crust = crust;
    this.toppings = [];
    this.price = 0;
}

Pizza.prototype.cost = function() {
    var price = 0;
    if(this.size == "small") {
        price += 500;
    } else if (this.size == "medium") {
        price += 750;
    } else {
        price += 1000;
    }

    for (var i = 0; i < this.toppings.length; i++) {
        price += 100;
    }
    if (this.crust == "crispy"){
        price += 150;
    }else if (this.crust == "stuffed") {
        price += 150;
    }else {
        price += 200;
    }
    this.price = price;
}

Pizza.prototype.toppingsList = function() {
    if (this.toppings.length > 0) {
        return this.toppings.join(", ");
    } else {
      return "None";
    }
}
// User Interface Logic
