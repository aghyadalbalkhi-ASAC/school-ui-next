import {isValidToken} from "../../services/authService";

const mustUnAuth = (route: any) => {
    return new Promise((resolve, reject) => {

        const loggedIn = isValidToken();
        if (loggedIn) {
            reject(new Error('/dashboard/jobs'));
        }else{
            resolve(true);
        }
    });
};
export default mustUnAuth;
