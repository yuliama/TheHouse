import Parse from 'parse';

export default class VoteOptionModel {
    constructor(parseVoteOption) {
        this.id = parseVoteOption.id;
        this.userId = parseVoteOption.userId;
        this.voteId = parseVoteOption.voteId;
        this.voteOptionId = parseVoteOption.voteOptionId;
    }
}