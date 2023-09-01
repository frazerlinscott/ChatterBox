export class Group {
    groupID: number;
    groupName: string;
    createdBy: string;
    groupAdmins: string[];
    userRequests: string[];
    members: string[];
    channels: string[];
    valid: boolean;

    constructor(
        groupID: number, 
        groupName: string, 
        createdBy: string, 
        groupAdmins: string[], 
        userRequests: string[],
        members: string[], 
        channels: string[], 
        valid: boolean 
    ) {
        this.groupID = groupID;
        this.groupName = groupName;
        this.createdBy = createdBy;
        this.groupAdmins = groupAdmins;
        this.userRequests = userRequests;
        this.members = members;
        this.channels = channels;
        this.valid = valid;
    }
}
