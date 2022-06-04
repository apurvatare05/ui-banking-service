var db = require("../Controller/AccountDetailsController");

var LoginDetails = require("../Models/Login");
var dbOperations = require("../Controller/LoginController");

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request,response,next)=>{
    console.log('middleware');
    next();
 })


router.route('/Login').post((request,response)=>{
    console.log('inside post call');
    let LoginDetails = {...request.body};

    console.log('Login Details : ',LoginDetails);

    dbOperations.getLogin(LoginDetails).then(result => {
        console.log(result);
        try{
            response.status(201).json(result);
        }
        catch(err)
        {
            console.log('Error in Result Set: ', err);
        }
       console.log('Result Returned');

    })

})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);