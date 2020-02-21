import { combineReducers } from 'redux';

// Profile es como he llamado a lo que guardo en el store
import profile from './profileReducers';
import users from './usersReducers';
import login from './loginReducers';
import articles from './articleReducers';
import cesta from './cestaReducers';
import precio from './precioReducers';

export default combineReducers({
    profile, users, login, articles, cesta, precio
});






