class AccountDetails{
    constructor(AccountID,AccountNumber,UserID,AccountTypeID,AccountBalance){
        this.AccountID = AccountID; 
        this.AccountNumber = AccountNumber; 
        this.UserID = UserID;
        this.AccountTypeID = AccountTypeID;
        this.AccountBalance = AccountBalance; 
    }
}

module.exports = AccountDetails;