export class User {
    username: string;
    birthdate: string;
    age: number;
    email: string;
    password: string;
    pwdconfirm: string;
    role: number;
    group: number[];
    valid: boolean;
    profilePic: string;

    constructor(username: string, birthdate: string, age: number, email: string, password: string, pwdconfirm: string, role: number, group: number[], valid: boolean,  profilePic: string) {
        this.username = username;
        this.birthdate = birthdate;
        this.age = age;
        this.email = email;
        this.password = password;
        this.pwdconfirm = pwdconfirm;
        this.role = role;
        this.group = group;
        this.valid = valid;
        this.profilePic = profilePic
    }
}