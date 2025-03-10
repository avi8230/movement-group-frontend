export interface User {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    avatar: string;
}

export interface UserRegister extends User {
    password: string;
}
