import Parse from 'parse';

export default class VoteModel {
    constructor(parseVote) {
        this.id = parseVote.id;
        this.title = parseVote.title;
        this.details = parseVote.details;
        this.dueDate = parseVote.dueDate;
        this.isPermitMultiVotes = parseVote.isPermitMultiVotes;
        this.voteOptions = parseVote.voteOptions;
        this.userVotes = parseVote.userVotes;
    }

    static async addNewVote(title, details, dueDate, isPermitMultiVotes, voteOptions) {
        const VoteTable = Parse.Object.extend('Vote');
        const newVote = new VoteTable();
        newVote.set('title', title);
        newVote.set('details', details);
        newVote.set('dueDate', dueDate);
        newVote.set('isPermitMultiVotes', isPermitMultiVotes);
        newVote.set('voteOptions', voteOptions);
        newVote.set('isDeleted', false);

        var acl = new Parse.ACL();
        acl.setPublicWriteAccess(true);
        acl.setPublicReadAccess(true);

        newVote.setACL(acl);

        return await newVote.save();
    }
}