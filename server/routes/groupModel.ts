export class Group {
    groupID: number;
    groupName: string;
    createdBy: string;
    adminRequests: string[];
    groupAdmins: string[];
    userRequests: string[];
    members: string[];
    channels: { [channelName: string]: string[];}
    valid: boolean;

    constructor(
        groupID: number, 
        groupName: string, 
        createdBy: string, 
        adminRequests: string[],
        groupAdmins: string[], 
        userRequests: string[],
        members: string[], 
        channels: {[channelName: string]: string[];},
        valid: boolean 
    ) {
        this.groupID = groupID;
        this.groupName = groupName;
        this.createdBy = createdBy;
        this.adminRequests = adminRequests;
        this.groupAdmins = groupAdmins;
        this.userRequests = userRequests;
        this.members = members;
        this.channels = channels;
        this.valid = valid;
    }
}
