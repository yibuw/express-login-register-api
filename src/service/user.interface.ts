export interface IUserInfo {
    name: string;
    email: string;
    password: string;
    hashedPassword: string;
    name_norm: string;
    email_norm: string;
}
export interface IUserLogin {
    password: string;
    email_norm: string;
}

export interface ITokenInfo {
    message: string;
    accessToken: string;
    refreshToken: string;
}
export interface IUserService {
    register(info: IUserInfo): Promise<ITokenInfo>;
    login(info: IUserLogin): Promise<Omit<ITokenInfo, 'message'>>;
}
