import {
    LOADING,
    AUTH_STATE,
    MAP_ACTIONS,
    SET_FULL_HEIGHT_PAGE
} from './Main.actions';
import {getUser, goToLink, isBusinessUser, removeUser, setUser} from '../../services/authService';

import {history} from 'react-router-guard';
import {SAVING_SETTINGS, SETTINGS_SAVED} from "../business-settings/BusinessSettings.actions";
import call from "../../services/api";

class MainModel {
    public static isLoggedUser(data: any) {
        return {
            type: AUTH_STATE,
            payload: data
        };
    }

    public static checkLoggedUserAction() {

        const user = getUser();
        return {
            type: AUTH_STATE,
            payload: user
        };
    }

    public static logoutAction() {
        removeUser();
        goToLink('/auth');
        return {
            type: AUTH_STATE,
            payload: null
        };
    }

    public static setMainMapActions(actions: any) {
        return {
            type: MAP_ACTIONS,
            payload: actions
        };
    }

    public static setFullHeightPageAction(isFullHeight: boolean) {
        return {
            type: SET_FULL_HEIGHT_PAGE,
            payload: isFullHeight
        };
    }

    public static asyncMainAction(data: any) {
        return async (dispatch: any, getState: any) => {
            dispatch({
                type: LOADING,
                payload: data
            });


        };
    }

    public static setLanguageAction(language: string) {
        return async (dispatch: any, getState: any) => {


            let result;

            try {
                result = await call({
                    path: '/[unknown]',
                    method: 'POST',
                    data: {
                        language
                    }
                });



                setUser(result);

                return true;

            } catch (e) {
                return e;
            }


        };
    }
}

export default MainModel;
