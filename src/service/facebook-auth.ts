/*global FB*/
import { ILoginInfo } from './auth';

export namespace FacebookAuth {
    let facebookStarted: boolean = false;

    export const Init = () =>  {
        if(!facebookStarted) {
            window.fbAsyncInit = () => {
                FB.init({
                     appId: '374974243246808',
                     version: 'v2.6',        
                     xfbml: true,
                });
            }
            facebookStarted = true;
        }
    }

    export const LoginHandler = (res: any): ILoginInfo => {
        const logInInfo = {
            data: res, 
            isLogged: true,
            provider: 'facebook',
				}
				console.log('LoginInfo fb data: ', logInInfo.data)
        return logInInfo
    }

    export const Logout = () => {
        FB.logout((res) => {
            console.log('[Facebook] logout: ', res)
          })
    }
}