var drinkURL = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";
var ingURL = "https://www.thecocktaildb.com/api/json/v1/2345/filter.php?i=";

var ingList = [];
var totalDrinksList = [];
var dupeDrinksList = [];
var necessaryIngs = [];
var eligibleDrinks = [];
var incompleteDrinks = [];

var searchMode = "exact";

function toggleMode() {
	if (searchMode === "exact") {
		searchMode = "inexact";
		console.log(searchMode);
	} else if (searchMode === "inexact") {
		searchMode = "exact";
		console.log(searchMode);
	}
}

function addIng(textVal) {
	ingList.push(textVal);
	$("#ing-list").append("<p>" + textVal + "</p>"); // FOR FAKE DOM!!!
	console.log(ingList);
	$.ajax({
		url: ingURL + textVal,
		method: "GET"
	}).done(function(response) {
		for (var i = 0; i < response.drinks.length; i++) {
            var drinkListed = response.drinks[i].strDrink;
            totalDrinksList.push(drinkListed);
            console.log(totalDrinksList);
          }
	})
}

function goShaker() {
	popDupes();
	if (dupeDrinksList.length > 0) {
		exeSearch();
	} else {printError();}
}

function printError() {
	$('.instructions-list').text(needIngs);
}

function popDupes() {
	for (var i = 0; i < totalDrinksList.length; i++) {
		var targetDrink = totalDrinksList[i];
		var firstIndex = totalDrinksList.indexOf(targetDrink);
		var lastIndex = totalDrinksList.lastIndexOf(targetDrink);
		var checkDupes = dupeDrinksList.includes(targetDrink);
		if (!checkDupes && firstIndex !== lastIndex) {
			dupeDrinksList.push(targetDrink);
			console.log(dupeDrinksList);
		}
	}
}

function exeSearch() {
	combinedPairs = [];
	eligibleDrinks = [];
	totalnumber = dupeDrinksList.length;
	counter   = { t: 0 };
	for (exe = 0; exe < dupeDrinksList.length; exe++) {
		var targetDrink = dupeDrinksList[exe];
		checkForIngs(targetDrink);
	}
}


function searchComplete() {
	if (searchMode === "exact") {
		console.log('all calls completed. eligible drinks: ' + eligibleDrinks);
		if (eligibleDrinks.length > 0) {
			assignDrink();
			exactList();
		} else {printError();}
	} else if (searchMode === "inexact") {
		if (eligibleDrinks.length > 0) {
			assignDrink();
			inexactList();
		} else if (eligibleDrinks.length == 0 && incompleteDrinks.length > 0) {
			assignDrink();
			inexactList();
		} else {printError();}
	}
}

function exactList() {
	for (var i = 0; i < eligibleDrinks.length; i++) {
		$("#drinkList").append('<li><a><div class="listed-drink">' + eligibleDrinks[i] + '</div></a></li>');
	}
}



function inexactList() {
	for (var i = 0; i < eligibleDrinks.length; i++) {
		$("#drinkList").append('<li><a>' + eligibleDrinks[i] + '</a></li>');
	}
	for (var i = 0; i < incompleteDrinks.length; i++) {
		$("#drinkList").append('<li><a>' + incompleteDrinks[i] + '</a></li>');
	}
}

function assignDrink() {
	if (eligibleDrinks.length > 0) {
		finalDrink = eligibleDrinks[0];
		console.log("SUCCESS! we will make a: " + finalDrink);
		$("#drinkName").append(finalDrink);
		getRecipe(finalDrink);
	} else {
		var r = Math.floor((Math.random() * incompleteDrinks.length) + 1) - 1;
		finalDrink = incompleteDrinks[r];
		console.log("SUCCESS! we will make a: " + finalDrink);
		$("#drinkName").append(finalDrink);
		getRecipe(finalDrink);
	}
}


