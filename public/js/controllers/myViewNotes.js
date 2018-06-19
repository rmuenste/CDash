function myViewNotesController($scope, $rootScope, $http, $location, anchors, renderTimer) {
  console.log("myViewNotesController now created");
  $scope.loading = true;
  $http({
    url: 'api/v1/viewNotes.php',
    method: 'GET',
    params: $rootScope.queryString
  }).success(function(cdash) {
    renderTimer.initialRender($scope, cdash);
    // Honor any intra-page anchor specified in the URI.
    if ($location.hash() != '') {
    anchors.jumpToAnchor($location.hash());
    }
  }).finally(function() {
    $scope.loading = false;
    $scope.myTables = [];
    for(var i=0; i < $scope.cdash.notes.length; i++) {

        console.log($scope.cdash.notes[i]);
        var myNote =  JSON.parse($scope.cdash.notes[i].text);
        if(myNote.style === 'Table') {
          console.log("Adding new table");
          $scope.myTables.push(myNote);
        }
    }
  });

  $scope.gotoNote = function(x) {
    var newHash = 'note' + x;
    anchors.jumpToAnchor(newHash);
  };
}

CDash.controller('myViewNotesController', ['$scope', '$rootScope', '$http',
                                           '$location', 'anchors', 'renderTimer',
                                           myViewNotesController]);
