function loadData(){

  data1 = [{
    type:"matrix",
    data:[['gender','count'],['male','13'],['female','9']]
  }]
  
  data2 = [{
    type:"matrix",
    data:[['age','count'],['20',2],['30',6],['40',10],['50',3],['60',1]]
  }]
  
  data3 = [{
    type:"matrix",
    data:[['hour','count','count2'],['9',12,0],['10',21,0],['11',2,0],['12',3,0],['13',14,0]
    ,['14',18,0],['15',23,0],['16',14,0],['17',10,0],['18',6,0],['19',2,0],['20',3,0]]
  }]
  
  data4 = [{
    type:"matrix",
    data:[['object','count'],
    ['male',0],['wine-bottle',0],['mug-hot',0],['chair',0],['hotdog',0],['paw',0],
    ['laptop',0],['umbrella',0],['briefcase',0],['suitcase-rolling',0],['wineglass',0],['tv',0],
    ['mobile',0],['keyboard',0],['book',0]]
  }]
  
  var latestFrameUrl = "http://localhost:5080/vasp/api/framebuffer/ingestion/TEST/frame/*/analyzer/ATTRACK/done";
  $.getJSON(latestFrameUrl, function(data) {
      frame_num = data[0].frame_number;
      $.getJSON("http://localhost:5080/vasp/api/framebuffer/ingestion/TEST/frame/"+frame_num+"/analyzer/ATTRACK/detection/list", function(data) {
        // console.log("ohooo")
        // console.log(data)

        // var objs = JSON.parse(data.responseJSON);
        objs=data;
        // console.log(objs)

        //People
        people = objs.filter(obj => obj.detection_class == "person")
        functionQueue = [];
        var arrayLength = people.length;
        for (var i = 0; i < arrayLength; i++)
        {
          person = people[i]
          var tempFun = $.getJSON("http://localhost:5080/vasp/api/framebuffer"+person.track_record);
          functionQueue.push(tempFun);
        }
        Promise.all(functionQueue).then(result=>{
          console.log(result)

          maleCount = 0;
          femaleCount = 0;
          genderUnknownCount=0;
  
          age20Count = 0;
          age30Count = 0;
          age40Count = 0;
          age50Count = 0;
          age60Count = 0;
          ageUnknownCount = 0;
          arrLength = result.length
          for (var j = 0; j < arrLength; j++)
          {
            if(result[j].gender == "Male")
              maleCount ++;
            else if(result[j].gender == "Male")
              femaleCount ++;
            else
              genderUnknownCount++;

            var age =  result[j].age
            if(age > 20 && age < 30)
              age20Count ++;
            else if(age > 30 && age < 40)
              age30Count ++;
            else if(age > 40 && age < 50)
              age40Count ++;
            else if(age > 50 && age < 60)
              age50Count ++;
            else if(age > 60 )
              age60Count ++;
            else
              ageUnknownCount++;
          }

          //Objects
          var arrayLength = objs.length;
          console.log(objs)
          for (var i = 0; i < arrayLength; i++)
          {
            obj = objs[i]
              if (obj.detection_class == "person")
                data4[0].data[1][1]++;
              if (obj.detection_class == "cell phone")
                data4[0].data[2][1]++;
              if (obj.detection_class == "keyboard")
                data4[0].data[3][1]++;
              if (obj.detection_class == "glass")
                data4[0].data[4][1]++;
              if (obj.detection_class == "laptop")
                data4[0].data[5][1]++;
              if (obj.detection_class == "tvmonitor")
                data4[0].data[6][1]++;
              if (obj.detection_class == "chair")
                data4[0].data[7][1]++;
              if (obj.detection_class == "bottle")
                data4[0].data[8][1]++;
              if (obj.detection_class == "cup")
                data4[0].data[9][1]++;
              if (obj.detection_class == "hotdog")
                data4[0].data[10][1]++;
              if (obj.detection_class == "dog")
                data4[0].data[11][1]++;
              if (obj.detection_class == "umbrella")
                data4[0].data[12][1]++;
              if (obj.detection_class == "briefcase")
                data4[0].data[13][1]++;
              if (obj.detection_class == "suitcase")
                data4[0].data[14][1]++;
              if (obj.detection_class == "glass")
                data4[0].data[15][1]++;
              if (obj.detection_class == "book")
                data4[0].data[16][1]++;

          }

          data1[0].data[1][1]=maleCount;
          data1[0].data[2][1]=femaleCount;

          data2[0].data[1][1]=age20Count;
          data2[0].data[2][1]=age30Count;
          data2[0].data[3][1]=age40Count;
          data2[0].data[4][1]=age50Count;
          data2[0].data[5][1]=age60Count;

          drawChart1(data1);
          drawChart2(data2);
          drawChart3(data3);
          drawChart4(data4);
        })
      })
  });
}

window.setInterval(loadData, 500);

// function loadData2(){
//   $.ajax({
//     url: '/data',
//     complete: function(data) {
//       var objs = JSON.parse(data.responseJSON);

//       console.log(objs)
//       people = objs.filter(obj => obj.Classification == "person")

//       maleCount = 0;
//       femaleCount = 0;
//       genderUnknownCount=0;

//       age20Count = 0;
//       age30Count = 0;
//       age40Count = 0;
//       age50Count = 0;
//       age60Count = 0;
//       ageUnknownCount = 0;

