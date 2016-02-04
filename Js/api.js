
var filmsJSON = [];
var personnes = [];


// CallBack de recherche
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




// Recherche par id
function loadIdName(id, lvl, callbackMovie) {
 if (lvl <= 2){
 	lvl++;
	 $.ajax({
	        url: "http://imdb.wemakesites.net/api/"+id,
	        crossDomain: true,
	        dataType: "jsonp",
	        success: function(data) {
	        	
	        	
	        	films = data.data.filmography;
	        	idFilms = [];
	        	for (var i = 0; i <= 5; i++) {
	        		idMovie = films[i].info.split("/")[4];
	        		idFilms.push(idMovie);
					callbackMovie(idMovie, lvl, callBackActor, callBackDirector);
	        	}
	        	actor = jQuery.parseJSON('{"Id": "'+id+'", "Title": "'+data.data.title+'", "Image": "'+data.data.image+'", "Films":"'+idFilms+'"}');
	        	
	        	sessionStorage.setItem(id,JSON.stringify(actor)); // store data in browser storage
	        }
	    });
	}

	//console.log(personnes);
}


function loadIdMovie(id, lvl, callbackActor, callbackDirector) {
	if (lvl <= 2){
		lvl++;
		 $.ajax({
	        url: "http://www.omdbapi.com/?i="+id+"&plot=short&r=json",
	        crossDomain: true,
	        dataType: "jsonp",
	        success: function(data) {
	        	info = data;
	        	film = jQuery.parseJSON('{"Id": "'+id+'", "Title": "'+info.Title+'", "Released": "'+info.Released+'", "Runtime": "'+info.Runtime+'", "Genre": "'+info.Genre+'", "Director": "'+info.Director+'", "Actors": "'+info.Actors+'"}');
	        	
	        	// test sessionStorage
				sessionStorage.setItem(id,JSON.stringify(film)); // store data in browser storage
	        	
//	        	$("#demo").append("<div class='film' id="+id+" meta-Title="+info.Title+" meta-Released="+info.Released+", "Runtime": "'+info.Runtime+'", "Genre": "'+info.Genre+'", "Director": "'+info.Director+'", "Actors": "'+info.Actors+'">");
	        	casts = info.Actors.split(", ");
	        	$.each(casts, function(key, actor){
	        		//console.log(actor);
	        		callbackActor(actor, lvl, loadIdName);       		
		        });
	        }
	    });
	}
}

// Fonction de recherche
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