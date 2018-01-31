var topics = ["elephant", "camel", "raccoon", "chipmunk", "platypus", "giraffe", "penguin", "duck", "piglet", "snake", "lamb", "goat", "llama", "alpaca", "parakeet", "parrot", "gecko"];

// use q ,  limit ,   and   rating   in querying the API


for (i = 0; i < topics.length; i++) {
	var animalButton = $("<button>");
	animalButton.addClass("button btn btn-info");
	animalButton.attr("data-animal", topics[i]);
	animalButton.text(topics[i]);
	$("#buttonsWrapper").append(animalButton);
}


$(document).on("click", ".button", function() {
   	var animal = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(animal);
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='gifHolder'>");
            var rating = results[i].rating.toUpperCase();
            var ratingText = $("<p>").text("Rating: " + rating);
            var animalImage = $("<img class='image'>");

            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr("data-still", results[i].images.fixed_height_still.url);
            animalImage.attr("data-animate", results[i].images.fixed_height.url);
            animalImage.attr("data-state", "still");

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

$(document).on("click", ".image", function(event) {
	event.preventDefault();
	console.log($(this).attr("data-state"));
    var state = $(this).attr("data-state");
    if (state == "still") {
    	console.log($(this).attr("data-state"));
     	$(this).attr("data-state", "animate");
        $(this).attr("src", $(this).attr("data-animate"));
		console.log($(this).attr("data-state"));

    }
    else if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

        console.log($(this).attr("data-state"));
  	}

});

$(".btn-dark").on("click", function() {
	event.preventDefault();
	var val = $("#inputField").val().trim();
	if (topics.indexOf(val) === -1) {
		topics.push(val);
		var animalButton = $("<button>");
		animalButton.addClass("button btn btn-info");
		animalButton.attr("data-animal", val);
		animalButton.text(val);
		$("#buttonsWrapper").append(animalButton);
	}

});

