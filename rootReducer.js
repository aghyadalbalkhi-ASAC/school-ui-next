import {combineReducers} from 'redux';
/////////////////////////////
import {StudentsReducer} from './components/Students/Students.reducer'
import { MainReducer } from './components/Main/Main.reducer';
import {SchoolsReducer} from './components/School/School.reducer';
import {ClassesReducer} from './components/Classes/Classes.reducer'
// import {NationalitiesReducer} from './ui/settings-nationalities/Nationalities.reducer';
import {PagesReducer} from './components/PageCategories/PageCategories.reducer'
const rootReducer = combineReducers({
   
    main: MainReducer,
    schools:SchoolsReducer,
    classes:ClassesReducer,
    students:StudentsReducer,
    pages:PagesReducer
});

export default rootReducer;
