import { ILogin } from './ILogin';
import { IProfile } from './IProfile';
import { IUsers } from './IUsers';
import {  IArticles } from './IArticle';
import { ICestas } from './ICesta';


export interface IStore {
    users: IUsers;
    profile: IProfile[];
    login: ILogin | null;
    article: IArticles;
    cesta: ICestas;
}