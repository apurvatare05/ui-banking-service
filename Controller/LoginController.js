var config = require('../Database/db.config');
const sql = require('mssql/msnodesqlv8');

async function getLogin(loginDetails) {

    try {
        let pool = await sql.connect(config);
        let LoginDetails = await pool.request()
        .input('user_email', sql.NVarChar(50), loginDetails.user_email )
        .input('user_password',sql.NVarChar(50), loginDetails.user_password)
        .execute('UserLogin');
        return LoginDetails.recordset;
    }
    catch (error) {
        console.log(error);
    }

}

module.exports = {
    getLogin: getLogin,
    
}