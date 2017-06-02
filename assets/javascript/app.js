$(document).ready(function() {

	var topics = [
		"Star Trek",
		"leonard mccoy Im a doctor",
		"star trek data",
		"star trek bloopers",
		"star trek worf",
		"Picard",
		"Star Trek Wesley Crusher",
		"kirk wrath khan",
		"Spock",
		"Star Trek Q",
		"Jim Kirk"

	];

	function displayButtons() {
		$(".buttons").empty();
		var btnName = []
		for(j = 0; j < topics.length; j++) {
			btnName[j] = topics[j]
			if (topics[1] === "leonard mccoy Im a doctor") {
				btnName[1] = "Bones"
			}
			if (topics[2] === "star trek data") {
				btnName[2] = "Data"
			}
			if (topics[3] === "star trek bloopers") {
				btnName[3] = "Bloopers"
			}
			if (topics[4] === "star trek worf") {
				btnName[4] = "Worf"
			}
			if (topics[6] === "Star Trek Wesley Crusher") {
				btnName[6] = "Wesley Crusher"
			}
			if (topics[7] === "kirk wrath khan") {
				btnName[7] = "Kahn!"
			}
			if (topics[9] === "Star Trek Q") {
				btnName[9] = "Q"
			}
			var showButtons = $('<div class="btn"><button class="btn-gif" data-subject="' + topics[j] + '"><span>' + btnName[j] + '</span></button></div>');
			$('.buttons').append(showButtons);
		}
		$('.buttons').append('<div style="clear: both;"></div>');

	}

	function initialThumbs() {
		var queryUrl = ('https://api.giphy.com/v1/gifs/search?q=star trek&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC');
		console.log(queryUrl);
		$.ajax({url: queryUrl, method: 'GET'})
		.done(function(response) {
			console.log(response);

			for(var i = 0; i < response.data.length; i++) {
				var rating = response.data[i].rating.toUpperCase();
				var stillImage = response.data[i].images.original_still.url;
				var animatedImage = response.data[i].images.original.url;

				$('.gifs').append($('<div class="gif"><img class="gif-thumb" alt="" src="' + 
					stillImage 
					+ '" data-state="still" data-animate="' + 
					animatedImage
					+ '" data-still="' + 
					stillImage
					+ '" /><p>' + rating + '</p></div>'));
			}
			$('.gifs').append('<div style="clear: both;"></div>');
			$('.gif-thumb').on('click', gifClick); // end img on click
		})

	}
	initialThumbs();

	function displayThumbs(event) {
		$(".gifs").empty();
		var btnTopic = $(this).attr("data-subject");
		console.log(btnTopic)
		var queryUrl = ('https://api.giphy.com/v1/gifs/search?q=' + btnTopic + '&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC');
		console.log(queryUrl);
		$.ajax({url: queryUrl, method: 'GET'})
		.done(function(response) {
			console.log(response);

			for(var i = 0; i < response.data.length; i++) {
				var rating = response.data[i].rating.toUpperCase();
				var stillImage = response.data[i].images.original_still.url;
				var animatedImage = response.data[i].images.original.url

				$('.gifs').append($('<div class="gif"><img class="gif-thumb" alt="" src="' + 
					stillImage 
					+ '" data-state="still" data-animate="' + 
					animatedImage
					+ '" data-still="' + 
					stillImage
					+ '" /><p>' + rating + '</p></div>'));
			}
			$('.gifs').append('<div style="clear: both;"></div>');
			$('.gif-thumb').on('click', gifClick); // end img on click
		})

	}

    $("#add-gif").on("click", function(event) {
    	event.preventDefault();
        var topic = $("#input-gif").val().trim();
        if (topic !== "") {
	        console.log(topic);
	        topics.push(topic);
	        // console.log(topics)
	        displayButtons();
    	} else {
    		return topic;
    	}
    });

	displayButtons();

	function gifClick(event) {
		var state = $(event.target).attr('data-state');
		if (state === "still") {
			$(event.target).attr('src', $(event.target).data('animate'));
			$(event.target).attr('data-state', 'animate');
		} else {
			$(event.target).attr('src', $(event.target).data('still'));
			$(event.target).attr('data-state', 'still');
		}
	}

	$(document).on("click", ".btn-gif", displayThumbs);


});