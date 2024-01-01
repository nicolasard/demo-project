import Cookies from 'universal-cookie';
import { UserControllerApiFactory, UserProfile } from './generated-api/api';
import axios from 'axios';
import React from 'react';

class MyAccount extends React.Component<any,{ userProfile: UserProfile|null }>{
  
  constructor(props: any) {
    super(props);
    this.state = { userProfile:null };
    this.getProfileFromWS = this.getProfileFromWS.bind(this);
  }

  componentDidMount(){
    this.getProfileFromWS();
  }
  

  getProfileFromWS(){
    const cookies = new Cookies();
    console.log(cookies.get("jwt-token"));
    // Set your JWT token in the headers
    const jwtToken = cookies.get("jwt-token"); // Replace with your actual JWT token
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
    axios.defaults.baseURL = process.env.REACT_APP_API_PREFIX || window.location.origin;

    UserControllerApiFactory().getProfile().then((response)=>{
      if (response.status==200){
        this.setState({ userProfile: response.data});
      }
    }).catch( e => console.log(e.response.data)); //Here I'm catching the exceptions. Later this component should trigger an event to show the errors;
  }

  render() {
    if(this.state.userProfile===null){
      return(<div>Loading...</div>);
    }
    return (
      <div id='content'>
          <div>Your name: { this.state.userProfile.fullName }</div>
          <div>Your email: { this.state.userProfile.email }</div>
          <div>Currency: { this.state.userProfile.defaultCurrency?.currencyDescription} ({ this.state.userProfile.defaultCurrency?.currencySymbol}) </div>
      </div>
    );
  }
}

export default MyAccount;
