import { TAction } from '../types';
import { IArticles } from '../../interfaces/IArticle';
import produce from 'immer';


// esto es para traerlo en objetos
const initialState: IArticles = {
    byId: {},
    order: [],
    selectedId: null
}


export default (state = initialState, action: TAction) =>

    produce(state, draftState => {
        switch (action.type) {
            case "SET_ARTICLE":

                const article = action.payload;

                draftState.byId = {};
                draftState.order = [];
                draftState.selectedId = null;

                article.forEach(article => {
                    draftState.byId[article._id] = article;
                    draftState.order.push(article._id);
                });
                break;
            case "LOGOUT":
                return initialState;
            default:
                return state;
        }
    });