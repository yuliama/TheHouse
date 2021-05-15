import Parse from 'parse';

export default class CommunityModel {
    constructor(parseCommunity) {
        this.id = parseCommunity.id;
        this.Address = parseCommunity.get("Address");
    }

    static async getCommunityDetails(communityId){
        const communityTable = Parse.Object.extend('Community');
        const query = new Parse.Query(communityTable);
        query.contains("objectId", communityId);
        const parseCom = await query.find();
        const community = parseCom.map(item => new CommunityModel(item));
        return community;
    }
}