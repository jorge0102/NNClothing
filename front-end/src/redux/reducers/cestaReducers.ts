import { TAction } from '../types';
import { ICestas } from '../../interfaces/ICesta';

import produce from 'immer';

// Declaramos el valor incial.
const initialState: ICestas = {
    order: []
}

export default (state = initialState, action: TAction) =>

    produce(state, draftState => {
        switch (action.type) {
            case "SET_CESTA":
                draftState.order.push(action.payload);
                break;
            case "DELETE":
                for (let i = 0; i < draftState.order.length; i++) {
                    if (draftState.order[i]?._id == action.payload) {
                        delete draftState.order[i];
                    }
                }
                break;
            default:
                return state;
        }
    });