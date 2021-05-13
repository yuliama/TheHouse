import Parse from 'parse';

export default class UserModel {
    #parseUser;
    constructor(parseUser) {
        this.id = parseUser.id;
        this.email = parseUser.get("email");
        this.fullName = parseUser.get("fullName");
        this.apartment = parseUser.get("apartment");
        this.isCommiteeMember = parseUser.get("isCommiteeMember");
        this.Community = parseUser.get("CommunityId");
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
        Parse.User.logOut();
    }

    static loadActiveUser() {
        UserModel.activeUser = Parse.User.current() ? new UserModel(Parse.User.current()) : null;
        return UserModel.activeUser;
    }

    static async resetPassword(email) {
        return await Parse.User.requestPasswordReset(email);
    }
    static async addNewUser(email, fullName, apartment, pwd) {
        const user = new Parse.User()
        user.set('username', email);
        user.set('email', email);
        user.set('fullName', fullName);
        user.set('apartment', apartment);
        user.set('password', pwd);
        user.set('isCommiteeMember', false);
        user.set('CommunityId', this.activeUser.CommunityId);

        return await user.signUp();
    }

    async GetComminityUsers(communityId) {
        const query = new Parse.Query(Parse.User);
        query.contains("CommunityId", communityId);
        const parseUsers = await query.find();
        const users = parseUsers.map(parseUser => new UserModel(parseUser));
        return users;
    }
}