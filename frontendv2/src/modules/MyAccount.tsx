import { UserControllerApiFactory, UserProfile } from './generated-api/api';
import React from 'react';
import ApiClient from './common/ApiClient';

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
    ApiClient.setupAxiosHeaders();
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
