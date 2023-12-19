import { useRef } from 'react';
import useScript from '../hooks/useScript';

// https://github.com/anthonyjgrove/react-google-login/issues/502
// https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse
export default function GoogleLogin() {
    const googleSignInButton = useRef(null);


    useScript('https://accounts.google.com/gsi/client', () => {
        // https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.initialize
        window.google.accounts.id.initialize({
            client_id: "787323111781-di6f7rf1qa8c4u3lie57vjiftc53amvk.apps.googleusercontent.com",
            // callback: onGoogleSignIn,
        });
        // https://developers.google.com/identity/gsi/web/reference/js-reference#google.accounts.id.renderButton
        window.google.accounts.id.renderButton(
            googleSignInButton.current,
            { theme: 'fulfilled', size: 'large', width: '450'}, // customization attributes
        );
    });

    return <div ref={googleSignInButton}></div>;
}