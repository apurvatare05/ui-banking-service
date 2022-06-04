var config = require('../Database/db.config');
const sql = require('mssql/msnodesqlv8');

async function getLogin(loginDetails) {
    debugger;
    let outputMessage = '';
    try {
        console.log('Inside LoginController');
        let pool = await sql.connect(config);
        let getUserLogin = await pool.request()
            .input('user_email', sql.NVarChar(50), loginDetails.UserEmail )
            .input('user_password',sql.NVarChar(50), loginDetails.Password)
            .output('responseMessage',sql.VarChar(250), outputMessage)
            .execute('UserLogin',(err, result) =>
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
    getLogin: getLogin,
    
}