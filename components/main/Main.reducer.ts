import {
    LOADING,
    API_SUCCESS,
    API_FAILURE,
    AUTH_STATE,
    MAP_ACTIONS,
    SET_FULL_HEIGHT_PAGE
} from './Main.actions';

import {default as initialState} from './Main.state';

export const MainReducer = (state = initialState, action: any) => {
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
        case AUTH_STATE:

            newState = {
                ...state,
                isLoggedUser: !!(action.payload && action.payload.user_id),
                user: action.payload
            };
            break;
        case MAP_ACTIONS:
            let isFullHeightPage = false;
            if (action.payload.length) {
                isFullHeightPage = true;
            }
            newState = {...state, mapActions: action.payload, isFullHeightPage};
            break;

        case SET_FULL_HEIGHT_PAGE:
            newState = {
                ...state,
                isFullHeightPage: action.payload
            };
    }

    return newState;
};