//       var arrayLength = people.length;
//       for (var i = 0; i < arrayLength; i++)
//       {
//         person = people[i]
//         var attrLength = person.Attributes.length;
//         for (var j = 0; j < attrLength; j++)
//         {
//           var attr = person.Attributes[j];
//           if(attr.Type == "gender" && attr.Value == "Male")
//             maleCount ++;
//           else if(attr.Type == "gender" && attr.Value == "Female")
//             femaleCount ++;
//           else
//             genderUnknownCount++;

//           if(attr.Type == "age" && attr.Value > 20 && attr.Value < 30)
//             age20Count ++;
//           else if(attr.Type == "age" && attr.Value > 30 && attr.Value < 40)
//             age30Count ++;
//           else if(attr.Type == "age" && attr.Value > 40 && attr.Value < 50)
//             age40Count ++;
//           else if(attr.Type == "age" && attr.Value > 50 && attr.Value < 60)
//             age50Count ++;
//           else if(attr.Type == "age" && attr.Value > 60 )
//             age60Count ++;
//           else
//             ageUnknownCount++;
//         }      
//       }

//       var arrayLength = objs.length;
//       data4[0].data[1][1]=maleCount;
//       data4[0].data[2][1]=femaleCount;
//       for (var i = 0; i < arrayLength; i++)
//       {
//         obj = objs[i]
//         if (obj.Classification == "chair")
//           data4[0].data[4][1]++;
//       }


//       tempRecord=[0,0,0,0,0,0,
//         2,3,9,12,17,20,
//         22,24,25,29,18,16,
//         14,12,7,0,0,0
//       ]
//       tempRecord2=[0,0,0,0,0,0,
//         2,1,0,6,18,22,
//         28,29,-32,-35
//       ]

//       mockFlag=false;
//       if(mockFlag==false)
//       {
//         data1[0].data[1][1]=maleCount;
//         data1[0].data[2][1]=femaleCount;

//         data2[0].data[1][1]=age20Count;
//         data2[0].data[2][1]=age30Count;
//         data2[0].data[3][1]=age40Count;
//         data2[0].data[4][1]=age50Count;
//         data2[0].data[5][1]=age60Count;

//         data3 = [{
//           type:"matrix",
//           data:[['hour','count','count2']
//           ,['1am',tempRecord2[0],tempRecord[0]],['2am',tempRecord2[1],tempRecord[1]],['3am',tempRecord2[2],tempRecord[2]],['4am',tempRecord2[3],tempRecord[3]],['5am',tempRecord2[4],tempRecord[4]],['6am',tempRecord2[5],tempRecord[5]]
//           ,['7am',tempRecord2[6],tempRecord[6]],['8am',tempRecord2[7],tempRecord[7]],['9am',tempRecord2[8],tempRecord[8]],['10am',tempRecord2[9],tempRecord[9]],['11am',tempRecord2[10],tempRecord[10]],['12pm',tempRecord2[11],tempRecord[11]]
//           ,['1pm',tempRecord2[12],tempRecord[12]],['2pm',tempRecord2[13],tempRecord[13]],['3pm',tempRecord2[14],tempRecord[14]],['4pm',tempRecord2[15],tempRecord[15]],['5pm',tempRecord2[16],tempRecord[16]],['6pm',tempRecord2[17],tempRecord[17]]
//           ,['7pm',tempRecord2[18],tempRecord[18]],['8pm',tempRecord2[19],tempRecord[19]],['9pm',tempRecord2[20],tempRecord[20]],['10pm',tempRecord2[21],tempRecord[21]],['11pm',tempRecord2[22],tempRecord[22]],['12am',tempRecord2[23],tempRecord[23]]]
//         }]
//       }
//       else{
//         data3 = [{
//           type:"matrix",
//           data:[['hour','count','count2']
//           ,['1am',tempRecord2[0],tempRecord[0]],['2am',tempRecord2[1],tempRecord[1]],['3am',tempRecord2[2],tempRecord[2]],['4am',tempRecord2[3],tempRecord[3]],['5am',tempRecord2[4],tempRecord[4]],['6am',tempRecord2[5],tempRecord[5]]
//           ,['7am',tempRecord2[6],tempRecord[6]],['8am',tempRecord2[7],tempRecord[7]],['9am',tempRecord2[8],tempRecord[8]],['10am',tempRecord2[9],tempRecord[9]],['11am',tempRecord2[10],tempRecord[10]],['12pm',tempRecord2[11],tempRecord[11]]
//           ,['1pm',tempRecord2[12],tempRecord[12]],['2pm',tempRecord2[13],tempRecord[13]],['3pm',tempRecord2[14],tempRecord[14]],['4pm',tempRecord2[15],tempRecord[15]],['5pm',tempRecord2[16],tempRecord[16]],['6pm',tempRecord2[17],tempRecord[17]]
//           ,['7pm',tempRecord2[18],tempRecord[18]],['8pm',tempRecord2[19],tempRecord[19]],['9pm',tempRecord2[20],tempRecord[20]],['10pm',tempRecord2[21],tempRecord[21]],['11pm',tempRecord2[22],tempRecord[22]],['12am',tempRecord2[23],tempRecord[23]]]
//         }]
//       }
 

//       drawChart1(data1);
//       drawChart2(data2);
//       drawChart3(data3);
//       drawChart4(data4);
//     }
//   });
// }

function rerender(){
	loadData();
}

