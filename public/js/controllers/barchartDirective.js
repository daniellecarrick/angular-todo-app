function drawBarchart(elem) {
  // get rid of jQuery selection to access raw HTML node of <barchart>
  var rootNode = elem[0];

  var root = d3.select(rootNode).select('.chart-container');


  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

  // set the ranges
  var x = d3.scaleBand()
            .range([0, width])
            .padding(0.1);
  var y = d3.scaleLinear()
            .range([height, 0]);

  // append the svg object to the body of the page
  // append a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  // get the data
  d3.json('/goals', function (err, data) {
   if (err) throw err;
    console.log(data);

    var goalTypes = [
      {
        "type": "Travel",
        "count": 0
      },
      {
        "type" : "Personal",
        "count": 0
      },
     {
        "type": "Career",
        "count": 0
      },
     {
        "type": "Experience",
        "count": 0
      },
     {
        "type": "Project",
        "count": 0
      },
     {
        "type": "Other",
        "count": 0
      }
    ]

    // count instances of each category
   data.forEach(function(d) {
      // revisit this function. there must be a more elegant way. for example, once a match is found, go to the next index. maybe while loop?
        for (i=0; i < goalTypes.length; i++) {
          console.log(d.type, goalTypes[i].type )
          if (d.type === goalTypes[i].type){
          goalTypes[i].count++;
        }
      }
      console.log(goalTypes);
    })

   /* // creates an array of the goal types
    var goalTypes = d3.set(data.map(function(d) { return d.type; })).values();
    console.log(goalTypes);*/

    // pulls out all of the unique instances of type from the data
    x.domain(data.map(function(d) { return d.type; }));
    y.domain([0, d3.max(goalTypes, function(d) { return d.count; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(goalTypes)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.type); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.count); })
        .attr("height", function(d) { return height - y(d.count); });

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
app.directive("barchart", function() {
  return {
    restrict: 'E', // only use this directive as a tag
    template: '<div class="chart-container"></div>',
    link: function (scope, elem, attrs) {
      drawBarchart(elem);
    }
  };
});