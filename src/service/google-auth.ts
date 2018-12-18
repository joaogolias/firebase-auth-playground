import { ILoginInfo } from './auth'

export namespace GoogleAuth {

    export const LoginHandler = (res: any): ILoginInfo  => {
        let logInInfo: ILoginInfo = {
            provider: 'google'
        }
        if (res.error) {
            logInInfo = {
                ...logInInfo,
                error: res.error,
                isLogged: false
            }
        } else {
          logInInfo = {
            ...logInInfo,
            data: res.authResponse,
            isLogged: true,
          }
        }
        return logInInfo
    };
    
}