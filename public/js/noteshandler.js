/*
 * The functions in this file handle the generation of benchmark
 * web elements. A note file in JSON format is sent to the
 * CDash server. This note file is then parsed and the 
 * contents are passed to the functions in this file to generate
 * the web element and add the required HTML code.
 * 
 * The JSON format of the note file for a benchmark case is as follows:
 * [
 * { "BenchmarkData" : [ 
 * {"ID": "ID_String"},
 * {"Caption": "Caption_String"},
 * The <Elements> object is an array of Objects 
 * {"Elements" : [
 * {"ElemType" : "TypeString",..., 
 * "ElemData:" : [
 * {"TableRows" : "iRows", "TableCols" : "iCols", "col_labels": [
 * {"name":"col_name_string"},{"name":"col_name_string"}, 
 * ],"rows": [
 * {"c":[ {"col_value" : "value"}, {"col_value" : "value"} ]},
 * {"c":[ {"col_value" : "value"}, {"col_value" : "value"} ]},
 * ], 
 * },
 * ],
 * },
 * {"ElemType" : "TypeString",...,} 
 * ],...
 * }
 * ]
 * }, {"BenchmarkData" : ...}
 * ]
 *
 *
 */
function handleSedimentation(testCase) {
  var data;
  var chart;

  var h2 = document.getElementById('sedimentation_chart');
  h2.innerHTML=testCase['Caption'];

  google.charts.load('current', {packages: ['corechart', 'line']});
  google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {

    var mydata = {
      "cols": [
      {"label":"Topping","type":"number"},
      {"label":"Slices" ,"type":"number"}
      ],
      "rows": [
      {"c": [{"v": 0},{"v": 3}]},
      {"c": [{"v": 1},{"v": 1}]},
      {"c": [{"v": 2},{"v": 1}]},
      {"c": [{"v": 3},{"v": 1}]},
      {"c": [{"v": 4},{"v": 2}]}
      ]
    };

    var data = new google.visualization.DataTable(testCase.data);

    var options = {
      title : 'Sedimentation Velocity',
      hAxis: {
        title: 'Time[s]'
      },
      vAxis: {
        title: 'U_z'
      }
    };

    var chart = new google.visualization.LineChart(
        document.getElementById('curve_chart'));
    chart.draw(data, options);

  }
}

function handleFAC_newtonian(testCase) {
  var div = document.getElementById('newtonian_fac');
  var tbl = document.createElement('table');

  var h2  = document.createElement('h2');
  var h2Text = document.createTextNode(testCase['Caption']);
  h2.setAttribute("align","center");
  h2.appendChild(h2Text);
  div.appendChild(h2);

  var cap = tbl.createCaption();
  cap.innerHTML = testCase['Caption'];

  tbl.className = "result_table";

  var t0 = tbl.insertRow();
  t0.className = "mycoolheader";

  var tdL = t0.insertCell();
  tdL.appendChild(document.createTextNode('Level'));

  var td0 = t0.insertCell();
  td0.appendChild(document.createTextNode('Drag'));

  var td1 = t0.insertCell();
  td1.appendChild(document.createTextNode('Lift'));

  var t1 = tbl.insertRow();
  t1.className = "mycoolrow";

  var td1L = t1.insertCell();
  td1L.appendChild(document.createTextNode('1'));

  var td10 = t1.insertCell();
  td10.appendChild(document.createTextNode(testCase['Drag']));

  var td11 = t1.insertCell();
  td11.appendChild(document.createTextNode(testCase['Lift']));

  div.appendChild(tbl);
}

function handleFAC_non_newtonian(testCase) {
  var div = document.getElementById('non_newtonian_fac');
  var tbl = document.createElement('table');

  var h2  = document.createElement('h2');
  var h2Text = document.createTextNode(testCase['Caption']);
  h2.setAttribute("align","center");
  h2.appendChild(h2Text);
  div.appendChild(h2);

  var cap = tbl.createCaption();
  cap.innerHTML = testCase['Caption'];

  tbl.className = "result_table";

  var t0 = tbl.insertRow();
  t0.className = "mycoolheader";

  var tdL = t0.insertCell();
  tdL.appendChild(document.createTextNode('Level'));

  var td0 = t0.insertCell();
  td0.appendChild(document.createTextNode('Drag'));

  var td1 = t0.insertCell();
  td1.appendChild(document.createTextNode('Lift'));

  var t1 = tbl.insertRow();
  t1.className = "mycoolrow";

  var td1L = t1.insertCell();
  td1L.appendChild(document.createTextNode('1'));

  var td10 = t1.insertCell();
  td10.appendChild(document.createTextNode(testCase['Drag']));

  var td11 = t1.insertCell();
  td11.appendChild(document.createTextNode(testCase['Lift']));

  div.appendChild(tbl);
}

function handleFAS_visco(testCase) {
  var div = document.getElementById('visco_fas');
  var tbl = document.createElement('table');

  var h2  = document.createElement('h2');
  var h2Text = document.createTextNode(testCase['Caption']);
  h2.setAttribute("align","center");
  h2.appendChild(h2Text);
  div.appendChild(h2);

  var cap = tbl.createCaption();
  cap.innerHTML = testCase['Caption'];

  tbl.className = "result_table";

  var t0 = tbl.insertRow();
  t0.className = "mycoolheader";

  var tdL = t0.insertCell();
  tdL.appendChild(document.createTextNode('Level'));

  var td0 = t0.insertCell();
  td0.appendChild(document.createTextNode('Drag'));

  var td1 = t0.insertCell();
  td1.appendChild(document.createTextNode('Lift'));

  var t1 = tbl.insertRow();
  t1.className = "mycoolrow";

  var td1L = t1.insertCell();
  td1L.appendChild(document.createTextNode('1'));

  var td10 = t1.insertCell();
  td10.appendChild(document.createTextNode(testCase['Drag']));

  var td11 = t1.insertCell();
  td11.appendChild(document.createTextNode(testCase['Lift']));

  div.appendChild(tbl);
}

//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// Here the 'main' part of the script begins
// We try to get the AngularJS-controller in order to access the
// notes from its scope.
//
// We then parse the note and generate HTML elements for each benchmark.
//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
 
var dom_el = document.querySelector('[ng-controller="ViewNotesController"]');
console.log(dom_el);
console.log('I got the controller');
var ng_el  = angular.element(dom_el);
console.log(ng_el);
var ng_el_scope = ng_el.scope();
console.log('Scope:');
if(ng_el_scope !== undefined) {
  var my_text = ng_el_scope.cdash.notes[0].text;
  try {
    var my_obj = JSON.parse(my_text);
  }
  catch(err) {
    console.log(err.message);
    throw new Error('Malformed JSON');
  }

  for(i = 0; i < my_obj.length; i++) {
    if(my_obj[i]['ID']==='NEWTFAC') {
      handleFAC_newtonian(my_obj[i]);
    }
    else if (my_obj[i]['ID']==='NON-NEWTFAC') {
      handleFAC_non_newtonian(my_obj[i]);
    }
    else if (my_obj[i]['ID']==='BENCHSED') {
      handleSedimentation(my_obj[i]);
    }
    else if (my_obj[i]['ID']==='VISCO-FAS') {
      handleFAS_visco(my_obj[i]);
    }
  }

}
