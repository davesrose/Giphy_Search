
if (navigator.userAgent.match(/(iPod|iPhone|iPad)/i)) {
	$("#style").attr("href","assets/css/styleIOS.css")
} else {
	$("#style").attr("href","assets/css/style.css")
}
$(document).ready(function() {

	//setting topics string
	var j;
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
		"James T Kirk",
		"Klingons",
		"Star Trek Quark"

	], j;

	//function for generating buttons from the topics array
	function displayButtons() {

		$(".buttons").empty();  //empty any previously generated buttons

		var btnName = []  //creating btnName array to rename complex search terms to simpler button names
		for(j = 0; j < topics.length; j++) {
			btnName[j] = topics[j] //setting btnNames to same value as topics values
			//creating if statements to change btnNames
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
			if (topics[12] === "Star Trek Quark") {
				btnName[12] = "Quark"
			}
			var showButtons = $('<div class="btn"><button class="btn-gif" data-subject="' + topics[j] + '"><span>' + btnName[j] + '</span></button></div>');  //creating container divs for buttons that have topics search variable and visible labels as btnName
			$('.buttons').append(showButtons);  //append each button
		}
		$('.buttons').append('<div style="clear: both;"></div>'); //clear CSS float left property

	}
	displayButtons(); //initially run to display topics array

	//an initial function for displaying Star Trek gifs when the page loads
	function initialThumbs() {
		var queryUrl = ('https://api.giphy.com/v1/gifs/search?q=star+trek&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC');
		console.log(queryUrl);
		$.ajax({url: queryUrl, method: 'GET'})
		.done(function(response) {
			console.log(response);

			for(var i = 0; i < response.data.length; i++) {
				var rating = response.data[i].rating.toUpperCase();  //giphys ratings are lowercase by default, so I changed them to uppercase
				var stillImage = response.data[i].images.original_still.url;  //getting the still gif link
				var animatedImage = response.data[i].images.original.url;  //getting the original animated gif link

				$('.gifs').append($('<div class="gif"><img class="gif-thumb" alt="" src="' +  //src is initially still url
					stillImage 
					+ '" data-state="still" data-animate="' + //setting initial data-state to still and store an animated and still data value
					animatedImage
					+ '" data-still="' + 
					stillImage
					+ '" /><p>rating: ' + rating + '</p></div>'));  //putting rating at bottom of image
			}
			$('.gifs').append('<div style="clear: both;"></div>');  //clear CSS float left property
			//$('.gif-thumb').on('click', gifClick);  // run gifClick when gif image is clicked on
		})

	}
	initialThumbs(); //initially run initialThumbs so that page isn't blank when first loaded

	//function for displaying giffs when button is pressed
	function displayThumbs(event) {
		$(".gifs").empty();  //clear previous gifs
		var btnTopic = $(this).attr("data-subject");  //setting btnTopic variable as button's data-subject attribute
		//creating if statement to pass search value as btnTopic if function being run through search, and display the search gifs at the same time
		if ($("#input-gif").val() === "") {
			btnTopic = $(this).attr("data-subject");  //value stays the same if search field is empty
		} else {
			btnTopic = $("#input-gif").val().trim();  //value is the search value if posted
		}
		var queryUrl = ('https://api.giphy.com/v1/gifs/search?q=' + btnTopic + '&limit=10&rating=pg-13&api_key=dc6zaTOxFJmzC');  //adding topic to search string
		console.log(queryUrl);
		$.ajax({url: queryUrl, method: 'GET'})
		.done(function(response) {
			console.log(response);

			for(var i = 0; i < response.data.length; i++) {
				var rating = response.data[i].rating.toUpperCase();  //giphys ratings are lowercase by default, so I changed them to uppercase
				var stillImage = response.data[i].images.original_still.url;  //getting the still gif link
				var animatedImage = response.data[i].images.original.url  //getting the original animated gif link

				$('.gifs').append($('<div class="gif"><img class="gif-thumb" alt="" src="' +  //src is initially still url 
					stillImage 
					+ '" data-state="still" data-animate="' + //setting initial data-state to still and store an animated and still data value 
					animatedImage
					+ '" data-still="' + 
					stillImage
					+ '" /><p>rating: ' + rating + '</p></div>'));  //putting rating at bottom of image
			}
			$('.gifs').append('<div style="clear: both;"></div>');  //clear CSS float left property
			//$('.gif-thumb').on('click', gifClick);  // run gifClick when gif image is clicked on
		})

	}

	//search function
    $("#add-gif").on("click", function(event) {
    	event.preventDefault();
    	var topic = $("#input-gif").val().trim();  //setting search value as topic variable
        if (topic !== "") {
        	topics.push(topic);  //push topic variable into topics array
        	jQuery.unique(topics);  //jQuery method for removing duplicates from the topics array
	        displayButtons();  //run displayButtons function to refresh buttons
	        displayThumbs();  //run displayThumbs function to refresh GIF display
			$("#input-gif").val('');  //return search field to empty
    	} else {
    		return topic;
    	}
		
    });
    $('.gif-thumb').css('cursor','pointer'); //hack for iOS click events, but I'm finding click events still don't happen on right hand CSS columns on iOS devices.
	$(document).on("click", ".gif-thumb", function(event) {  //function for animating gif when clicked
		event.preventDefault();
		var state = $(this).attr("data-state");  //creating variable for gif's data-state
		if (state === "still") {  //if state is static, will animate
			$(this).attr("src", $(this).data("animate")); //pass image's src with data-animate url
			$(this).attr("data-state", "animate"); //set data-state to animate
		} else {
			$(this).attr("src", $(this).data("still"));  //pass image's src with data-still url
			$(this).attr("data-state", "still");  //set data-state to still
		}
	});

	$(document).on("click", ".btn-gif", displayThumbs); //when page is loaded, goto displayThumbs function when button is pressed


});