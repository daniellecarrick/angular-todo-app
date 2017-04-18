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

    var goalTypes = {
      "Travel": 0,
      "Personal": 0,
      "Career": 0,
      "Experience": 0,
      "Project": 0,
      "Other": 0
      }
    // count instances of each category
    data.forEach(function(d) {
      // revisit this function. there must be a more elegant way. for example, once a match is found, go to the next index. maybe while loop?
      for (i = 0; i < 5; i++) {
        console.log(d.type, Object.keys(goalTypes)[i] )
        if (d.type == Object.keys(goalTypes)[i]){
          goalTypes[d.type]++;
          console.log(goalTypes[d.type] ++);
       }
      }
      console.log(goalTypes);
    });

/*    // Scale the range of the data in the domains
    x.domain(data.map(function(d) { return d.salesperson; }));
    y.domain([0, d3.max(data, function(d) { return d.sales; })]);

    // append the rectangles for the bar chart
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.salesperson); })
        .attr("width", x.bandwidth())
        .attr("y", function(d) { return y(d.sales); })
        .attr("height", function(d) { return height - y(d.sales); });*/

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