var baseList = ["Vodka",
"Gin",
"Light rum",
"Brandy",
"Tequila",
"Dark rum",
"Scotch",
"Rum",
"Bourbon"];

var userList = [];
var baseIngs = [];
var suppIngs = [];

var drinkURL = "http://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
var ingURL = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

var searchCounter = 0;

function addIng() {
	var newIng = $("#input-ings").val().trim();
	userList.push(newIng);
	suppIngs.push(newIng);
	$("#ing-list").append("<p>" + newIng + "</p>");
	var isBase = baseList.includes(newIng);
	if (isBase) {baseIngs.push(newIng);}
}

$("#add-ing").on("click", function() {
	event.preventDefault();
	addIng();
	$("#input-ings").val("");
})

function needIngredients() {
	console.log("NEED MORE INGREDIENTS!");
}

function needLiqour() {
	console.log("NEED MORE LIQOUR!"); // THIS FUNCTION PRODUCES THE ERROR MESSAGE FOR WHEN THE USER'S INGREDIENTS DON'T CONTAIN ENOUGH LIQOUR
}

function noDice() {
	console.log("Sorry, we couldn't find any drinks that match your ingredients"); // THIS FUNCTION PRODUCES THE ERROR MESSAGE FOR WHEN THE INGREDIENTS ENTERED BY THE USER FULFILLS THE BASIC REQUIREMENTS OF AT LEAST 1 BASE AND 1 OTHER
}

function executeGo() {
	totalIngCheck();
}


$("#go-button").on("click", function() {
	executeGo();
});

$("#go2-button").on("click", function() {
	if (drinkAssigned) {
		getRecipe(finalDrink);
	} else {
		noDice();
	}
});

var baseDrinks = [];
var suppDrinks = [];
var sharedDrinks = [];
var necessaryIngs = [];
var eligibleDrinks = [];
var drinkAssigned = false;

function totalBaseIngCheck() {
	if (baseIngs.length < 1) {
		needLiqour();
	} else {
		beginSearchCycle();
	}
}

function totalIngCheck() {
	if (userList.length < 2) {
		needIngredients();
	} else {
		totalBaseIngCheck();
	}
}

function beginSearchCycle() {
	if (!drinkAssigned) {
		if (searchCounter == 0) {
			console.log("SEARCHCOUNTER: " + searchCounter);
			assignTargetBase();
			searchCounter++;
		} else if (userList.length > 1) {
			console.log("SEARCHCOUNTER: " + searchCounter);
			searchCounter++;
			suppIngCheck();
		} else {
			needIngredients();
		}
	}
}

function suppIngCheck() {
	suppDrinks = [];
	sharedDrinks = [];
	console.log("new suppIngCheck")
	if (suppIngs.length > 0) {
		assignTargetSupp();
	} else if (baseIngs.length > 0) {
		console.log("assigning new targetBase");
		assignTargetBase();
	} else {
		console.log("all ings searched; no matches")
	}
}

function assignTargetBase() {
	baseDrinks = [];
	if (searchCounter > 0) {
		var index = userList.indexOf(targetBase);
		if (index > -1) {
			userList.splice(index, 1);
		}
	}
	if (userList.length > 1) {
		suppIngs = userList.slice();
		if (baseIngs.length > 0) {
			var r = Math.floor((Math.random() * baseIngs.length) + 1) - 1;
			targetBase = baseIngs[r];
			var index = baseIngs.indexOf(targetBase);
			if (index > -1) {
				baseIngs.splice(index, 1);
			}
			var index = suppIngs.indexOf(targetBase);
			if (index > -1) {
				suppIngs.splice(index, 1);
			}		    
			suppDrinks = [];
			sharedDrinks = [];
			console.log("baseIngs after targetBase: " + baseIngs);
			console.log("targetBase: " + targetBase);
			console.log("suppIngs after targetBase: " + suppIngs);
			popBaseDrinks();
		}
	} else {
		console.log("userList is less than 2");
	}
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
	}).done(function() {
		assignTargetSupp();
	})
}

function assignTargetSupp() {
	console.log("on assignTargetSupp: " + suppIngs);
	var r = Math.floor((Math.random() * suppIngs.length) + 1) - 1;
	targetSupp = suppIngs[r];
	var index = suppIngs.indexOf(targetSupp);
	if (index > -1) {
		suppIngs.splice(index, 1);
		console.log("targetSupp: " + targetSupp);
	}
	popSuppDrinks();	
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
	}).done(function() {
		console.log("baseDrinks: " + baseDrinks);
		console.log("suppDrinks: " + suppDrinks);
		createSharedDrinks();
	}).done(function() {
		checkSharedDrinks();
	}).done(function() {
		setTimeout(beginSearchCycle, 2000)
	})
} 

