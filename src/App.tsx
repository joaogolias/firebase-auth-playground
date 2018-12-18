/*global FB*/

import { TextField } from '@material-ui/core'
import * as React from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import './App.css'
import { ILoginInfo } from './service/auth'
import { FacebookAuth } from './service/facebook-auth'
import { GoogleAuth } from './service/google-auth'
import { LoginProvider } from './service/login-provider';

interface IAppState{
  logInInfo: ILoginInfo
}

class App extends React.Component<any, IAppState> {
  public email: string 
  public password: string
	public logInInfo: ILoginInfo 
	public loginProvider: LoginProvider

  constructor(props: any){
    super(props);
    this.state = {
      logInInfo: this.logInInfo
		}
		this.loginProvider = new LoginProvider()
  }

  // public componentWillMount() {
   
  // }


  public responseGoogle = (res: any) => {
      const logInInfo = GoogleAuth.LoginHandler(res);
      this.setState({
        logInInfo
      })
  }

  public responseFacebook = async (res: any) => {
    const logInInfo = FacebookAuth.LoginHandler(res);
    this.setState({
      logInInfo
		})
		
		await this.loginProvider.authenticate(res.accessToken, 'facebook')
  }


  public handleOnChange = (e: any) => {
    if(e.target.placeholder === "Email") {
      this.email = e.target.value
    } else {
      this.password = e.target.value
    }
  }

  public normalLogin = async () => {
		await this.loginProvider.normalLogin(this.email,this.password)
  }

  public logout = () => {
    if(this.state.logInInfo.provider.toLowerCase() === "facebook") {
      FacebookAuth.Logout()
    }

  }

  public loginResponse() {
    if(this.state.logInInfo) {
      if(this.state.logInInfo.isLogged) {
        return (
          <p className="login-success"> Usuário já está logado com {this.state.logInInfo.provider}.  
          <span className="logout" onClick={this.logout}>Clique aqui</span> para deslogar  
          </p> 
        )
      }
      if(this.state.logInInfo.error){
        return (
          <p className="login-error"> 
          Houve um erro com o login por {this.state.logInInfo.provider}. Por favor, tente novamente.
          </p> 
        )
      }
    }
    return
  }

  public render() {
    return (
      <div className="main-container">
        <div className="form-container">
        {this.loginResponse()}
        <div className="login-form">
                <TextField
                  className="form-input"
                  variant='standard'
                  placeholder="Email"
                  onChange={this.handleOnChange}
                /><br/>
                <TextField
                  className="form-input"
                  variant='standard'
                  placeholder="Senha"
                  type="password"
                  onChange={this.handleOnChange}
                /><br/>
              
            </div>
          <div className="button-container">
              <button className="login-button" onClick={this.normalLogin}>Login</button>
              <FacebookLogin
                  appId="374974243246808"
                  autoLoad={true}
                  fields="name,email,picture"
                  callback={this.responseFacebook} />,
                <GoogleLogin
                    clientId="663898834693-2ubf8452m26stqnijav9dn2rgotbucqd.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                  />,
          </div>
        </div>
      </div>
    );
  }
}

export default App;
