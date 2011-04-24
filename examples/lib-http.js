Fargo.runtime.define('http-get', function(url, callback) {
  var uri = require('url').parse(url),
      client = require('http').createClient(80, uri.hostname);
  
  var request = client.request('GET', uri.pathname);
  request.addListener('response', function(response) {
    var data = '';
    response.addListener('data', function(c) { data += c });
    response.addListener('end', function() {
      callback.exec(data);
    });
  });
  return request.end();
});
