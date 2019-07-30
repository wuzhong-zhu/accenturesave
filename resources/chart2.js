function drawChart2(data){
    // console.log("chart 2")
    d3.select("#chart2").selectAll("*").remove();
    data = data[0].data;
    data.shift();
    var margin = {top: 0, right: 140, bottom: 0, left: 20},
      width = $("#chart2").width() - margin.left - margin.right,
      height = $("#chart2").height() - margin.top - margin.bottom;

    var svg = d3.select("#chart2").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleBand().range([height, 0]);
    var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    x.domain([0, d3.max(data, function(d) { return d[1]; })]);
    y.domain(data.map(function(d) { return d[0]; })).padding(0.1);

    // g.append("g")
    //     .attr("class", "y axis")
    //     .call(d3.axisLeft(y));
    
    var bar = g.selectAll("rect")
        .data(data)
        .enter().append("g");
    
    bar.append("rect")
        .attr("class", "bar")
        .attr("fill","#3366ff")
        .attr("x", 70)
        .attr("height", y.bandwidth())
        .attr("y", function(d) { return y(d[0]); })
        .attr("width", function(d) { return x(d[1]); })
    
    bar.append("text")
        .attr("dy", "-1em")
        .attr("x", function(d) { return 20;})
        .attr("y", function(d) { return y(d[0])+y.bandwidth(); })
        .attr("text-anchor", "middle")
        .attr("font-family", "sans-serif")
        .attr("font-size", "16px")
        .attr("font-weight", "bold")
        .attr("fill", "white")
        .text(function(d) {
            if(d[1]!=0)
                return "Age "+d[0]+":"+d[1];
        });

  }



// function drawChart2(data){
//     console.log(data)
//     picasso.chart({
//     element: document.querySelector('#chart2'), // This is the element to render the chart in
//     data:data,
//     settings: {
//       scales: {
//         y: {
//           data: { field: 'count' },
//           invert: true,
//           include: [0]
//         },
//         c: {
//           data: { field: 'count' },
//           type: 'color'
//         },
//         t: { data: { extract: { field: 'age' } }, padding: 0.3 },
//       },
//       components: [{
//         type: 'axis',
//         dock: 'left',
//         scale: 'y'
//       },{
//         type: 'axis',
//         dock: 'bottom',
//         scale: 't'
//       },{
//         key: 'bars',
//         type: 'box',
//         data: {
//           extract: {
//             field: 'age',
//             props: {
//               start: 0,
//               end: { field: 'count' }
//             }
//           }
//         },
//         settings: {
//           major: { scale: 't' },
//           minor: { scale: 'y' },
//           box: {
//             fill: { scale: 'c', ref: 'end' }
//           }
//         }
//       }]
//     }
//     });
//   }