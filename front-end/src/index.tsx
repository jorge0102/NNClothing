import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import reducers from './redux/reducers';



import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducers, composeWithDevTools())

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter >
    , document.getElementById('root'));



