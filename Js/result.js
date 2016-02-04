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

$("#clear").click(function(){
	sessionStorage.clear();
});

function matchIdAndNameActor(){

	// Pour chaque film
	$.each(sessionStorage, function(idMovie, movie){
		if (idMovie.substring(0,2) == "tt"){
			movie = jQuery.parseJSON(movie);
			actors = movie.Actors.split(", ");
			$.each(actors, function(key, actor){

				// Pour chaque acteur
				$.each(sessionStorage, function(idActor, actorSess){
					console.log(idActor);
					if (idActor.substring(0,2) == "nm"){
						actorSess = jQuery.parseJSON(actorSess);
						if (actor == actorSess.Title){
							actors[key] = actorSess.Id;
							movie.Actors = actors;
							sessionStorage.setItem(idMovie, JSON.stringify(movie));
						}
					}
				});
			});
		}
		console.log(movie);
	});	

}