export class User {
    public personId: number;
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public userName: string;
    public password: string;
    public confirmpassword: string;
    public dob: string;
    public phone: number;
    public isActive: boolean;
    public roles: string;
}

export class LoginUser {
    public username: string;
    public password: string;
    
}

export class SessionStore {
    public userName: string;
    public userRole: string;
    public token: string;
    public firstName: string;
    public personId : number;
    public isActive: boolean
}