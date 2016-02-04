
var recherche;
var info;

function loadActor(actor) {
 $.ajax({
        url: "http://imdb.wemakesites.net/api/search?q="+actor,
        crossDomain: true,
        dataType: "jsonp",
        success: function(data) {
           	recherche = data.data.results.names;
        }
    });
}

function callBackActor(actor, lvl, callBackIdName){

	actor = actor.replace(/\s/g, '');

	$.ajax({
        url: "http://imdb.wemakesites.net/api/search?q="+actor,
        crossDomain: true,
        dataType: "jsonp",
        success: function(data) {
           	urlActor = data.data.results.names[0].url;
           	idActor = urlActor.split("/")[4];
           	callBackIdName(idActor, lvl, loadIdMovie);
        }
    });
}

function callBackDirector(actor){

	actor = actor.replace(/\s/g, '');

	$.ajax({
        url: "http://imdb.wemakesites.net/api/search?q="+actor,
        crossDomain: true,
        dataType: "jsonp",
        success: function(data) {
           	urlActor = data.data.results.names[0].url;
           	idActor = urlActor.split("/");
        }
    });
}

function loadDirector(director) {
  $.ajax({
        url: "http://imdb.wemakesites.net/api/search?q="+director,
        crossDomain: true,
        dataType: "jsonp",
        success: function(data) {
            recherche = data.data.results.names;
        }
    });
}

function loadMovie(title) {
title = title.replace(/\s/g, '');
 $.ajax({
        url: "http://www.omdbapi.com/?t="+title+"&y=&plot=short&r=json",
        crossDomain: true,
        dataType: "jsonp",
        success: function(data) {
        	film = data;
        }
    });
}

function loadIdName(id, lvl, callbackMovie) {
 if (lvl < 2){
 	lvl++;
	 $.ajax({
	        url: "http://imdb.wemakesites.net/api/"+id,
	        crossDomain: true,
	        dataType: "jsonp",
	        success: function(data) {
	        	films = data.data.filmography;
	        	for (var i = 0; i <= 5; i++) {
	        		console.log(films[i].title);
	        		idMovie = films[i].info.split("/")[4];
					callbackMovie(idMovie, lvl, callBackActor, callBackDirector);
	        	}
	        }
	    });
	}
}


function loadIdMovie(id, lvl, callbackActor, callbackDirector) {
	if (lvl < 2){
		lvl++;
		 $.ajax({
	        url: "http://www.omdbapi.com/?i="+id+"&plot=short&r=json",
	        crossDomain: true,
	        dataType: "jsonp",
	        success: function(data) {
	        	info = data;
	        	casts = info.Actors.split(", ");
	        	$.each(casts, function(key, actor){
	        		console.log(actor);
	        		callbackActor(actor, lvl, loadIdName);        		
		        });
	        }
	    });
	}
}