import axios from 'axios';
import {setUser,getUser} from './authService'


export const loginUser = async (email,password) => {

     const res = await axios.post(`http://[::1]:3000/users/login`, {
        email,
        password
      })
      .then(function (response) {
        setUser(response.data);
        return true
      })
      .catch(function (error) {
        return {
            ok:true,
            error:error
        }
      });

    return res

};



export const registerUser =  async (email,password) => {

    const res = await axios.post('http://[::1]:3000/signup', {
        username:email.split("@")[0],
        email,
        password
      })
      .then(function (response) {

        return true;
      })    
      .catch(function (error) {
        return {
            ok:true,
            error:error
        }
      });

};