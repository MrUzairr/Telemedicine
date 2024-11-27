import React from 'react'
import {useGoogleLogin} from '@react-oauth/google';
import { googleAuth } from '../../api';
import './index.css'
import { FcGoogle } from "react-icons/fc";

function GoogleLogin(){
    const responseGoogle = async(authResult) => {
        try {
            if(authResult['code']){
                const result = await googleAuth(authResult.code);
                const {email} = result.data.user;
                const token = result.data.token;
				const obj = {email,token};
				localStorage.setItem('user-info',JSON.stringify(obj));
                console.log("result.data.user..",result.data.user)
                window.location.href = "/"
            }
            else{
                console.log(authResult);
                throw new Error(authResult);
            }
        } catch (err) {
            console.log('Error while requesting google code: ',err)

        }
    }
    const loginGoogle = useGoogleLogin({
        onSuccess: responseGoogle,
        onError: responseGoogle,
        flow: 'auth-code'
    })
    return(
            <button className='google-login' onClick={loginGoogle}><FcGoogle/> Login with Google</button>
    )
}
export default GoogleLogin;
