function myViewNotesController($scope, $rootScope, $http, $location, anchors, apiLoader) {
  console.log("myViewNotesController now created1");

  apiLoader.loadPageData($scope, 'api/v1/viewNotes.php');
  $scope.finishSetup = function() {
    // Honor any intra-page anchor specified in the URI.
    if ($location.hash() != '') {
    anchors.jumpToAnchor($location.hash());
    }



    console.log("scope cdash")
    console.log($scope.cdash);

    $scope.loading = false;
    $scope.myNotes = [];

    for(var i=0; i < $scope.cdash.notes.length; i++) {

        var myNote =  JSON.parse($scope.cdash.notes[i].text);
        $scope.myNotes.push(myNote);

    }
    console.log("scope note data")
    console.log($scope.myNotes);
    console.log($scope.myNotes[0].DashBoardVisualization);

    for(let j=0; j < $scope.myNotes.length; j++) {

      // Check for tables
      if($scope.myNotes[j].DashBoardVisualization.hasOwnProperty("DashBoardTable")) {

        console.log("Has table property");

        if (Array.isArray(
            $scope.myNotes[0].DashBoardVisualization.DashBoardTable.Tables) ||
            $scope.myNotes[0].DashBoardVisualization.DashBoardTable.Tables.length) {

           // array does not exist, is not an array, or is empty
           console.log("Array does exist and is not empty");
           $scope.hasTables = true;

        }
      }

      // Check for diagrams
      if($scope.myNotes[j].DashBoardVisualization.hasOwnProperty("DashBoardDiagramm")) {

        console.log("Has diagramm property");

        if (Array.isArray(
            $scope.myNotes[0].DashBoardVisualization.DashBoardDiagramm.Diagramms) ||
            $scope.myNotes[0].DashBoardVisualization.DashBoardDiagramm.Diagramms.length) {

              myData = {
                "type": "LineChart",
                "displayed": false,
                "cssStyle": "height:600px;width: 100%",
                "data": {
                  "cols": [{
                    "label": "Product",
                    "type": "number"
                  }, {
                    "label": "Agent",
                    "type": "number"
                  }],
                  "rows": [{
                    "c": [{
                      "v": "0.001"
                    },
                    {
                      "v": -1.3839E-03
                    }]
                  }, {
                    "c": [{
                      "v": "0.002"
                    }, {
                      "v": -2.7678E-03
                    }]
                  }, {
                    "c": [{
                      "v": "0.003"
                    }, {
                      "v": -4.1517E-03
                    }]
                  }, {
                    "c": [{
                      "v": "0.004"
                    }, {
                      "v": -5.5356E-03
                    }]
                  }, {
                    "c": [{
                      "v": "0.005"
                    }, {
                      "v": -6.9196E-03
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
                    "title": "Time[s]"
                  }
                }
              }

             console.log(myData.data);


             $scope.chart = myData;

             // array does not exist, is not an array, or is empty
             console.log("Diagramm Array does exist and is not empty");
             $scope.hasDiagramms = true;
             console.log("Chart Data0");
             console.log(myData.data);
             $scope.chart.data.cols = $scope.myNotes[0].DashBoardVisualization.DashBoardDiagramm.Diagramms[0].data.cols;
             $scope.chart.data.rows = $scope.myNotes[0].DashBoardVisualization.DashBoardDiagramm.Diagramms[0].data.rows;
             //console.log($scope.myNotes[0].DashBoardVisualization.DashBoardDiagramm.Diagramms[0].data);

          }
        }

      }

    };

    $scope.gotoNote = function(x) {
      var newHash = 'note' + x;
      anchors.jumpToAnchor(newHash);
    };

    $scope.chartReady = function() {

    };
  }

  CDash.controller('myViewNotesController', ['$scope', '$rootScope', '$http',
                                             '$location', 'anchors', 'apiLoader',
                                             myViewNotesController]);