function createSharedDrinks() {
	for (var i = 0; i < baseDrinks.length; i++) {
		var isMatch = suppDrinks.includes(baseDrinks[i]);
		if (isMatch) {
			sharedDrinks.push(baseDrinks[i]);
		} 
	}
}

function checkSharedDrinks() {
	if (sharedDrinks.length > 0) {
		for (var i = 0; i < sharedDrinks.length; i++) {
			drink = sharedDrinks[i];
			checkDrink(drink);
		}		
	} else {
		suppIngCheck();
	}
}

function assignDrink() {
	eligibleDrinks.push(drink);
	drinkAssigned = true;
	console.log(drinkAssigned, eligibleDrinks);
	successDrink();
}

function successDrink() {
	if (eligibleDrinks.length > 0) {
		var r = Math.floor((Math.random() * eligibleDrinks.length) + 1) - 1;
		finalDrink = eligibleDrinks[r];
		console.log("SUCCESS! we will make a: " + finalDrink);
		return finalDrink;
	} else {
		console.log("successDrink ERROR: no eligible drinks!!!");
	}
}

function haveIngs() {
	var counter = 0;
	var matched = 0; 
	for (var i = 0; i < necessaryIngs.length; i++) {
		counter++;
		var isMatch = userList.includes(necessaryIngs[i]);
		if (isMatch) {
			matched++;
			console.log("counter: " + counter + " " + necessaryIngs[i] + " found", " " + matched);
		} else {console.log("counter: " + counter + " " + necessaryIngs[i] + " not found");}
		if (matched == necessaryIngs.length) {
			assignDrink();
			necessaryIngs = [];
			console.log("we have all ings necessary");
		} else if (counter == necessaryIngs.length) {
			console.log("fail");
			necessaryIngs = [];
		}
	}
}

function checkDrink(drink) {
	$.ajax({
		url: drinkURL + drink,
		method: "GET"
	}).done(function(response) {
		console.log(response);
		if (typeof response.drinks[0].strIngredient1 === 'string' && response.drinks[0].strIngredient1.length > 0) {
			necessaryIngs.push(response.drinks[0].strIngredient1);
		}
		if (typeof response.drinks[0].strIngredient2 === 'string' && response.drinks[0].strIngredient2.length > 0) {
			necessaryIngs.push(response.drinks[0].strIngredient2);
		}
		if (typeof response.drinks[0].strIngredient3 === 'string' && response.drinks[0].strIngredient3.length > 0) {
			necessaryIngs.push(response.drinks[0].strIngredient3);
		}
		if (typeof response.drinks[0].strIngredient4 === 'string' && response.drinks[0].strIngredient4.length > 0) {
			necessaryIngs.push(response.drinks[0].strIngredient4);
		}
		if (typeof response.drinks[0].strIngredient5 === 'string' && response.drinks[0].strIngredient5.length > 0) {
			necessaryIngs.push(response.drinks[0].strIngredient5);
		}
		if (typeof response.drinks[0].strIngredient6 === 'string' && response.drinks[0].strIngredient6.length > 0) {
			necessaryIngs.push(response.drinks[0].strIngredient6);
		}
		if (typeof response.drinks[0].strIngredient7 === 'string' && response.drinks[0].strIngredient7.length > 0) {
			necessaryIngs.push(response.drinks[0].strIngredient7);
		}
		if (typeof response.drinks[0].strIngredient8 === 'string' && response.drinks[0].strIngredient8.length > 0) {
			necessaryIngs.push(response.drinks[0].strIngredient8);
		}
		if (typeof response.drinks[0].strIngredient9 === 'string' && response.drinks[0].strIngredient9.length > 0) {
			necessaryIngs.push(response.drinks[0].strIngredient9);
		}
		if (typeof response.drinks[0].strIngredient10 === 'string' && response.drinks[0].strIngredient10.length > 0) {
			necessaryIngs.push(response.drinks[0].strIngredient10);
		} 
		haveIngs();
	})
}

var combinedPairs = [];

