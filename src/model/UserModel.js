import Parse from 'parse';

export default class UserModel {
    #parseUser;
    constructor(parseUser) {
        this.id = parseUser.id;
        this.fullName = parseUser.fullName;
        this.apartment = parseUser.apartment;
        this.isCommiteeMember = parseUser.isCommiteeMember;
        this.#parseUser = parseUser;
    }

    static activeUser = null;

    static async login(email, pwd) {
        const parseUser = await Parse.User.logIn(email, pwd);
        UserModel.activeUser = new UserModel(parseUser);
        return UserModel.activeUser;
    }
    static logout() {
        UserModel.activeUser = null;
        Parse.User.logout();
    }

    static loadActiveUser() {
        UserModel.activeUser = Parse.User.current() ? new UserModel(Parse.User.current()) : null;
        return UserModel.activeUser;
    }

    static async resetPassword(email){
        return await Parse.User.requestPasswordReset(emailValue);
    }
}