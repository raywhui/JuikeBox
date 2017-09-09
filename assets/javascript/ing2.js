var baseList = ["Vodka",
"Gin",
"Light rum",
"Brandy",
"Tequila",
"Dark rum",
"Scotch",
"Rum",
"Bourbon",
"Peach schnapps",
"151 proof rum",
"Southern Comfort",
"Blended whiskey",
"Absolut Vodka",
"Jack Daniels",
"Wild Turkey",
"Crown Royal",
"Irish whiskey",
"Añejo rum",
"Whiskey",
"Johnnie Walker",
"Jim Beam",
"Gold tequila",
"Rye whiskey",
"Whisky"];

var userList = [];
var baseIngs = [];
var suppIngs = [];

var drinkURL = "http://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
var ingURL = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

function addIng() {
	var newIng = $("#input-ings").val().trim();
	userList.push(newIng);
	suppIngs = userList;
	$("#ing-list").append("<p>" + newIng + "</p>");
	var isBase = baseList.includes(newIng);
	if (isBase) {baseIngs.push(newIng);}
}

$("#add-ing").on("click", function() {
	addIng();
	$("#input-ings").val("");
	console.log("baseIngs: " + baseIngs, "suppIngs: " + suppIngs);
})

var baseDrinks = [];
var suppDrinks = [];
var sharedDrinks = [];

function go() {
	assignTargetBase();
	console.log(targetBase, baseIngs, suppIngs);
	popBaseDrinks();
	assignTargetSupp();
	popSuppDrinks();
}

function assignTargetBase() {
	var r = Math.floor((Math.random() * baseIngs.length) + 1) - 1;
	targetBase = baseIngs[r];
	var index = baseIngs.indexOf(targetBase);
  	if (index > -1) {
    baseIngs.splice(index, 1);}
    var index = suppIngs.indexOf(targetBase);
  	if (index > -1) {
    suppIngs.splice(index, 1);}
}

function popBaseDrinks() {
	$.ajax({
		url: ingURL + targetBase,
		method: "GET"
	}).done(function(response) {
		for (var i = 0; i < response.drinks.length; i++) {
            var drinkListed = response.drinks[i].strDrink;
            baseDrinks.push(drinkListed);
          }
        console.log("baseDrinks: " + baseDrinks);
	})
}

function popSuppDrinks() {
	$.ajax({
		url: ingURL + targetSupp,
		method: "GET"
	}).done(function(response) {
		for (var i = 0; i < response.drinks.length; i++) {
            var drinkListed = response.drinks[i].strDrink;
            suppDrinks.push(drinkListed);
          }
        console.log("suppDrinks: " + suppDrinks);
	})
} 

function assignTargetSupp() {
	var r = Math.floor((Math.random() * suppIngs.length) + 1) - 1;
	targetSupp = suppIngs[r];
	var index = suppIngs.indexOf(targetSupp);
  	if (index > -1) {
    suppIngs.splice(index, 1);}
    console.log("targetBase: " + targetBase, "targetSupp: " + targetSupp, "suppIngs: " + suppIngs);
}

function createSharedDrinks() {
	console.log("baseDrinks: " + baseDrinks, "suppDrinks: " + suppDrinks);
	for (var i = 0; i < baseDrinks.length; i++) {
	    var isMatch = suppDrinks.includes(baseDrinks[i]);
	    if (isMatch) {
	      sharedDrinks.push(baseDrinks[i]);
	    } else {console.log("no");}
	}
	console.log(sharedDrinks);
}

$("#go-button").on("click", function() {
	go();
})

$("#go2-button").on("click", function() {
	createSharedDrinks();
})