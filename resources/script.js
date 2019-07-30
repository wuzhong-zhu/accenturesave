var url, app, prefix,connectionType;
const enigmaMixin = this["halyard-enigma-mixin"];
const Halyard = new halyard();
const tableSchema = {
  name: 'data',
  fields: [{
      src: 'Id',
      name: 'id'
    },
    {
      src: 'gender',
      name: 'gender'
    },
    {
      src: 'age',
      name: 'age'
    },
  ],
  delimiter: ',',
}

initialize()
rerender();
// setInterval(rerender, 3000);

function initialize(){
  // url = "localhost:19076";
  // app = "";
  // prefix = "";
  // connectionType = "ws"
  var video = document.querySelector("#videoElement");
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        video.srcObject = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }
}

// function loadData(fileName){
//     const dataPath = fileName;
//     const dataTable = new halyard.Table(dataPath, tableSchema);
//     Halyard.addTable(dataTable);
//     $.get('https://unpkg.com/enigma.js@2.2.1/schemas/3.2.json').then(schema=>{
//       const session = enigma.create({
//         schema,
//         mixins : enigmaMixin,
//         url: 'ws://localhost:19076',
//         createSocket: url => new WebSocket(url),
//       })
//       session.open().then(global=>{
//         // console.log(global)
//         global.createSessionAppUsingHalyard(Halyard).then(app=>{
//           // console.log(app)
//           const properties = {
//             qInfo: { qType: 'hello-data' },
//             qHyperCubeDef: {
//               qDimensions: [{ qDef: { qFieldDefs: ['id'] } }],
//               qInitialDataFetch: [{ qHeight: 10, qWidth: 1 }],
//             },
//           }
//           app.createSessionObject(properties).then(object=>{
//             object.getLayout().then(layout=>{
//               console.log(layout);
//             })

//           })
//         })
//       });
//     })
// }























