/* import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';


export default function () {


    const GOOGLE_WEB_CLIENT_ID = "1036385148214-bo43845mlblk40s8m0meo7c4ai3fu05d.apps.googleusercontent.com"

    GoogleSignin.configure({
         webClientId: GOOGLE_WEB_CLIENT_ID,
        // androidClientId: GOOGLE_ANDROID_CLIENT_ID,
        // iosClientId: GOOGLE_IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
    });

    const signInClick = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log(JSON.stringify(userInfo))
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) { }
            else if (error.code === statusCodes.IN_PROGRESS) { }
            else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) { }
            else { }
        }
    }
        ;

    return (
        <GoogleSigninButton
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={() => {
                signInClick()
            }}
        />
    )
} */