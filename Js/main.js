$(".search_btn").hover(
		
	function () {
		$(this).removeClass("red");
		$(this).addClass("transparent");
	}, function() {
		$(this).removeClass("transparent");
		$(this).addClass("red");
	}
		
);

$(document).ready(function() {

	$('form[name="search-imdb"]').submit(function(e){
	    var form = $(this);
	    var query = $("#film_search").val();
	    
	    
	    /* if dropdown */
	    var dropdown = $(".dropdown").val();
	    if (dropdown == "Film") {
	    	$.ajax({
		        url: "http://www.omdbapi.com/?t="+query+"&plot=short&r=json",
		        crossDomain: true,
		        dataType: "jsonp",
		        success: function(data) {
		        	loadIdMovie(data.imdbID, 0,  callBackActor, callBackDirector);
		        }
		    });
	    }
	    else {
	    	query = query.replace(/\s/g, '');
	    	console.log("serach acteur");
	    	$.ajax({
		        url: "http://imdb.wemakesites.net/api/search?q="+query,
		        data: form.serialize(),
		        crossDomain: true,
		        dataType: "jsonp",
		        success: function(data) {
		            var acteurs = data.data.results.names;
		            console.log(acteurs);
		            
		            $( ".actor_name" ).each(function( index ) {
		        		$(this).html(acteurs[0].title);
		        		acteurs.shift();
		        	});
		        }
		    });
	    	
	    }

	    e.preventDefault();
	});
	
	$(".dropdown").change(function() {
		var val = $(this).val();
		val = val.toLowerCase();
		$(".input_container input").attr("placeholder", "Entrez un "+val);
	});
	
	$('#slides').superslides(
			{'animation': 'fade',
			'animation_speed': 3500
			}
	);
	
	$(window).trigger('resize').trigger('scroll'); /* refresh sizing */
	
	
	
});