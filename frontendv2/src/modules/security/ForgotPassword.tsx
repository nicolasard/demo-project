import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useState,ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';



function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');

  const [password, setPassword] = useState<string>('');

  const [errorMessage, setErrorMessage] = useState<string>('');

  function handleChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  return (
<div className="bg-image d-flex align-items-center justify-content-center" style={{height:"100vh"}} >
    <div className="text-center container border bg-light" style={{width:"500px", opacity:"90%"}} >
    <h3 style={{ paddingTop:"20px", paddingBottom:"10px"}}>Forgot Password</h3>
    <form>
        <div className="row g-2 align-items-center">
          <div className="mb-3">
            <input type="email" id="email" className="form-control" placeholder="Email" onChange={handleChangeEmail}/>
          </div>
          <button type="submit" className="btn btn-primary" formAction='#' >Forgot Password</button>
        </div>
        </form>
        <p style={{ paddingTop:"20px"}} className='fs-6 text'>Handcrafted with <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
</svg> in Nürnberg</p>
    </div>
</div>
  );
}
export default ForgotPassword;
