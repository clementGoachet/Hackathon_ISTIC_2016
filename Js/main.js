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

	$(".pointer").hide();

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
	    	console.log("search acteur");
	    	$.ajax({
		        url: "http://imdb.wemakesites.net/api/search?q="+query,
		        data: form.serialize(),
		        crossDomain: true,
		        dataType: "jsonp",
		        success: function(data) {
		            var acteurs = data.data.results.names;
		            console.log(acteurs);
		            $(".pointer").show();
		            $( ".pointer" ).each(function( index ) {
		            	$(this).attr("id", acteurs[0].id);
		        		$(this).find(".actor_name").html(acteurs[0].title);
		        		acteurs.shift();
		        	});

		        	$(".pointer").click( function(){
		        		//console.log($(this).attr('id'));
		        		var id = $(this).attr('id');
		        		loadIdName(id, 0,  callBackMovie);
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