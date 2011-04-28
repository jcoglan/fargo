JS.Packages(function() { with(this) {
  file('/javascripts/fargo/fargo-min.js')
    .provides('Fargo')
    .requires('JS.Class', 'JS.Module', 'JS.Enumerable');
  
  file('/javascripts/jquery-console/jquery-1.4.2.min.js')
    .provides('jQuery');
  
  file('/javascripts/jquery-console/jquery.console.js')
    .provides('jQuery.fn.console')
    .requires('jQuery');
}});
