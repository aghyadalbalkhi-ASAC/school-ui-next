
import {default as initialState} from './Students.state';
const STUDENTS_LOADED = "STUDENTS_LOADED"

export const StudentsReducer = (state = initialState, action) => {
    let newState = state;
    const removeErrorMessage = {message: '', error: false};
    switch (action.type) {
        case STUDENTS_LOADED:
            newState = {
                ...state,
                students: action.payload
            };
    }

    return newState;
};
