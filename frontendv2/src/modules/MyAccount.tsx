import Cookies from 'universal-cookie';
import { UserControllerApiFactory, UserProfile } from './generated-api/api';
import axios from 'axios';
import React from 'react';

class MyAccount extends React.Component<any,{ name: string|null, email: string|null, userId: number|null }>{
  
  constructor(props: any) {
    super(props);
    this.state = { name:null, email:null, userId:null };
    this.getProfileFromWS = this.getProfileFromWS.bind(this);
  }

  componentDidMount(){
    this.getProfileFromWS();
  }

  getProfileFromWS(){
    const cookies = new Cookies();
    cookies.set('mycookie','valor',{ path: '/' });
    console.log(cookies.get("jwt-token"));
    // Set your JWT token in the headers
    const jwtToken = cookies.get("jwt-token"); // Replace with your actual JWT token
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

    UserControllerApiFactory().getProfile().then((response)=>{
      if (response.status==200){
        this.setState({ name: response.data.fullName!, email:response.data.email!, userId:response.data.internalId!});
      }
    });
  }

  render() {
    if(this.state.name===''){
      return(<div>Loading...</div>);
    }
    return (
      <div>
          <h3>My account</h3>
          <div>ID: { this.state.userId }</div>
          <div>Your name: { this.state.name }</div>
          <div>Your email: { this.state.email }</div>
      </div>
    );
  }
}

export default MyAccount;
