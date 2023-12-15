import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

function Login() {
  return (
<div>
    <h3>Login to Servus payments</h3>
    <GoogleLogin
                              onSuccess={credentialResponse => {
                                document.cookie = 'jwt-token='+credentialResponse.credential;
                                console.log(credentialResponse);
                                
                              }}
                              onError={() => {
                                console.log('Login Failed');
                              }}
                            />
                            

</div>
  );
}

export default Login;
