
import {default as initialState} from './Classes.state';
const CLASSES_LOADED = "CLASSES_LOADED"

export const ClassesReducer = (state = initialState, action) => {
    let newState = state;
    const removeErrorMessage = {message: '', error: false};
    switch (action.type) {
        case CLASSES_LOADED:
            newState = {
                ...state,
                classes: action.payload
            };
    }

    return newState;
};
