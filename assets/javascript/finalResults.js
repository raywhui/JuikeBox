function successDrink() {
    if (eligibleDrinks.length > 0) {
        var r = Math.floor((Math.random() * eligibleDrinks.length) + 1) - 1;
        finalDrink = eligibleDrinks[r];
        console.log("SUCCESS! we will make a: " + finalDrink);
        $("#drinkName").append(finalDrink);
        getRecipe(finalDrink);
    } else {
        console.log("successDrink: no eligible drinks!!!");
        $("#drinkName").append("No Eligible Drink :[");
    }