function exactIngs(targetDrink) {
	var counter = 0;
	var matched = 0; 
	for (var i = 0; i < necessaryIngs.length; i++) {
		counter++;
	    var isMatch = ingList.includes(necessaryIngs[i]);
	    if (isMatch) {
	    	matched++;
	      console.log("counter: " + counter + " " + necessaryIngs[i] + " found", " " + matched);
	    } else {console.log("counter: " + counter + " " + necessaryIngs[i] + " not found");}
	    if (matched == necessaryIngs.length) {
	    	eligibleDrinks.push(targetDrink);
	    	eligibleDrinks.sort();
	    	console.log(eligibleDrinks);
	    	necessaryIngs = [];
	    	console.log("we have all ings necessary");
	    } else if (counter == necessaryIngs.length) {
	    	console.log("fail");
	    	necessaryIngs = [];
	    }
	}
}

function inexactIngs(targetDrink) {
	var counter = 0;
	var matched = 0; 
	for (var i = 0; i < necessaryIngs.length; i++) {
		counter++;
	    var isMatch = ingList.includes(necessaryIngs[i]);
	    if (isMatch) {
	    	matched++;
	      console.log("counter: " + counter + " " + necessaryIngs[i] + " found", " " + matched);
	    } else {console.log("counter: " + counter + " " + necessaryIngs[i] + " not found");}
	    if (matched == necessaryIngs.length) {
	    	eligibleDrinks.push(targetDrink);
	    	console.log(eligibleDrinks);
	    	necessaryIngs = [];
	    	console.log("we have all ings necessary");
	    } else if (counter == necessaryIngs.length && necessaryIngs.length > 1) {
	    	incompleteDrinks.push(targetDrink);
	    	console.log(incompleteDrinks);
	    	necessaryIngs = [];
	    	console.log("we have some necessary ings");
	    } else if (counter == necessaryIngs.length && necessaryIngs.length < 2) {
	    	console.log("total fail");
	    	necessaryIngs = [];
	    }
	}
}

function checkForIngs(targetDrink) {
		var url = drinkURL + targetDrink;
		$.get(url, function(response) {
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
				if (searchMode === "exact") {
					exactIngs(response.drinks[0].strDrink);
				} else if (searchMode === "inexact") {
					inexactIngs(response.drinks[0].strDrink);
				}
		}).done(function() {
		    counter.t++;
		    if (counter.t == totalnumber) {
		         searchComplete();
		    }
  });		
}


function removeIng(textSide) {
	var index = ingList.indexOf(textSide);
	if (index > -1) {
		ingList.splice(index, 1);
	}
	$.ajax({
		url: ingURL + textSide,
		method: "GET"
	}).done(function(response) {
		for (var i = 0; i < response.drinks.length; i++) {
            var drinkListed = response.drinks[i].strDrink;
            var index = totalDrinksList.indexOf(drinkListed);
			if (index > -1) {
				totalDrinksList.splice(index, 1);
			}
            console.log(totalDrinksList);
          }
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
  	console.log(finalDrink);
    console.log(response.drinks[0].strInstructions);
    //appends instrucion to sidebar + main box
    $("#insList").append(response.drinks[0].strInstructions);
    $('.instructions-list').text(response.drinks[0].strInstructions);
    pairIM(response);
    console.log(combinedPairs);
    //appends measurements to sidebar
    for (var i = 0; i < combinedPairs.length; i++) {
    	$("#mesList").append(combinedPairs[i] + "<br>");
    }
    checkImage(response);
  })

}

function resetSearch() {
	ingList = [];
	totalDrinksList = [];
	dupeDrinksList = [];
	eligibleDrinks = [];
	finalIngredients = [];
	ingredientsCounter = 0;
	ingredients = [];
	for (var i = 0; i < ingRefresh.length; i++) {
		ingredients.push(ingRefresh[i])
	}
	$('.instructions-list').empty();
	$('.side-list').empty();
}


var needIngs = "No combination of your ingredients can make a legit drink. Go get more ingredients, particularly things made from alcohol. Then go back and add them on the ingredients tab.";

function randomDrink() {
	$.ajax({
    url: "http://www.thecocktaildb.com/api/json/v1/1/random.php",
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
    checkImage(response);
  })
}