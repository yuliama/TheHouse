import Parse from 'parse';

export default class VoteModel {
    constructor(parseVote) {
        this.id = parseVote.id;
        this.title = parseVote.get("title");
        this.details = parseVote.get("details");
        this.dueDate = parseVote.get("dueDate");
        this.isPermitMultiVotes = parseVote.get("isPermitMultiVotes");
        this.voteOptions = parseVote.get("voteOptions");
        this.userVotes = parseVote.get("userVotes");
        this.CommunityId = parseVote.get("CommunityId");
        this.isDeleted = parseVote.get("isDeleted");
    }

    static async addNewVote(title, details, dueDate, isPermitMultiVotes, voteOptions, communityId) {
        const VoteTable = Parse.Object.extend('Vote');
        const newVote = new VoteTable();
        newVote.set('title', title);
        newVote.set('details', details);
        newVote.set('dueDate', dueDate);
        newVote.set('isPermitMultiVotes', isPermitMultiVotes);
        newVote.set('voteOptions', voteOptions);
        newVote.set('isDeleted', false);
        newVote.set('CommunityId', communityId);

        var acl = new Parse.ACL();
        acl.setPublicWriteAccess(true);
        acl.setPublicReadAccess(true);

        newVote.setACL(acl);

        return await newVote.save();
    }

    static async addUserVote(voteId, results) {
        const voteTable = Parse.Object.extend('Vote');
        const query = new Parse.Query(voteTable);
        query.contains("objectId", voteId);

        const vote = await query.find();

        let voteItem = new VoteModel(vote[0]).userVotes;
        if (!voteItem) {
            voteItem = [];
        }
        voteItem.push(results);

        await vote[0].save({'userVotes': voteItem});
    }

    static async saveDate(voteId, dueDate) {
        const voteTable = Parse.Object.extend('Vote');
        const query = new Parse.Query(voteTable);
        query.contains("objectId", voteId);
        const vote = await query.find({ id: voteId });

        await vote[0].save({ 'dueDate': dueDate });
    }

    static async getCommunityVotes(communityId) {
        const voteTable = Parse.Object.extend('Vote');
        const query = new Parse.Query(voteTable);
        query.contains("CommunityId", communityId);
        query.equalTo("isDeleted", false);
        const parseVotes = await query.find();
        const votes = parseVotes.map(parseVote => new VoteModel(parseVote));
        return votes;
    }
}