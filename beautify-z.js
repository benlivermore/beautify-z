var beautify = require('js-beautify').js_beautify,
    fs = require('fs'),
    glob = require('multi-glob').glob,
    Q = require('q'),
    beautifyrcPath = '.jsbeautifyrc';

var readFile = Q.nfbind(fs.readFile);


function readOptionsFromFile() {

    return readFile(beautifyrcPath, 'utf8').then(function(jsbeautifyOptionsRaw) {
        var jsbeautifyOptions = JSON.parse(jsbeautifyOptionsRaw);
        return jsbeautifyOptions;
    });
}

function beautifyFile(filePath, beautifyOptions) {
    fs.readFile(filePath, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }

        var beautifiedFileText = beautify(data, beautifyOptions);

        fs.writeFile(filePath, beautifiedFileText);
    });
}

function beautifyAllFiles(globPath, options) {
    glob(globPath, {}, function(err, files) {
        files.forEach(function(file) {
            beautifyFile(file, options);
            console.log(file);
        });
    });
}

module.exports.beautify = function(globPath, options) {

    if (!options && fs.existsSync(beautifyrcPath)) {
        readOptionsFromFile().then(function(options) {
            beautifyAllFiles(globPath, options);
        })
    } else {
        beautifyAllFiles(globPath, options);
    }

}