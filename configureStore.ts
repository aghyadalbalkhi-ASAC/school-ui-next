import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';

import monitorReducersEnhancer from './enhancers/monitorReducers';
// import loggerMiddleware from './middleware/logger'
import rootReducer from './rootReducer';

export type AppState = ReturnType<typeof rootReducer>;

export default function configureAppStore(preloadedState?: any) {
    const store = configureStore({
        reducer: rootReducer,
        middleware: [
            /*loggerMiddleware, */ ...getDefaultMiddleware({
                serializableCheck: false
            })
        ],
        preloadedState,
        enhancers: [monitorReducersEnhancer]
    });

    // hot reload if reducers changed
    /*if (process.env.NODE_ENV !== 'production' && (module as any).hot) {

        (module as any).hot.accept('./ui', () => store.replaceReducer(rootReducer))
    }*/

    return store;
}
