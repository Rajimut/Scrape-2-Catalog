// natives node - fs module - its used to save file to uploads folder
var fs = require('fs');
// request model is used to download the image
var request = require('request');

// used to download an image using url and save it in a paerticular filename	
exports.downloadURI = function(url, filename, callback) {
  console.log('aaa' + url);

  request(url)
  // .something is called chain-ing on.. in this case we are chaining on pipe
    .pipe(fs.createWriteStream(filename))
    .on('close', function() {
      callback(filename);
      console.log(filename);
    });
}

exports.randomizer = function(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}	