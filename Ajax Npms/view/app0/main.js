var searchInput = $('.searchInput');
var resultsArr = [];
var btn = $('.searchBtn');
btn.click(function(event) {
	// getJson();
	// showAll();
});

$('.searchInput').on('keyup', function(event) {
	event.preventDefault();
	
	getJson();
});

function getJson() {
	$.get('https://api.npms.io/v2/search?q=' + searchInput.val() + '&size=10', function(data) {
		console.log(data.results);
		
		var result = data.results.map(a => a.package.name);
		$('.showResult').empty();

		console.log(result);

		if (searchInput.val() == '') {
			$('.showResult').css('display', 'none');
		} else {
			$('.showResult').fadeIn('slow');

		}

		for (var i = 0; i < result.length; i++) {
			console.log(result[i]);
			var resultLi = $('<span>', {
				text: result[i]
			}).appendTo($('.showResult'));
		}			
		
	});
}