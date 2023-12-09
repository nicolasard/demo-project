import logo from './logo.svg';
import './App.css';
import { GoogleLogin } from '@react-oauth/google';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function App() {

  if(getCookie('jwt-token')){
    return (
    <div className="App">
    <h2>You are logged</h2>
    </div>
    );
  }
  return (
    <div className="App">
    <Container>
        <Row>
            <Col>
                <h2>Login to Servus</h2>
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
            </Col>
        </Row>
    </Container>
    </div>
  );
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export default App;
