$(".search_btn").hover(
		
	function () {
		$(this).removeClass("transparent");
		$(this).addClass("red");
	}, function() {
		$(this).removeClass("red");
		$(this).addClass("transparent");
	}
		
);

$(document).ready(function() {

	$('form[name="search-imdb"]').on("submit", function(e) {
	    var form = $(this);
	    var query = $("#input_search").val();
	    e.preventDefault();
	    $.ajax({
	        url: "http://imdb.wemakesites.net/api/search?q="+query,
	        data: form.serialize(),
	        crossDomain: true,
	        dataType: "jsonp",
	        success: function(data) {
	            window.console.log(data);
	        }
	    });
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