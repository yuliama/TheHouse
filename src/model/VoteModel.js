import Parse from 'parse';

export default class VoteModel {
    constructor(parseVote) {
        this.id = parseVote.get("id");
        this.title = parseVote.get("title");
        this.details = parseVote.get("details");
        this.dueDate = parseVote.get("dueDate");
        this.isPermitMultiVotes = parseVote.get("isPermitMultiVotes");
        this.voteOptions = parseVote.get("voteOptions");
        this.userVotes = parseVote.get("userVotes");
        this.CommunityId = parseVote.get("CommunityId");
        this.isDeleted = parseVote.get("isDeleted");
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
        newVote.set('CommunityId', this.activeUser.Community);

        var acl = new Parse.ACL();
        acl.setPublicWriteAccess(true);
        acl.setPublicReadAccess(true);

        newVote.setACL(acl);

        return await newVote.save();
    }

    static async getCommunityVotes(communityId){
        const voteTable = Parse.Object.extend('Vote');
        const query = new Parse.Query(voteTable);
        query.contains("CommunityId", communityId);
        query.equalTo("isDeleted", false);
        const parseVotes = await query.find();
        const votes = parseVotes.map(parseVote => new VoteModel(parseVote));
        return votes;
    }
}