import React, { useEffect } from 'react';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const LoginWithGoogle = () => {
    const clientId = '365928126558-9glav4t5a2ejp26gv7orp7vsrc5qc689.apps.googleusercontent.com';
    useEffect(() => {
        gapi.load('client:auth2', () => {
            gapi.auth2.init({ clientId: clientId });
        });
    }, []);

    const responseGoogle = (response) => {
        console.log(response);
    };
    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                redirectUri="http://localhost:3000/faq"
            />
        </div>
    );
};

export default LoginWithGoogle;
