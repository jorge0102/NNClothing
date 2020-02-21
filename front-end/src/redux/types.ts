import { ILogin } from '../interfaces/ILogin';
import { IProfile } from '../interfaces/IProfile';
import { IUser } from '../interfaces/IUsers';
import { IArticle } from '../interfaces/IArticle';
import { ICesta } from '../interfaces/ICesta';
import { IPrecio } from '../interfaces/IPrecio';

interface ISetTodoAction {
    type: 'SET_PROFILE';
    payload: IProfile;
};

interface ISetPrecioAction {
    type: 'SET_PRECIO';
    payload: IPrecio;
};

interface ISetUsersAction {
    type: 'SET_USERS';
    payload: IUser[];
}

interface IRemoveUserAction {
    type: 'BORRAR_USUARIO';
    payload: string;
}

interface SetLoginAction {
    type: 'LOGEARTE';
    payload: ILogin;
}

interface SetArticleAction {
    type: 'SET_ARTICLE';
    payload: IArticle[];
}

interface SetCestaAction {
    type: 'SET_CESTA';
    payload: ICesta;
}

interface SetDeleteAction {
    type: 'DELETE';
    payload: string;
}

interface ILogoutAction {
    type: 'LOGOUT';
}

export type TAction =
    ISetTodoAction
    | ISetUsersAction
    | IRemoveUserAction
    | SetLoginAction
    | SetArticleAction
    | ILogoutAction
    | SetCestaAction
    | SetDeleteAction
    | ISetPrecioAction;

