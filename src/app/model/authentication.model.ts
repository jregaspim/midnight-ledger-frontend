interface BaseRequest {
    email: string;
    password: string;
}

export interface AuthenticationRequest extends BaseRequest { }

export interface RegisterRequest extends BaseRequest {
    firstName: string;
    lastName: string;
}

export interface AuthenticationResponse {
    token: string;
}
