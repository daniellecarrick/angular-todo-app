function drawBarchart(elem) {
  // get rid of jQuery selection to access raw HTML node of <barchart>
  var rootNode = elem[0];

  var root = d3.select(rootNode).select('.chart-container');

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = parseInt(d3.select('.chart-container').style('width'), 10),
      width = width - margin.left - margin.right,
      height = parseInt(d3.select('.chart-container').style('height'), 10),
      height = 400 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);

 /* var x0 = d3.scaleBand()
            .domain([0,5])
            .range([0, width])
            .paddingOuter(0.2);*/

  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  var svg = root.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

var user = JSON.parse(localStorage.getItem('user'));
  // get the data
  // dif way to get data when we need to pass headers
d3.request('/goals')
    .mimeType("application/json")
    .header("Authorization", "Bearer " + user.token)
    .response(function(xhr) { return JSON.parse(xhr.responseText); })
    .get(function (err, data) {
   if (err) throw err;
   // console.log(data);

    // object to store the count of instances
    var goalTypes = [
      {
        "type": "Travel",
        "count": 0,
        "completed": 0
      },
      {
        "type" : "Personal",
        "count": 0,
        "completed": 0
      },
     {
        "type": "Career",
        "count": 0,
        "completed": 0
      },
     {
        "type": "Experience",
        "count": 0,
        "completed": 0
      },
     {
        "type": "Project",
        "count": 0,
        "completed": 0
      },
     {
        "type": "Other",
        "count": 0,
        "completed": 0
      }
    ]

    // count instances of each category and add to goalTypes array declared above
   data.forEach(function(d) {
      // revisit this function. there must be a more elegant way. for example, once a match is found, go to the next index. maybe while loop?
        for (i=0; i < goalTypes.length; i++) {
          //console.log(d.type, goalTypes[i].type )
          if (d.type === goalTypes[i].type){
            goalTypes[i].count++;
            if (d.completed === true) {
              goalTypes[i].completed++;
            }
            return;
        }
      }
    })

   goalTypes.forEach(function(d) {
    // adds active key to each object, that equals the count minus completed
    d.active = d.count - d.completed;
   })

   //console.log(goalTypes);
   /* // creates an array of the goal types
    var goalTypes = d3.set(data.map(function(d) { return d.type; })).values();
    console.log(goalTypes);*/

    // pulls out all of the unique instances of type from the goalsType array
    x.domain(goalTypes.map(function(d) { return d.type; }));
    y.domain([0, d3.max(goalTypes, function(d) { return d.count; })]);
    //y.domain([d3.min(goalTypes, function(d) { return d.completed * -1 }), d3.max(goalTypes, function(d) { return d.active; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(goalTypes)
      .enter().append("rect")
        //.attr("class", "bar")
        .attr("class", function(d) { return d.type + " bar"; } )
        .attr("x", function(d) { return x(d.type); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); });

    svg.selectAll('.active')
        .data(goalTypes)
      .enter().append('rect')
        //.attr("class", "active")
        .attr("class", function(d) { return d.type + " active"; } )
        .attr("x", function(d) { return x(d.type) + (x.bandwidth()/2) -10; })
        .attr("width", 20)
        .attr("y", function(d) { return y(d.completed); })
        .attr("height", function(d) { return height - y(d.completed); });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

  });

}


/* A custom directive for the scatterplot chart */
app.directive("stackedbar", function() {
  return {
    restrict: 'E', // only use this directive as a tag
    template: '<div class="chart-container"></div>',
    link: function (scope, elem, attrs) {
      drawBarchart(elem);
    }
  };
});