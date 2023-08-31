export class Group {
    groupID: number;
    groupName: string;
    createdBy: string;
    groupAdmins: string[];
    members: string[];
    channels: string[];
    valid: boolean;

    constructor(group: { 
        groupID: number, 
        groupName: string, 
        createdBy: string, 
        groupAdmins: string[], 
        members: string[], 
        channels: string[], 
        valid: boolean 
    }) {
        this.groupID = group.groupID;
        this.groupName = group.groupName;
        this.createdBy = group.createdBy;
        this.groupAdmins = group.groupAdmins;
        this.members = group.members;
        this.channels = group.channels;
        this.valid = group.valid;
    }
}
