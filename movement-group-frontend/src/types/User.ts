export interface User {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
    createdAt: string;
    updatedAt: string;
}

export type RegisterUser = Omit<User, '_id' | 'createdAt' | 'updatedAt'> & { password: string };

