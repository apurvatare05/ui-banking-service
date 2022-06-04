var config = require('../Database/db.config');
const sql = require('mssql/msnodesqlv8');

async function getAccountDetails() {

    try {
        let pool = await sql.connect(config);
        let accountDetails = await pool.request().query("SELECT * from AccountDetails");
        return accountDetails.recordsets;
    }
    catch (error) {
        console.log(error);
    }

}
async function addAccount(accountDetails) {

    try {
        console.log('Inside Controller');
        let outputMessage = '';
        let pool = await sql.connect(config);
        let insertAccount = await pool.request()
            .input('UserName', sql.NVarChar(50), accountDetails.accountDetails.UserName )
            .input('UserEmail', sql.NVarChar(50), accountDetails.accountDetails.UserEmail )
            .input('Password',sql.NVarChar(50), accountDetails.accountDetails.Password)
            .input('FirstName', sql.NVarChar(40), accountDetails.accountDetails.FirstName)
            .input('LastName', sql.NVarChar(40), accountDetails.accountDetails.LastName)
            .input('PhoneNumber', sql.Numeric, accountDetails.accountDetails.PhoneNumber)
            .input('TransactionReason', sql.VarChar(50), accountDetails.accountDetails.TransactionReason)
            .input('AccountType', sql.VarChar(50), accountDetails.accountDetails.AccountType)
            .input('AccountBalance', sql.Int, accountDetails.accountDetails.AccountBalance)
            .output('responseMessage',sql.VarChar(250), outputMessage)
            .execute('AddAccount',(err, result) =>
                {
                    if(!err){
                        console.log('ResultSet: ', result );
                        return result.output.responseMessage;
                    }
                    else {
                        console.log('Error: ', err );
                        return err;
                    }
                }
            );
        //return outputMessage;
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = {
    getAccountDetails: getAccountDetails,
    addAccount: addAccount
    
}