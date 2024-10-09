// Enum for User Roles
export enum Role {
    ADMIN = 'ADMIN',
    USER = 'USER',
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
    notificationPreferences: boolean;
    currency: string;
}
