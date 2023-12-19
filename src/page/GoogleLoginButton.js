import { useGoogleLogin } from '@react-oauth/google'

function GoogleLoginButton() {

    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse),
    });

    return (
        <button>
            Google Button
        </button>
    );
}

export default GoogleLoginButton;