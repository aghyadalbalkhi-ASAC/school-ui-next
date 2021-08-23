import {
    LOADING,
    API_SUCCESS,
    API_FAILURE,
    SCHOOLS_LOADED
} from './School.actions';

import {default as initialState} from './School.state';

export const SchoolsReducer = (state = initialState, action) => {
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

        case SCHOOLS_LOADED:
            newState = {
                ...state,
                schools: action.payload
            };
    }

    return newState;
};
