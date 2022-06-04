var db = require("../Controller/AccountDetailsController");
var AccountDetails = require("../Models/AccountDetails");

const dbOperations = require("../Controller/AccountDetailsController");

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

router.route('/AccountDetails').get((request,response)=>{

    dbOperations.getAccountDetails()
    .then(result => {
       response.json(result[0]);
       console.log(result[0])
    })

});

router.route('/AccountDetails').post((request,response)=>{
    console.log('inside post call');
    let accountDetails = {...request.body};

    console.log('Account Details : ',accountDetails);

    dbOperations.addAccount(accountDetails).then(result => {
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