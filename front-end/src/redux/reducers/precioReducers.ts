import { TAction } from '../types'

// Declaramos el valor incial.
const initialState = "";

// Declaramos las acciones que va a hacer Profiler
export default (state = initialState, action: TAction) => {
    switch (action.type) {
        case "SET_PRECIO":
            return action.payload;
        case "LOGOUT":
            return initialState;
        default:
            return state
    }
};
