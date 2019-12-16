// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();
let alerts = require('./alerts.json')

// defining an array to work as the database (temporary solution)
const ads = [
  {title: 'Hello, world (again)!'}
];

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
//app.use(bodyParser.json());
app.use(express.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});

app.get('/api/v1/applications/alerts/*', (req, res) => {
    res.send(alerts);
  });

// OAUTH call
// defining an endpoint to return all ads
app.post('/oauth/token',function(req,res){
    res.send({
        "scope": "orion.api offline_access",
        "token_type": "Bearer",
        "access_token": "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjNjA1YWY4Zi1kNThlLTRmOGMtYTg3Ni1jZTBjMmQ1MzZkODMiLCJ1c2VybmFtZSI6ImMyZWE2M2FmMWM5NTRlN2E4NDJhZDJiMGUxMDFhYWUxIiwidXJuOm9hdXRoOnNjb3BlIjoib3Jpb24uYXBpIiwiYXVkIjoiZmI3NDM0MWY4ZWM2NDEyOWI2NDM2YTczMWVkOTE2MGIiLCJuYmYiOjE1NzY0ODY3MDYsImV4cCI6MTU3NjQ4NzkwNiwiaXNzIjoiaHR0cHM6Ly9hdXRoLnBhbmRhc2VjdXJpdHkuY29tLyJ9.dBLNBGm_XU0F9XFTyZm_LLHlmb5D5iwoRe03auQY15Y",
        "expires_in": 1200,
        "refresh_token": "MTMwYzEwMDgzYTFhNGY5NTg4ODc4ZmM4OTE5ZjE3NDg0ZDZhNzhkZjkzOGM0NTU0YTcyODVhMzhkYWFhNjdjNA"
    });
  });

app.post('/add/alert',function(req,res){
    console.log(req.body);      // your JSON
    alerts.push(req.body);
    res.send(req.body);
  });

  app.post('/api/v1/applications/clients/names',function(req,res){
    var names = [];
    req.body.forEach(cid => {
        names.push({id: cid, name: cid + "-NAME"});
    });
    res.send(names);
  });
// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});
