var Client = require('node-rest-client').Client;
var _ = require('lodash');
var searchQuery = process.argv[2];


var client = new Client();
var hasSearchQuery = function(toSearch) {
  var stringToSearch = "" + toSearch;
  var searchQueryRegex = new RegExp(searchQuery, 'i');
  return stringToSearch.search(searchQueryRegex) !== -1;
}
var printGrumps = function(grumpsArray) {
  console.log('Grumps related to \"' + searchQuery + '\" are:')
  console.log('');
  _.each(grumpsArray, function (grump) {
    console.log('Grump Command: ', grump.defaultCommand);
    console.log('Description: ', grump.description);
    console.log('');
  })
}
client.get("https://grumpjs.com/api/lib", function (data) {
  var relevantGrumps = _.filter(data.grumps, function (grump) {
    return _.some(grump, hasSearchQuery)
  })
  printGrumps(relevantGrumps);
});

