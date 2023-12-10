import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

class LoginPage extends React.Component {

  render() {
    return (
    <div className="container" >
            <div className="row ">
                <div className="col d-flex justify-content-center">
                    <h2>Login to Servus</h2>
                </div>
            </div>
            <div className="row ">
                            <div className="col d-flex justify-content-center">
                            <GoogleLogin
                              onSuccess={credentialResponse => {
                                document.cookie = 'jwt-token='+credentialResponse.credential;
                                console.log(credentialResponse);
                                window.location.reload(false);
                              }}
                              onError={() => {
                                console.log('Login Failed');
                              }}
                            />
                            </div>
                            </div>
        </div>);
  }
}

export default LoginPage;