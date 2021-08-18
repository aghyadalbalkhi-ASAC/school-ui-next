import {LOADING, API_SUCCESS, API_FAILURE} from './Sample.actions';

import {default as initialState} from './Sample.state';

export const SampleReducer = (state = initialState, action: any) => {
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
            newState = {...state, loading: false, error: true, message: action.message};
            break;
    }

    return newState
};
