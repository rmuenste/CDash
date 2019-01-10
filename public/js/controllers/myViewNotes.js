// Load the Visualization API and the piechart package.
//google.load('visualization', '1.0', {
//    'packages': ['corechart']
//});

// Set a callback to run when the Google Visualization API is loaded.
//google.setOnLoadCallback(function() {
//  angular.bootstrap(document.body, ['Bubble3'])

function myViewNotesController($scope, $rootScope, $http, $location, anchors, renderTimer) {
  console.log("myViewNotesController now created1");
  $scope.loading = true;
  console.log($rootScope.queryString);
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

    myData = {
      "type": "LineChart",
      "displayed": false,
      "cssStyle": "height:600px;width: 100%",
      "data": {
        "cols": [{
          "label": "Product",
          "type": "string"
        }, {
          "label": "Agent",
          "type": "number"
        }, {

          "id": "Walkin",
          "label": "Walkin",
          "type": "number"
        }],
        "rows": [{
          "c": [{
            "v": "Air"

          }, {
          "v": 19000
          }, {
            "v": 15000
          }]
        }, {
          "c": [{
            "v": "Hotel"
          }, {
            "v": 10000
          }, {
            "v": 12000
          }]
        }, {
          "c": [{
            "v": "Transfer"
          }, {
            "v": 15000
          }, {
            "v": 12000
          }]
        }, {
          "c": [{
            "v": "Sightseeing"
          }, {
            "v": 19000
          }, {
            "v": 12000
          }]
        }, {
          "c": [{
            "v": "Package"
          }, {
            "v": 19000
          }, {
            "v": 12000
          }]
        }]
      },
      "options": {
        "title": "Sedimentation Benchmark",
        "isStacked": "true",
        "fill": 20,
        "is3D": false,
        "colors":["#28a6a8","rgb(124, 124, 172)","rgb(0, 227, 253)","rgb(0, 206, 230)","rgb(26, 110, 112)"],
        "animation": {
          "startup": true,
          "duration": 2000,
          "easing": "inAndOut"
        },
        "displayExactValues": false,
        "vAxis": {
          "title": "No of Bookings",
          "gridlines": {
            "count": 10
          }
        },
        "hAxis": {
          "title": "Products"
        }
      }
    }

    $scope.chart = myData;

    $scope.loading = false;
    $scope.theNodeList = [];
    $scope.theNodeList.push(JSON.parse($scope.cdash.notes[0].text));

    //if (!Array.isArray($scope.theNodeList) || !$scope.theNodeList) {
    if (Array.isArray($scope.theNodeList[0].DashBoardVisualization.DashBoardDiagramm.Diagramms) ||
                      $scope.theNodeList[0].DashBoardVisualization.DashBoardDiagramm.Diagramms.length) {
      // array does not exist, is not an array, or is empty
      console.log("Array does exist and is not empty");
      $scope.hasDiagramms = true;
    }
    else {
      console.log("Did not work");
      console.log($scope.theNodeList.length);
    }

    console.log($scope.theNodeList[0]);
    $scope.myTables = [];
    for(var i=0; i < $scope.cdash.notes.length; i++) {

        // console.log($scope.cdash.notes[i]);
        var myNote =  JSON.parse($scope.cdash.notes[i].text);
        $scope.myTables.push(myNote);

    }
  });

  $scope.gotoNote = function(x) {
    var newHash = 'note' + x;
    anchors.jumpToAnchor(newHash);
  };

  $scope.chartReady = function() {

  };
}

CDash.controller('myViewNotesController', ['$scope', '$rootScope', '$http',
                                           '$location', 'anchors', 'renderTimer',
                                           myViewNotesController]);
