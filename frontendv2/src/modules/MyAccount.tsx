import Cookies from 'universal-cookie';
import { UserControllerApi, UserControllerApiFactory } from './generated-api/api';
import { Configuration } from './generated-api/configuration';
import axios from 'axios';

function MyAccount() {
  const cookies = new Cookies();
  cookies.set('mycookie','valor',{ path: '/' });
  console.log(cookies.get("jwt-token"));
// Set your JWT token in the headers
const jwtToken = cookies.get("jwt-token"); // Replace with your actual JWT token
axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  UserControllerApiFactory().getProfile();
  return (
<div>
    <h3>My account</h3>
    <div>Your name: Nicolas</div>
    <div>Your email: nicolas.ard@gmail.com</div>
</div>
  );
}

export default MyAccount;
