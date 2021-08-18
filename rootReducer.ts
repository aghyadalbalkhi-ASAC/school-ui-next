import {combineReducers} from 'redux';
/////////////////////////////

import { MainReducer } from './components/main/Main.reducer';
// import {NationalitiesReducer} from './ui/settings-nationalities/Nationalities.reducer';
const rootReducer = combineReducers({
   
    main: MainReducer,
    // pages:PagesReducer
});

export default rootReducer;
