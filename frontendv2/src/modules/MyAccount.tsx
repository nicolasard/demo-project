import React from 'react';
import Cookies from 'universal-cookie';

function MyAccount() {
  const cookies = new Cookies();
  cookies.set('mycookie','valor',{ path: '/' });
  return (
<div>
    <h3>My account</h3>
    <div>Your name: Nicolas</div>
    <div>Your email: nicolas.ard@gmail.com</div>
</div>
  );
}

export default MyAccount;
