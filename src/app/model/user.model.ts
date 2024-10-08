export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
    // Add other roles as needed
}

export interface User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: Role;
}


export interface UserSettings {
    notificationPreferences: boolean,
    currency: string;
};