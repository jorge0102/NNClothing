// Importo las librerias que me hacen falta
import { IUsers } from '../../interfaces/IUsers';
import produce from 'immer';
import { TAction } from '../types';

// esto es para traerlo en objetos
const initialState: IUsers = {
    byId: {},
    order: [],
    selectedId: null
}


export default (state = initialState, action: TAction) =>

    produce(state, draftState => {
        switch (action.type) {
            case "SET_USERS":

                const users = action.payload;

                draftState.byId = {};
                draftState.order = [];
                draftState.selectedId = null;

                users.forEach(user => {
                    draftState.byId[user._id] = user;
                    draftState.order.push(user._id);
                });
                break;
            case "LOGOUT":
                return initialState;
            default:
                return state;
        }
    });