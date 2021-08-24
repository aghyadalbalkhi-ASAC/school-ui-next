import jwt_decode from "jwt-decode";

export const setUser = (data) => {

    localStorage.setItem('token',data.token);
    // localStorage.setItem('user', JSON.stringify(data.user));

};

export const getUser = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    // const token = JSON.parse(localStorage.getItem('token') || 'null');
    if (!token) {
        return false;
    }

    const user = _getTokenData();
    return user;
};

export const removeUser = () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('user');
};

export const is = (role) => {
    const token = localStorage.getItem('token') || '';
    if (!token) {
        return false;
    }
    const decoded = jwt_decode(token);
    return decoded.roles.indexOf(role) !== -1;
};

export const getToken = () => {
    return localStorage.getItem('token') || '';
};

const _getTokenData = () => {
    const token = localStorage.getItem('token') || '';
    if (!token) {
        return {};
    }
    return jwt_decode(token);
};

export const isValidToken = () => {
    const decoded = _getTokenData();
    if (!decoded.exp) {
        return false;
    }
    return new Date(decoded.exp * 1000).getTime() > new Date().getTime();
};