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

	$('form[name="search-imdb"]').on("submit", function(e) {
	    var form = $(this);
	    var query = $("#input_search").val();
	    e.preventDefault();
	    
	    
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
	    	console.log("serach acteur");
	    	$.ajax({
		        url: "http://imdb.wemakesites.net/api/search?q="+query,
		        data: form.serialize(),
		        crossDomain: true,
		        dataType: "jsonp",
		        success: function(data) {
		            var acteurs = data.results.names;
		        }
		    });
	    	
	    }
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