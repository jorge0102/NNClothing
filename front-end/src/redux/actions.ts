import { ILogin } from '../interfaces/ILogin';
import { IProfile } from '../interfaces/IProfile';
import { TAction } from './types';
import { IUser } from '../interfaces/IUsers';
import { IArticle } from '../interfaces/IArticle';
import { ICesta } from '../interfaces/ICesta';
import { IPrecio } from '../interfaces/IPrecio';

export const setProfileAction = (profile: IProfile): TAction => ({ // Crear usuarios
    type: 'SET_PROFILE',
    payload: profile
});

export const setPrecioAction = (precio: IPrecio): TAction => ({ // Crear usuarios
    type: 'SET_PRECIO',
    payload: precio
});

export const setUsersAction = (users: IUser[]): TAction => ({ // Es la de pintar usuarios componente todosUsuarios
    type: 'SET_USERS',
    payload: users
});

export const SetLoginAction = (login: ILogin): TAction => ({ // Es la del login
    type: 'LOGEARTE',
    payload: login
});

export const SetArticleAction = (articles: IArticle[]): TAction => ({ // Son todos los articulos
    type: 'SET_ARTICLE',
    payload: articles
});

export const SetCestaAction = (cesta: ICesta): TAction => ({  
    type: 'SET_CESTA',
    payload: cesta
});


export const SetDeleteAction = (id: string): TAction => ({
    type: "DELETE",
    payload: id
  });

export const LogoutAction = () => ({ type: "LOGOUT" });