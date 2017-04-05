exports.translate = function(load) {
  load.metadata.format = 'amd';
  return 'def' + 'ine(function() {\nreturn ' + JSON.stringify(load.source) + ';\n});';
}
