function myViewNotesController($scope, $rootScope, $http, $location, anchors, renderTimer) {
  console.log("myViewNotesController created");
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
    console.log("Notes: " + $scope.cdash.notes[0]);
    console.log($scope.cdash.notes[0]);
  });

  $scope.gotoNote = function(x) {
    var newHash = 'note' + x;
    anchors.jumpToAnchor(newHash);
  };
}

CDash.controller('myViewNotesController', ['$scope', '$rootScope', '$http', '$location', 'anchors', 'renderTimer',
                                          myViewNotesController]);
