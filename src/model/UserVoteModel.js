import Parse from 'parse';

export default class UserVoteModel {
    constructor(id, voteOptionsId) {
        this.id = id;
        //this.userId = userId;
        //this.voteId = voteId;
        this.voteOptionsId = voteOptionsId;
    }
}