function pairIM(response) {
	var pairIng = [];
	var pairMsr = [];
	if (typeof response.drinks[0].strIngredient1 === 'string' && response.drinks[0].strIngredient1.length > 0) {
		pairIng.push(response.drinks[0].strIngredient1);
	}
	if (typeof response.drinks[0].strIngredient2 === 'string' && response.drinks[0].strIngredient2.length > 0) {
		pairIng.push(response.drinks[0].strIngredient2);
	}
	if (typeof response.drinks[0].strIngredient3 === 'string' && response.drinks[0].strIngredient3.length > 0) {
		pairIng.push(response.drinks[0].strIngredient3);
	}
	if (typeof response.drinks[0].strIngredient4 === 'string' && response.drinks[0].strIngredient4.length > 0) {
		pairIng.push(response.drinks[0].strIngredient4);
	}
	if (typeof response.drinks[0].strIngredient5 === 'string' && response.drinks[0].strIngredient5.length > 0) {
		pairIng.push(response.drinks[0].strIngredient5);
	}
	if (typeof response.drinks[0].strIngredient6 === 'string' && response.drinks[0].strIngredient6.length > 0) {
		pairIng.push(response.drinks[0].strIngredient6);
	}
	if (typeof response.drinks[0].strIngredient7 === 'string' && response.drinks[0].strIngredient7.length > 0) {
		pairIng.push(response.drinks[0].strIngredient7);
	}
	if (typeof response.drinks[0].strIngredient8 === 'string' && response.drinks[0].strIngredient8.length > 0) {
		pairIng.push(response.drinks[0].strIngredient8);
	}
	if (typeof response.drinks[0].strIngredient9 === 'string' && response.drinks[0].strIngredient9.length > 0) {
		pairIng.push(response.drinks[0].strIngredient9);
	}
	if (typeof response.drinks[0].strIngredient10 === 'string' && response.drinks[0].strIngredient10.length > 0) {
		pairIng.push(response.drinks[0].strIngredient10);
	} 
	if (typeof response.drinks[0].strMeasure1 === 'string' && response.drinks[0].strMeasure1.length > 0) {
		pairMsr.push(response.drinks[0].strMeasure1);
	}
	if (typeof response.drinks[0].strMeasure2 === 'string' && response.drinks[0].strMeasure2.length > 0) {
		pairMsr.push(response.drinks[0].strMeasure2);
	}
	if (typeof response.drinks[0].strMeasure3 === 'string' && response.drinks[0].strMeasure3.length > 0) {
		pairMsr.push(response.drinks[0].strMeasure3);
	}
	if (typeof response.drinks[0].strMeasure4 === 'string' && response.drinks[0].strMeasure4.length > 0) {
		pairMsr.push(response.drinks[0].strMeasure4);
	}
	if (typeof response.drinks[0].strMeasure5 === 'string' && response.drinks[0].strMeasure5.length > 0) {
		pairMsr.push(response.drinks[0].strMeasure5);
	}
	if (typeof response.drinks[0].strMeasure6 === 'string' && response.drinks[0].strMeasure6.length > 0) {
		pairMsr.push(response.drinks[0].strMeasure6);
	}
	if (typeof response.drinks[0].strMeasure7 === 'string' && response.drinks[0].strMeasure7.length > 0) {
		pairMsr.push(response.drinks[0].strMeasure7);
	}
	if (typeof response.drinks[0].strMeasure8 === 'string' && response.drinks[0].strMeasure8.length > 0) {
		pairMsr.push(response.drinks[0].strMeasure8);
	}
	if (typeof response.drinks[0].strMeasure9 === 'string' && response.drinks[0].strMeasure9.length > 0) {
		pairMsr.push(response.drinks[0].strMeasure9);
	}
	if (typeof response.drinks[0].strMeasure10 === 'string' && response.drinks[0].strMeasure10.length > 0) {
		pairMsr.push(response.drinks[0].strMeasure10);
	} 
	for (var i = 0; i < pairIng.length; i++) {
		var msr = pairMsr[i];
		var ing = pairIng[i];
		if (typeof msr === 'string') {
			var pairMsrIng = msr + " " + ing;
			combinedPairs.push(pairMsrIng);
		} else {
			combinedPairs.push(ing);
		}
	}
}

function checkImage(response) {
	if (typeof response.drinks[0].strDrinkThumb === 'string') {
		var img = '<img src="' + response.drinks[0].strDrinkThumb + '">';
		$("#image").append(img);
	} else {console.log("no thumb");}
}

function getRecipe(finalDrink) {
	$.ajax({
		url: drinkURL + finalDrink,
		method: "GET"
	}).done(function(response){
		console.log(response.drinks[0].strInstructions);
		pairIM(response);
		console.log(combinedPairs);
		checkImage(response);
	})
}