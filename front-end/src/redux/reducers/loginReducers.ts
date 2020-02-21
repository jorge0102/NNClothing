import { ILogin } from '../../interfaces/ILogin';
import { TAction } from '../types';

type TState = ILogin | null;

const initialState: TState = null

export default (state: TState = initialState, action: TAction): TState => {
    switch (action.type) {
        case "LOGEARTE":
            return action.payload
        case "LOGOUT":
            return initialState;
        default:
            return state
    }
}