import { Profile } from './Profile';

export class User {
    id: number;
    name: string;
    login: string;
    email: string;
    password: string;
    newPassword: string;
    
    profile: Profile = new Profile();
}