export interface AuthenticationRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
}


export interface AuthenticationResponse {
    token: string;
}
