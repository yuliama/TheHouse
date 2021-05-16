import Parse from 'parse';

export default class VoteModel {
    constructor(parseVote) {
        this.id = parseVote.id;
        this.title = parseVote.title;
        this.details = parseVote.details;
        this.dueDate = parseVote.dueDate;
        this.isPermitMultiVotes = parseVote.isPermitMultiVotes;
    }
}