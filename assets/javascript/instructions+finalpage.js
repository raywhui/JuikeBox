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

    //splits instructions
    var instructionSplit = response.drinks[0].strInstructions.split('.');
    console.log('STEPS:', instructionSplit);
    
    
    //appends instrucion to sidebar + main box
    $('.instructions-list').append('<li>'+ instructionSplit[0] + '</li>');

    var j = 1;

    $('.next-step').on('click',function(){
        $('.instructions-list').append('<li>'+ instructionSplit[j] + '</li>');
        j++;
        console.log(j);
        if (instructionSplit.length-1 === j){
          $('.next-step').css('display','none');
        }
    });

    pairIM(response);
    // console.log(combinedPairs);
    //appends measurements to sidebar
    console.log(combinedPairs);

    for (var i=0; i < combinedPairs.length; i++){
      $(".measurements-side-list").append('<li>'+ combinedPairs[i]+'</li>');
    };

    console.log("eyyeyey");
    checkImage(response);

  })

}
