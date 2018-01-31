// this array contains all the topics to be used as the preset buttons for querying gifs
var topics = ["elephant", "camel", "raccoon", "chipmunk", "platypus", "giraffe", "penguin", "duck", "piglet", "snake", "lamb", "goat", "llama", "alpaca", "parakeet", "parrot", "gecko"];

// generate a button for every topic in the array and append it to the page
for (i = 0; i < topics.length; i++) {
	var animalButton = $("<button>");
	animalButton.addClass("button btn btn-info");
	animalButton.attr("data-animal", topics[i]);
	animalButton.text(topics[i]);
	$("#buttonsWrapper").append(animalButton);
}

// when any animal search button is clicked... (this must target the document, otherwise dynamically created buttons will have scope problems)
$(document).on("click", ".button", function() {
   	var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
        var results = response.data;
       	// extract the relevant information from the response returned from the AJAX call and create divs and attibutes to house it
        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='gifHolder'>");
            var rating = results[i].rating.toUpperCase();
            var ratingText = $("<p>").text("Rating: " + rating);
            var animalImage = $("<img class='image'>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");
            // conditional to prevent "R" ratings from being appended to the page
            if (results[i].rating !== "r") {
            	gifDiv.append(ratingText);
            	gifDiv.append(animalImage);
            }
            $("#gifContainer").prepend(gifDiv);
        }
    });
    $("#clickToAnimate").modal('show');
    function closeModal() {
    	$("#clickToAnimate").modal('hide');
    }
    setTimeout(closeModal, 1400);
});

// when any gif –– still or moving –– is clicked...
$(document).on("click", ".image", function(event) {
	event.preventDefault();
    var state = $(this).attr("data-state");
    // check the data-state, then switch out the src and toggle the data-state
    if (state == "still") {
     	$(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
    }
    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
  	}
});

// when the "add animal" submit button on the form is clicked,
// create a new button with a data value containing the value input by the user
$(".btn-dark").on("click", function() {
	event.preventDefault();
	var val = $("#inputField").val().trim();
	// only if the value hasn't yet been input will a new button be created..
	if (topics.indexOf(val) === -1) {
		topics.push(val);
		var animalButton = $("<button>");
		animalButton.addClass("button btn btn-info");
		animalButton.attr("data-animal", val);
		animalButton.text(val);
		$("#buttonsWrapper").append(animalButton);
	}
    $("#form").trigger("reset");
});

