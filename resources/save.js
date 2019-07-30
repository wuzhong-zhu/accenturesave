function drawChart1(data){
    console.log(data)
    picasso.chart({
    element: document.querySelector('#chart1'), // This is the element to render the chart in
    data:data,
    settings: { 
      scales: {
        c: { 
          data: { extract: {field: 'gender' }}, type:'color' 
        }
      },
      components: [ // specify how to render the chart
        {
          type: 'legend-cat',
          scale: 'c'
        },
        {
          key:'p',
          type: 'pie',
          data: {
            extract: {
              field: 'gender',
              props: {
                num: { field: 'count' }
              }
            }
          },
          settings: {
            slice: {
            arc: { ref: 'num' },
            fill: { scale: 'c' },
            outerRadius: () => 0.9,
            strokeWidth: 1,
            stroke: 'rgba(255, 255, 255, 0.5)'
            }
          }
        }
      ]
    }
  });
  }
  
  function drawChart2(data){
    console.log(data)
    picasso.chart({
    element: document.querySelector('#chart2'), // This is the element to render the chart in
    data:data,
    settings: {
      scales: {
        y: {
          data: { field: 'count' },
          invert: true,
          include: [0]
        },
        c: {
          data: { field: 'count' },
          type: 'color'
        },
        t: { data: { extract: { field: 'age' } }, padding: 0.3 },
      },
      components: [{
        type: 'axis',
        dock: 'left',
        scale: 'y'
      },{
        type: 'axis',
        dock: 'bottom',
        scale: 't'
      },{
        key: 'bars',
        type: 'box',
        data: {
          extract: {
            field: 'age',
            props: {
              start: 0,
              end: { field: 'count' }
            }
          }
        },
        settings: {
          major: { scale: 't' },
          minor: { scale: 'y' },
          box: {
            fill: { scale: 'c', ref: 'end' }
          }
        }
      }]
    }
    });
  }
  
  function drawChart3(data){
    console.log(data)
    picasso.chart({
    element: document.querySelector('#chart3'), // This is the element to render the chart in
    data:data,
    settings: {
      scales: {
        y: {
          data: { field: 'count' },
          invert: true,
          expand:0.2
        },
        t: { data: { extract: { field: 'hour' } }},
      },
      components: [{
        type: 'axis',
        dock: 'left',
        scale: 'y'
      },{
        type: 'axis',
        dock: 'bottom',
        scale: 't'
      },{
        key: 'lines',
        type: 'line',
        data: {
          extract: {
            field: 'hour',
            props: {
              v: { field: 'count' }
            }
          }
        },
        settings: {
          coordinates:{
            major: { scale: 't' },
            minor: { scale: 'y',ref:'v'}
          },
          layers: {
            line: {}
          }
        }
      }]
    }
    });
  }