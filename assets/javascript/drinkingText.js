console.log('drinkingText Connected');
var ingredients = [
	"Vodka",
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
	"Apple brandy",
	"Añejo rum",
	"Whiskey",
	"Johnnie Walker",
	"Jim Beam",
	"Gold tequila",
	"Rye whiskey",
	"Whisky",
	"Sugar",
	"Orange juice",
	"Light rum",
	"Lemon juice",
	"Amaretto",
	"Triple sec",
	"Lemon",
	"Kahlua",
	"Water",
	"Coffee",
	"Grenadine",
	"Dry Vermouth",
	"Lime",
	"Lime juice",
	"Ice",
	"Milk",
	"Sweet Vermouth",
	"Pineapple juice",
	"Dark rum",
	"Scotch",
	"Rum",
	"Bourbon",
	"Cranberry juice",
	"Apricot brandy",
	"Creme de Cacao",
	"Blue Curacao",
	"Red wine",
	"Sambuca",
	"Peach schnapps",
	"Ginger ale",
	"Yoghurt",
	"Lemonade",
	"151 proof rum",
	"Southern Comfort",
	"Blended whiskey",
	"Bitters",
	"Galliano",
	"Lemon peel",
	"Apple juice",
	"Soda water",
	"Sugar syrup",
	"Absolut Citron",
	"Midori melon liqueur",
	"Grand Marnier",
	"Orange bitters",
	"Champagne",
	"Banana",
	"Malibu rum",
	"Chambord raspberry liqueur",
	"Coca-Cola",
	"Benedictine",
	"Tea",
	"Cherry brandy",
	"Grapefruit juice",
	"Lager",
	"Jägermeister",
	"Goldschlager",
	"Egg",
	"Sherry",
	"White Creme de Menthe",
	"Sweet and sour",
	"Sloe gin",
	"Ginger",
	"Strawberries",
	"Cocoa powder",
	"Chocolate",
	"Cider",
	"Cointreau",
	"Mint",
	"Salt",
	"Carbonated water",
	"Port",
	"Brown sugar",
	"Cream",
	"Pineapple",
	"Orange",
	"Tomato juice",
	"Honey",
	"Everclear",
	"Beer",
	"Frangelico",
	"Creme de Cassis",
	"Crown Royal",
	"Sour mix",
	"Root beer",
	"Campari",
	"Club soda",
	"Strawberry schnapps",
	"Coffee liqueur",
	"Cachaca",
	"Blackberry brandy",
	"Irish whiskey",
	"Cognac",
	"Green Creme de Menthe",
	"Vanilla ice-cream",
	"Chocolate syrup",
	"Heavy cream",
	"Spiced rum",
	"Condensed milk",
	"Kool-Aid",
	"Peach nectar",
	"Bacardi Limon",
	"Absolut Kurant",
	"Sprite",
	"7-Up",
	"Tabasco sauce",
	"Corona",
	"Chocolate ice-cream",
	"Angostura bitters",
	"Lemon-lime soda",
	"Applejack",
	"Apple brandy",
	"Añejo rum",
	"Yellow Chartreuse",
	"Anis",
	"Anisette",
	"Passion fruit juice",
	"Banana liqueur",
	"Whiskey",
	"Creme de Banane",
	"Strawberry liqueur",
	"Egg yolk",
	"Coconut liqueur",
	"Grape juice",
	"Apple cider",
	"Mango",
	"Peach Vodka",
	"Ouzo",
	"Angelica root",
	"Half-and-half",
	"Drambuie",
	"White rum",
	"Pisco",
	"Irish cream",
	"Peachtree schnapps",
	"Tia maria",
	"Grain alcohol",
	"Pisang Ambon",
	"Zima",
	"Fruit punch",
	"Advocaat",
	"Mountain Dew",
	"Jim Beam",
	"Iced tea",
	"Hot Damn",
	"Guinness stout",
	"Godiva liqueur",
	"Schweppes Russchian",
	"Lemon vodka",
	"Apple schnapps",
	"Coffee brandy",
	"demerara Sugar",
	"Dubonnet Rouge",
	"Gold tequila",
	"Kummel",
	"Peach brandy",
	"Peppermint schnapps",
	"Rye whiskey",
	"Ricard",
	"Lime juice cordial",
	"Berries",
	"Cranberries",
	"Cantaloupe",
	"Grapes",
	"Kiwi",
	"Espresso",
	"Apple",
	"Carbonated soft drink",
	"Cloves",
	"Almond",
	"Pink lemonade",
	"Sherbet",
	"Firewater",
	"Yukon Jack",
	"Butterscotch schnapps",
	"Ale",
	"Chocolate liqueur",
	"Tropicana",
	"Rumple Minze",
	"Limeade",
	"Lime vodka",
	"Cardamom",
	"Orange Curacao",
	"Curacao",
	"Cherry Heering",
	"Vermouth",
	"Orange peel",
	"Apfelkorn",
	"Green Chartreuse",
	"Coconut rum",
	"Black Sambuca",
	"Vanilla vodka",
	"Absolut Peppar",
	"Kiwi liqueur",
	"Jello",
	"Blueberry schnapps",
	"Maui",
	"Tennessee whiskey",
	"Cream of coconut",
	"Fruit juice",
	"Cranberry vodka",
	"Aquavit",
	"Dark Creme de Cacao",
	"Absinthe",
	"Baileys irish cream",
	"Raspberry vodka"];

