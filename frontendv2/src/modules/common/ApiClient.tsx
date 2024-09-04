import axios from 'axios';
import Cookies from 'universal-cookie';
import { UserControllerApiFactory } from '../generated-api/api';

/*
 * Api client is the client to common client interface that consumes the backend api.
 */
class ApiClient{


    static setupAxiosHeaders(){
        const cookies = new Cookies();
        const jwtToken = cookies.get('jwt-token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
        axios.defaults.baseURL = process.env.REACT_APP_API_PREFIX || window.location.origin;
    }

}

export default ApiClient;