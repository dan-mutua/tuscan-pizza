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
$(document).ready(function() {
    var total = 0;
    $(".total-cart").text(total);
    $(".pizzaForm").submit(function(event) {
        event.preventDefault();
        var crust = $("#crust").val();
        var size = $("#size").val();
        var newPizza = new Pizza(size, crust);

        $("input:checkbox[name=topping]:checked").each(function() {
            var toppingChoice = $(this).val();
            newPizza.toppings.push(toppingChoice);
        });

        newPizza.cost();
        total += newPizza.price;

        $(".total-cart").text(total);
        $(".cartP").show();;
        $("#cartHeader").show();
        $("ol#cart").append("<li><span class='cartItem'>" + newPizza.size + " " + newPizza.crust + " Pizza" + "</span></li>");

        $(".cartItem").last().click(function() {
            $("#show-pizza").show();
            $(".size").text(newPizza.size);
            $(".crust").text(newPizza.crust);
            $(".toppings").text(newPizza.toppingsList());
            $(".cost").text(newPizza.price);
        });
        $("#pizzaForm")[0].reset();
    });

    $("button#checkout").click(function() {
        $("#show-pizza").hide();
        $(".pd").show();
    });

    $("button#pickup").click(function() {
        $(".pd").hide();
        $(".pickup").show();
    });

    $("button#button-pickup").click(function(event) {
        event.preventDefault();
        var userName = $("input#pickupName").val();
        // $(".name-input").text(userName);
        $("form#pickupForm").hide();
        $(".cartP").hide();
        $("form#pizza").hide();
        var myModal = new bootstrap.Modal(document.getElementById('modal'), {backdrop: true});
        if (userName){
            $("#modal-body").html(" Hello " + userName + ", Ciao thank you for ordering your pizza with us .your order will be ready soon.");
            $("#modalLabel").html("Your Order has been successfully confirmed.");
            myModal.show();
        } else {
            $("#modal-body").html("Please enter your name!!");
            $("#modalLabel").html("Invalid input!");
             myModal.show();
        }
    });

    $("button#delivery").click(function() {
        total += 300;
        $(".total-cart").text(total);
        $(".pd").hide();
        $(".deliveryNow").show();
    });

    $("button#submitDeliveryForm").click(function(event) {
        event.preventDefault();
        var userName = $("input#deliveryName").val();
        var address = $("input#address").val();
        $(".cartP").hide();
        $("form#pizzaForm").hide();
        $("form#deliveryForm").hide();
        var myModal = new bootstrap.Modal(document.getElementById('modal'), {backdrop: true});
        var message = ("Ciao " + userName + " your pizza will be delivered soon")
        if (userName && address){
            console.log(message)
            $("#modal-body").html();
            $("#modalLabel").html();
            myModal.show();
        } else {
            $("#modal-body").html("Please enter your name and address!!");
            $("#modalLabel").html("Invalid input!");
             myModal.show();
        }
    });
});