var baseList = ["Vodka",
	"Gin",
	"Light rum",
	"Brandy",
	"Tequila",
	"Dark rum",
	"Scotch",
	"Rum",
	"Bourbon",];

var userList = [];
var baseIngs = [];
var suppIngs = [];

var drinkURL = "http://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
var ingURL = "http://www.thecocktaildb.com/api/json/v1/1/filter.php?i=";

var searchCounter = 0;

function addIng(textVal) {
	userList.push(textVal);
	suppIngs.push(textVal);
	var isBase = baseList.includes(textVal);
	if (isBase) {baseIngs.push(textVal);}
	console.log(userList, suppIngs, baseIngs);
}

function removeIng(textSide) {
	console.log(userList, suppIngs, baseIngs);
	var index = baseIngs.indexOf(textSide);
	if (index > -1) {
		baseIngs.splice(index, 1);
	}
	var index = suppIngs.indexOf(textSide);
	if (index > -1) {
		suppIngs.splice(index, 1);
	}
	var index = userList.indexOf(textSide);
	if (index > -1) {
		userList.splice(index, 1);
	}
	console.log(userList, suppIngs, baseIngs);
}

function needIngredients() {
	console.log("NEED MORE INGREDIENTS!");
}

function needLiqour() {
	console.log("NEED MORE LIQOUR!");
}

function executeGo() {
	totalIngCheck();
}

var baseDrinks = [];
var suppDrinks = [];
var sharedDrinks = [];
var suppDrinksPopped = false;
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
		console.log("suppIngs before targetBase: " + suppIngs);
		console.log("baseIngs before targetBase: " + baseIngs);
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
    	console.log("suppIng: " + suppIngs, " targetSupp: " + targetSupp);
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
		$("#drinkName").append(finalDrink);
		getRecipe(finalDrink);
	} else {
		console.log("successDrink: no eligible drinks!!!");
		$("#drinkName").append("No Eligible Drink :[");
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
		console.log(response.drinks[0].strDrinkThumb);
		var img = '<img src="' + response.drinks[0].strDrinkThumb + '">';
		$("#drinkImg").append(img);
	} else {console.log("no thumb");}
}

function getRecipe(finalDrink) {
	$.ajax({
    url: drinkURL + finalDrink,
    method: "GET"
  }).done(function(response){
    console.log(response.drinks[0].strInstructions);
    //appends instrucion to sidebar + main box
    $("#insList").append(response.drinks[0].strInstructions);
    $('.instructions-list').text(response.drinks[0].strInstructions);
    pairIM(response);
    console.log(combinedPairs);
    //appends measurements to sidebar
    $("#mesList").append(combinedPairs.join(", "));
    console.log("eyyeyey");
    checkImage(response);

   



  })

}


