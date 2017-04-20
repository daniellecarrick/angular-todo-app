function drawLinechart(elem) {
  // get rid of jQuery selection to access raw HTML node of <linechart>
  var rootNode = elem[0];

  var root = d3.select(rootNode).select('.line-chart-container');

  // set the dimensions and margins of the graph
  var margin = {top: 20, right: 20, bottom: 30, left: 40},
      width = parseInt(d3.select('.line-chart-container').style('width'), 10),
      width = width - margin.left - margin.right,
      height = parseInt(d3.select('.line-chart-container').style('height'), 10),
      height = 100 - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = root.append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleTime()
      .range([0, width]);

// the tooltip
  var tooltip = root.append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  // get the data
  d3.json('/goals', function (err, data) {
   if (err) throw err;
   console.log(data);

   // parsing our date. we tell d3 how the date is structured so it can grab and convert the elements into a Date object
  var parseDate = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");

    // count instances of each category and add to goalTypes array declared above
  data.forEach(function(d) {
      // parse the date into a format D3 can work with
      d.date_completed = parseDate(d.date_completed);
      //console.log(d.date_completed);
    })

    // sets the domain of the x scale by finding the min and max
    x.domain(d3.extent(data, function(d) { return d.date_completed }))

    // append the circles
    svg.selectAll(".marks")
        .data(data)
      .enter().append("circle")
        .attr("class", function(d) { return d.type + " marks"; })
        .attr("cx", function(d) { return x(d.date_completed); })
        .attr("cy", 0)
        .attr("r", 15)
        .on("mouseover", function(d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", 1);
           // make the bubble a little bigger
          d3.select(this).transition()
            .attr("r", 20);
          tooltip.html(d.name)
            .style("left", ((d3.mouse(this)[0]) - 10) + "px") // finds x coordinate of mouse position
            .style("top", ((d3.mouse(this)[1]) + 50) + "px"); //finds y coordinate of mouse position
        })
        .on("mouseout", function(d) {
            tooltip.transition()
            .duration(200)
            .style("opacity", 0);
        d3.select(this).transition()
            .attr("r", 15);
        });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

  });

}


/* A custom directive for the line chart */
app.directive("linechart", function() {
  return {
    restrict: 'E', // only use this directive as a tag
    template: '<div class="line-chart-container"></div>',
    link: function (scope, elem, attrs) {
      drawLinechart(elem);
    }
  };
});