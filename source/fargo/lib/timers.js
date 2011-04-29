Fargo.runtime.define('set-timeout', function(procedure, millis) {
  return setTimeout(function() { procedure.exec() }, millis);
});

Fargo.runtime.define('clear-timeout', function(id) {
  clearTimeout(id);
  return id;
});

Fargo.runtime.define('set-interval', function(procedure, millis) {
  return setInterval(function() { procedure.exec() }, millis);
});

Fargo.runtime.define('clear-interval', function(id) {
  clearInterval(id);
  return id;
});
