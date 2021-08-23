import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import thunk from "redux-thunk" 

import monitorReducersEnhancer from './enhancers/monitorReducers';
// import loggerMiddleware from './middleware/logger'
import rootReducer from './rootReducer';


export default function configureAppStore(preloadedState) {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [thunk],
        preloadedState,
        enhancers: [monitorReducersEnhancer]
    });

    // hot reload if reducers changed
    /*if (process.env.NODE_ENV !== 'production' && (module as any).hot) {

        (module as any).hot.accept('./ui', () => store.replaceReducer(rootReducer))
    }*/

    return store;
}
