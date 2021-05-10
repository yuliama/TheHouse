export default class UserModel{
    #pwd;
    constructor(plainUser){
        this.id = plainUser.id;
        this.fullName = plainUser.fullName;
        this.apartment = plainUser.apartment;
        this.isCommiteeMember = plainUser.isCommiteeMember;
    }
}