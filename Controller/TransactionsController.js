var config = require('../Database/db.config');
const sql = require('mssql/msnodesqlv8');

async function addTransaction(transactionDetails) {
    console.log(transactionDetails);
    try {
        let outputMessage = '';
        let pool = await sql.connect(config);
        let insertAccount = await pool.request()
            .input('UserID', sql.Int, transactionDetails.TransactionDetails.UserID )
            .input('AccountID', sql.Int, transactionDetails.TransactionDetails.AccountID)
            .input('AccountType', sql.VarChar(50), transactionDetails.TransactionDetails.AccountType)
            .input('AccountBalance', sql.Int, transactionDetails.TransactionDetails.AccountBalance)
            .input('ActionType', sql.VarChar(50), transactionDetails.TransactionDetails.ActionType)
            .input('TransactionReason', sql.VarChar(50), transactionDetails.TransactionDetails.TransactionReason)
            .input('TransactionAmount', sql.Int, transactionDetails.TransactionDetails.TransactionAmount)
            .output('responseMessage',sql.VarChar(250), outputMessage)
            .execute('AddTransactions',(err, result) =>
                {
                    if(!err){
                        console.log('ResultSet: ', result );
                        outputMessage = result.output;
                        console.log('Output- ' ,outputMessage);
                    }
                    else {
                        console.log('Error: ', err );
                    }
                }
            );
        return outputMessage;
    }
    catch (err) {
        console.log(err);
    }

}

async function getTransactionDetails(transDetails) {

    try {
        let pool = await sql.connect(config);
        let TransDetails = await pool.request()
        .input('AccountID', sql.NVarChar(50), transDetails.AccountID )
        .input('UserID',sql.NVarChar(50), transDetails.UserID)
        .execute('GetTransactionDetails');
        return TransDetails.recordset;
    }
    catch (error) {
        console.log(error);
    }

}


module.exports = {
    addTransaction: addTransaction,
    getTransactionDetails: getTransactionDetails,
    
}