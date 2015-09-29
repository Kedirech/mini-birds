var express = require('express');

var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');

var app = express();
var port = 8080;

var db = mongojs("birdsighting");
var Sighting = db.collection('sightings');

app.use(bodyParser.json());
app.use(cors());

app.post("/api/sighting", function(req, res){
  Sighting.insert(req.body, function(err, result){
    if (err){
      console.log(err);
      sendStatus(500);
    }else{
      console.log(result);
      res.json(result);
    }
  });
});

app.get("/api/sighting", function(req, res){
  var searchCriteria = {};
  if(req.query.gender){
    searchCriteria.gender = req.query.gender;
  }
  if(req.query.address){
    searchCriteria.address = req.query.address;
  }
  Sighting.find(searchCriteria, function(err, result){
    if(err){
      console.log(err);
      res.sendStatus(err.status);
    }  else{
      console.log("hmm");
      res.json(result);
    }
  });
  
});

app.put("/api/sighting", function(req, res){
  
  res.sendStatus(200);
});

app.delete("/api/sighting", function(req, res){
  
  res.sendStatus(200);
});

app.listen(port, function(){
  console.log("Listening on port: " + port);
  console.log("Connected to database: " + db);
});

