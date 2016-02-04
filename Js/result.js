$("form.search-imdb").submit( function(){
	var film = $("#film_search").val();
	var personne = $("#name_search").val();

	if (film){
		console.log(film);
		$.ajax({
	        url: "http://www.omdbapi.com/?t="+film+"&y=&plot=short&r=json",
	        crossDomain: true,
	        dataType: "jsonp",
	        success: function(data) {
	        	console.log(data);
	        }
	    });
	} else if (personne) {
		$.ajax({
	        url: "http://www.omdbapi.com/?t="+personne+"&y=&plot=short&r=json",
	        crossDomain: true,
	        dataType: "jsonp",
	        success: function(data) {
	        	console.log(data);
	        }
	    });
	}
});