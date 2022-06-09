var db = require("../Controller/AccountDetailsController");
var AccountDetails = require("../Models/AccountDetails");

const dbOperations = require("../Controller/AccountDetailsController");
const dbOperationsLogin = require("../Controller/LoginController");
const dbOperationsTransactions = require("../Controller/TransactionsController");

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
    console.log('middleware');
    next();
})

router.route('/AccountDetails').get((request, response) => {

    dbOperations.getAccountDetails()
        .then(result => {
            response.json(result[0]);
            console.log(result[0])
        })

});

router.route('/AccountDetails').post((request, response) => {
    console.log('inside post call');
    let accountDetails = { ...request.body };

    console.log('Account Details : ', accountDetails);

    dbOperations.addAccount(accountDetails).then(result => {
        console.log(result);
        try {
            response.status(201).json(result);
            console.log('Result: ',result)
        }
        catch (err) {
            console.log('Error in Result Set: ', err);
        }

    })
    // response.send

})

router.route('/Login').get((request, response) => {
    console.log('inside post call');
    let loginResponse = [];
    // let LoginDetails = {...request.body};
    let loginDetails = request.query;
    console.log('Login Details : ', loginDetails);
    dbOperationsLogin.getLogin(loginDetails)
        .then(result => {
            response.json(result);
        })
    // response.send(loginResponse);

})

router.route('/Transactions').post((request, response) => {
    let transactionsDetails = { ...request.body };

    dbOperationsTransactions.addTransaction(transactionsDetails).then(result => {
        console.log(result);
        try {
            response.status(201).json(result);
            console.log('Result: ',result)
        }
        catch (err) {
            console.log('Error in Result Set: ', err);
        }
    })
})

router.route('/Transactions').get((request, response) => {
    console.log('inside post call');
    let transDetails = request.query;
    console.log('Trans Details : ', transDetails);
    dbOperationsTransactions.getTransactionDetails(transDetails)
        .then(result => {
            response.json(result);
        })
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);