import { ITokenLogin } from './ITokenLogin';

export interface ILogin extends ITokenLogin {
    token: string;
}