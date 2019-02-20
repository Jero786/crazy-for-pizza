// Libs
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './commons/reducer';

export default function configureStore(initialState = {}) {
    return createStore(
        rootReducer,
        composeWithDevTools()
    );
}
