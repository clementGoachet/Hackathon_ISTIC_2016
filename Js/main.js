$(".search_btn").hover(
		
	function () {
		$(this).removeClass("transparent");
		$(this).addClass("red");
	}, function() {
		$(this).removeClass("red");
		$(this).addClass("transparent");
	}
		
);

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