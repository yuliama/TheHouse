import Parse from 'parse';

export default class UserVoteModel {
    constructor(parseUserVote) {
        this.id = parseUserVote.id;
        this.userId = parseUserVote.userId;
        this.voteId = parseUserVote.voteId;
        this.voteOptionId = parseUserVote.voteOptionId;
    }
}