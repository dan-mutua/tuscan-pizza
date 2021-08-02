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
// User Interface 
$(document).ready(function() {
    var total = 0;
    $(".total-cart").text(total);
    $(".pform").submit(function(event) {
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
            $("#showww").show();
            $(".size").text(newPizza.size);
            $(".crust").text(newPizza.crust);
            $(".toppings").text(newPizza.toppingsList());
            $(".cost").text(newPizza.price);
        });
        $("#pform")[0].reset();
    });

    $("button#checkout").click(function() {
        $("#showww").hide();
        $(".pd").show();
    });

    $("button#pickup").click(function() {
        $(".pd").hide();
        $(".pickup").show();
    });

    $("button#bpickup").click(function(event) {
        event.preventDefault();
        var userName = $("input#pickN").val();
        $("form#pForm").hide();
        $(".cartP").hide();
        $("form#pizza").hide();
        var myModal = new bootstrap.Modal(document.getElementById('modal'), {backdrop: true});
        var message =("Ciao " +userName +", thank you for ordering your pizza with us your order will be ready soon for pickup.");
        console.log(message)
        if (userName){
            $("#modal-body").html(message);
            $("#modalLabel").html();
            myModal.show();
        } else {
            $("#modal-body").html("input your name");
            $("#modalLabel").html("Invalid input!");
             myModal.show();
        }
    });
        
    $("button#delivery").click(function() {
        total += 300;
        $(".total-cart").text(total);
        $(".pd").hide();
        $(".delivery").show();
    });

    $("button#submitDelivery").click(function(event) {
        event.preventDefault();
        var userName = $("input#yourdelivery").val();
        var address = $("input#address").val();
        $(".cartP").hide();
        $("form#pform").hide();
        $("form#form").hide();
        var myModal = new bootstrap.Modal(document.getElementById('modal'), {backdrop: true});
        var message = ("Ciao " + userName + " your pizza will be delivered soon in " + address)
        console.log();
        if (userName && address){
            console.log(message)
            $("#modal-body").html(message);
            $("#modalLabel").html();
            myModal.show();
        } else {
            $("#modal-body").html("we need your name and address");
            $("#modalLabel").html("Invalid input!");
             myModal.show();
        }
    });
});

