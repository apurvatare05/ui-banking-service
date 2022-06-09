class Users{
    constructor(UserEmail,UserName, PasswordHash, FirstName, LastName, PhoneNumber, Salt){
        this.UserEmail = UserEmail; 
        this.UserName = UserName; 
        this.PasswordHash = PasswordHash; 
        this.FirstName = FirstName; 
        this.LastName = LastName; 
        this.PhoneNumber = PhoneNumber; 
        this.Salt = Salt; 
    }
}

module.exports = Users;