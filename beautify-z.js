var beautify = require('js-beautify').js_beautify,
	fs = require('fs'),
	glob = require('multi-glob').glob,
	Q = require('q');

var readFile = Q.nfbind(fs.readFile);



function beautifyFile(filePath) {
	readFile('.jsbeautifyrc', 'utf8').then(function (jsbeautifyOptionsRaw) {
		fs.readFile(filePath, 'utf8', function (err, data) {
		    if (err) {
		        throw err;
		    }

		    var jsbeautifyOptions = JSON.parse(jsbeautifyOptionsRaw);


		    var beautifiedFileText = beautify(data, jsbeautifyOptions);

		    fs.writeFile(filePath, beautifiedFileText);
		});
	});
}



module.exports = function(globPath) {
    glob(globPath, {}, function(err, files) {
		files.forEach(function (file) {
			beautifyFile(file);
			console.log(file);
		});
	});
}










