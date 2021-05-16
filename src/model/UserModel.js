import Parse from 'parse';

export default class UserModel {
    #parseUser;
    constructor(parseUser) {
        this.id = parseUser.id;
        this.email = parseUser.get("email");
        this.username = parseUser.get("username");
        this.fullName = parseUser.get("fullName");
        this.apartment = parseUser.get("apartment");
        this.isCommiteeMember = parseUser.get("isCommiteeMember");
        this.Community = parseUser.get("CommunityId");
        this.IsDeleted = parseUser.get("IsDeleted");
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
    static async addNewUser(email, fullName, apartment) {
        const UserTable = Parse.Object.extend('User');
        const newUser = new UserTable();
        newUser.set('username', email);
        newUser.set('email', email);
        newUser.set('fullName', fullName);
        newUser.set('apartment', apartment);
        newUser.set('password', '1234567');
        newUser.set('isCommiteeMember', false);
        newUser.set('CommunityId', this.activeUser.Community);
        newUser.set('IsDeleted', false);

        var acl = new Parse.ACL();
        acl.setPublicWriteAccess(true);
        acl.setPublicReadAccess(true);

        newUser.setACL(acl);

        await newUser.save({ useMasterKey: true });
    }
    async deleteUser(userId) {
        const query = new Parse.Query(Parse.User);
        query.contains("objectId", userId);
        const user = await query.find({ id: userId });
        console.log(user);
        await user[0].save({ IsDeleted: true });
    }

    async GetComminityUsers(communityId) {
        const query = new Parse.Query(Parse.User);
        query.contains("CommunityId", communityId);
        query.equalTo("IsDeleted", false);
        const parseUsers = await query.find();
        const users = parseUsers.map(parseUser => new UserModel(parseUser));
        return users;
    }
}