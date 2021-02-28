const express = require('express');
const { civFromName } = require('./civilization.js')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
var path = require('path');
const got = require('got');
const hostname = "0.0.0.0"

var app = express();
const port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload({
  createParentPath: true
}));

app.get('/civilizations/:x', async function(req, res){
  if(isNaN(Number(req.params.x))){
    res.send(await civFromName(req.params.x));
  } else {
    response = await got("https://age-of-empires-2-api.herokuapp.com/api/v1/civilization/"+req.params.x)
    res.send(JSON.parse(response.body));
  }
})


app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/fileUpload.html'));
})

app.post('/file-upload', (req, res) => {
  try {
      if(!req.files) {
          res.send({
              status: false,
              message: 'No file uploaded'
          });
      } else {
          //Use the name of the input field to retrieve the uploaded file
          let file = req.files.filename;
          //Use the mv() method to place the file in upload directory (i.e. "uploads")
          file.mv('./uploads/' + file.name);
          //send response
          res.send({
              status: true,
              message: 'File is uploaded',
              data: {
                  name: file.name,
                  mimetype: file.mimetype,
                  size: file.size
              }
          });
      }
  } catch (err) {
      res.status(500).send(err);
  }
});

app.listen(port,hostname, ()=>{
  console.log(`listening at port ${port}`)
})
