import {isValidToken, removeUser} from "../../services/authService";
const mustAuth = (route: any) => {

    return new Promise((resolve, reject) => {
        // some my own notification set up with Redux
        const loggedIn = isValidToken();
        if (!loggedIn) {
            /*store.dispatch({
                type: 'TURN_ON_NOTICE',
                payload: {
                    message: 'Please sign in to access this section',
                    variant: 'error',
                }
            });*/
            // end of notification set-up
            removeUser();
            reject(new Error('/auth'));
        }
        resolve(true);
    });
};
export default mustAuth;
