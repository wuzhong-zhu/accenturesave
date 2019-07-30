function drawChart3(data){
    // console.log("chart 3")
    data = data[0].data;
    data.shift();
    var margin = {top: 40, right: 20, bottom: 40, left: 20},
      width = $("#chart3").width() - margin.left - margin.right,
      height = $("#chart3").height() - margin.top - margin.bottom;
    
    var xScale = d3.scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(data.map(function(d) {
        return d[0];
      }));
    var yScale = d3.scaleLinear()
        .rangeRound([height, 0])
        .domain([0, d3.max(data, (function (d) {
            return d[1];
        }))]);

    var svg = d3.select("#chart3").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

    var g =svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    // axis-x
    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    // axis-y
    g.append("g")
        .append("text")
            .attr("fill", "white")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text("Traffic");
  
    var bar = g.selectAll("rect")
        .data(data)
        .enter().append("g");
    
    // bar chart
    bar.append("rect")
        .attr("x", function(d) { return xScale(d[0]); })
        .attr("y", function(d) { return yScale(Math.abs(d[1])); })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { return height - yScale(Math.abs(d[1])); })
        .style("fill", "#69b3a2")
        .style("opacity", function(d){if(d[1]>0){return 1}else{return 0.5}});

    bar.append("text")
        .attr("dy", "-1em")
        .attr("x", function(d) { return xScale(d[0]) + xScale.bandwidth() / 2; })
        .attr("y", function(d) { return yScale(d[1]); })
        .attr("text-anchor", "middle")
        .attr("font-family", "Arial")
        .attr("font-weight", "bold")
        .attr("font-size", "18px")
        .attr("fill", "#69b3a2")
        .text(function(d) {
            if(d[1]!=0)
                return d[1];
        });
    
    //Line cart
    var line = d3.line()
        .x(function(d, i) { return xScale(d[0]) + xScale.bandwidth() / 2; })
        .y(function(d) { return yScale(d[2]); })
        .curve(d3.curveMonotoneX);
  
    bar.append("path")
      .attr("class", "line") // Assign a class for styling
      .attr("d", line(data)); // 11. Calls the line generator
    
    // console.log(data)
    bar.append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("cx", function(d, i) { return xScale(d[0]) + xScale.bandwidth() / 2; })
        .attr("cy", function(d) { return yScale(d[2]); })
        .attr("r", 3);
  }