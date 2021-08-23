import {
    LOADING,
    AUTH_STATE,
    MAP_ACTIONS,
    SET_FULL_HEIGHT_PAGE
} from './Main.actions';
import {getUser,removeUser, setUser} from '../../services/authService';

// import {history} from 'react-router-guard';
// import call from "../../services/api";

class MainModel {
     isLoggedUser(data) {
        return {
            type: AUTH_STATE,
            payload: data
        };
    }

    checkLoggedUserAction() {

        const user = getUser();
        return {
            type: AUTH_STATE,
            payload: user
        };
    }

    logoutAction() {
        removeUser();
        goToLink('/auth');
        return {
            type: AUTH_STATE,
            payload: null
        };
    }

    setMainMapActions(actions) {
        return {
            type: MAP_ACTIONS,
            payload: actions
        };
    }

    setFullHeightPageAction(isFullHeight) {
        return {
            type: SET_FULL_HEIGHT_PAGE,
            payload: isFullHeight
        };
    }

    asyncMainAction(data) {
        return async (dispatch, getState) => {
            dispatch({
                type: LOADING,
                payload: data
            });


        };
    }

    setLanguageAction(language) {
        return async (dispatch, getState) => {


            let result;

            try {
                // result = await call({
                //     path: '/[unknown]',
                //     method: 'POST',
                //     data: {
                //         language
                //     }
                // });



                setUser(result);

                return true;

            } catch (e) {
                return e;
            }


        };
    }
}

export default MainModel;
