var express, fs, getIdiots, filterIdiots, gifTest;

express = require('express');
fs = require('fs');
gifTest = /\.gif$/i;

// Returns an array of idiot gifs in public/idiots
getIdiots = function(request, response){
	// Screw being synchronous - I may change this later
	var idiots = fs.readdirSync('public/idiots');
	filterIdiots(idiots);
	response.json(idiots);
};

// Remove anything that is not a .gif file and prepend server directory
filterIdiots = function(idiots){
	var x = 0;
	while (x < idiots.length) {
		if (!gifTest.test(idiots[x])) {
			idiots.splice(x, 1);
			continue;
		}
		idiots[x] = '/idiots/' + idiots[x];
		x++;
	}
};

express()
	.use(express.static('public'))
	.get('/idiots', getIdiots)
	.post('/idiots', getIdiots)
	.listen(5252, function(){
		console.log('Server is running http://localhost:5252');
	});
