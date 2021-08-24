import {
    LOADING,
    API_SUCCESS,
    API_FAILURE,
    PAGES_LOADED
} from './PageCategories.actions';

import {default as initialState} from './PageCategories.state';

export const PagesReducer = (state = initialState, action) => {
    let newState = state;
    const removeErrorMessage = {message: '', error: false};
    switch (action.type) {
        case LOADING:
            newState = {...state, loading: true, ...removeErrorMessage};
            break;
        case API_SUCCESS:
            newState = {...state, loading: false, ...removeErrorMessage};
            break;
        case API_FAILURE:
            newState = {
                ...state,
                loading: false,
                error: true,
                message: action.message
            };
            break;

        case PAGES_LOADED:
            newState = {
                ...state,
                pages: action.payload
            };
    }

    return newState;
};
