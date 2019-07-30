function drawChart1(data){
    console.log(data)
    data = data[0].data;
    data.shift();
    d3.select("#chart1").selectAll("*").remove();
    var margin = {top: 20, right: 20, bottom: 0, left: 10},
      width = $("#chart1").width() - margin.left - margin.right,
      height = $("#chart1").height() - margin.top - margin.bottom,
      radius = Math.min(width, height) / 2;;

    var arc = d3.arc()
        .outerRadius(radius*0.5)
        .innerRadius(radius*0.3);

    var labelArc = d3.arc()
        .outerRadius(radius * 0.7)
        .innerRadius(radius * 0.7);

    var pie = d3.pie()
        .sort(null)
        .value(function(d) { return d[1]; });

    var svg = d3.select("#chart1").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc");
        
    g.append("path")
        .attr("d", arc)
        .style("fill", function(d) {
            // console.log(d.data)
            var color ="#33334d"; 
            if (d.data[0]=="male")
                color =  "#ff9933";
            else if (d.data[0]=="female")
                color =  "#ff3399";
            return color});

    g.append("text")
        .attr("text-anchor", "middle")
        .attr('font-size', '16px')
        .attr("font-weight", "bold")
        .attr('y', 0)
        .attr("transform",function(d){
            if(d.data[0]=="male")
                return "translate(0,-20)"; 
            else
                return "translate(0,20)"; }
        )
        .style("fill", function(d) {
                        // console.log(d.data)
                        var color ="white"; 
                        if (d.data[0]=="male")
                            color =  "#ff9933";
                        else if (d.data[0]=="female")
                            color =  "#ff3399";
                        return color})
        .text(function(d) { if(d.data[1]!=0) return d.data[0]; });


        g.append("text")
        .attr("text-anchor", "middle")
        .attr('font-size', '18px')
        .attr("font-weight", "bold")
        .attr('y', 0)
        .attr("transform",function(d){
            if(d.data[0]=="male")
                return "translate(0,-5)"; 
            else
                return "translate(0,35)"; }
        )
        .style("fill", function(d) {
                        // console.log(d.data)
                        var color ="white"; 
                        if (d.data[0]=="male")
                            color =  "#ff9933";
                        else if (d.data[0]=="female")
                            color =  "#ff3399";
                        return color})
        .text(function(d) { if(d.data[1]!=0) return d.data[1]; });

    
    // g.append("text")
    //         .attr("transform", function(d) { var temp = labelArc.centroid(d); temp[0]=temp[0]-28; return "translate(" + temp+")"; })
    //         .attr("dy", ".35em")
    //         .attr("font-size", "14px")
    //         .attr("font-weight", "bold")
    //         .style("fill", function(d) {
    //             console.log(d.data)
    //             var color ="white"; 
    //             if (d.data[0]=="male")
    //                 color =  "#ff9933";
    //             else if (d.data[0]=="female")
    //                 color =  "#ff3399";
    //             return color})
    //         .text(function(d) { if(d.data[1]!=0) return d.data[0]; });

    // g.append("text")
    //         .attr("transform", function(d) { var temp = labelArc.centroid(d); temp[0]=temp[0]-15;temp[1]=temp[1]+20; return "translate(" + temp+")"; })
    //         .attr("dy", ".35em")
    //         .attr("font-size", "18px")
    //         .attr("font-weight", "bold")
    //         .style("fill", function(d) {
    //             console.log(d.data)
    //             var color ="white"; 
    //             if (d.data[0]=="male")
    //                 color =  "#ff9933";
    //             else if (d.data[0]=="female")
    //                 color =  "#ff3399";
    //             return color})
    //         .text(function(d) { if(d.data[1]!=0) return d.data[1]; });


  }
  
//   function drawChart1(data){
//     console.log(data)
//     data = data[0].data;
//     data.shift();
//     var margin = {top: 20, right: 20, bottom: 0, left: 10},
//       width = $("#chart1").width() - margin.left - margin.right,
//       height = $("#chart1").height() - margin.top - margin.bottom,
//       radius = Math.min(width, height) / 2;;

//     var arc = d3.arc()
//         .outerRadius(radius*0.5)
//         .innerRadius(radius*0.2);

//     var labelArc = d3.arc()
//         .outerRadius(radius * 0.7)
//         .innerRadius(radius * 0.7);

//     var pie = d3.pie()
//         .sort(null)
//         .value(function(d) { return d[1]; });

//     var svg = d3.select("#chart1").append("svg")
//         .attr("width", width)
//         .attr("height", height)
//         .append("g")
//         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

//     var g = svg.selectAll(".arc")
//         .data(pie(data))
//         .enter().append("g")
//         .attr("class", "arc");
        
//     g.append("path")
//         .attr("d", arc)
//         .style("fill", function(d) {
//             console.log(d.data)
//             var color ="#33334d"; 
//             if (d.data[0]=="male")
//                 color =  "#ff9933";
//             else if (d.data[0]=="female")
//                 color =  "#ff3399";
//             return color});
    
//     g.append("text")
//             .attr("transform", function(d) { var temp = labelArc.centroid(d); temp[0]=temp[0]-28; return "translate(" + temp+")"; })
//             .attr("dy", ".35em")
//             .attr("font-size", "14px")
//             .attr("font-weight", "bold")
//             .style("fill", function(d) {
//                 console.log(d.data)
//                 var color ="white"; 
//                 if (d.data[0]=="male")
//                     color =  "#ff9933";
//                 else if (d.data[0]=="female")
//                     color =  "#ff3399";
//                 return color})
//             .text(function(d) { if(d.data[1]!=0) return d.data[0]; });

//     g.append("text")
//             .attr("transform", function(d) { var temp = labelArc.centroid(d); temp[0]=temp[0]-15;temp[1]=temp[1]+20; return "translate(" + temp+")"; })
//             .attr("dy", ".35em")
//             .attr("font-size", "18px")
//             .attr("font-weight", "bold")
//             .style("fill", function(d) {
//                 console.log(d.data)
//                 var color ="white"; 
//                 if (d.data[0]=="male")
//                     color =  "#ff9933";
//                 else if (d.data[0]=="female")
//                     color =  "#ff3399";
//                 return color})
//             .text(function(d) { if(d.data[1]!=0) return d.data[1]; });


//   }
  
