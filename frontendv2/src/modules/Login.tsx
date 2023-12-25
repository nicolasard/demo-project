import { GoogleLogin, CredentialResponse } from '@react-oauth/google';

function Login() {
  
  return (
<div className="bg-image d-flex align-items-center justify-content-center" style={{height:"100vh"}} >
    <div className="text-center container border bg-light" style={{width:"500px"}} >
    <h3 style={{ paddingTop:"20px", paddingBottom:"10px"}}>Login</h3>
        <div>
        <GoogleLogin onSuccess={onSuccess} onError={onError}/>
        </div>
        <p style={{ paddingTop:"20px"}} className='fs-6 text'>Handcrafed with <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
</svg> at nuremberg</p>
    </div>
</div>
  );
}

function onSuccess(credentialResponse: CredentialResponse){
  document.cookie = 'jwt-token='+credentialResponse.credential;
  window.location.reload();
}

function onError(){
  console.log('Login Failed');
}

export default Login;
