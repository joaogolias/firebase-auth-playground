/*global FB*/

import { TextField } from '@material-ui/core'
import * as React from 'react'
import FacebookLogin from 'react-facebook-login'
import GoogleLogin from 'react-google-login'
import './App.css'


export interface ILoginInfo {
  isLogged?: boolean
  provider: string
  data?: any
}

interface IAppState{
  logInInfo: ILoginInfo
}

class App extends React.Component<any, IAppState> {
  public email: string 
  public password: string
  public logInInfo: ILoginInfo 

  constructor(props: any){
    super(props);
    this.state = {
      logInInfo: this.logInInfo
    }
  }

  public responseFacebook = (res: any) => {
    const logInInfo = {
      data: res.authResponse,
      isLogged: true,
      provider: 'facebook',
    }

    this.setState({
      logInInfo
    })

    
    // window.fbAsyncInit = () => {
    //   FB.init({
    //     appId      : '374974243246808',
    //     version: 'v2.6',        
    //     xfbml      : true,
    //     });
    // }
  }

  public responseGoogle = (res: any) => {
    console.log('res: ', res);
    if (res.error) {
      console.log('caiu no erro')
    } else {
      const logInInfo = {
        data: res.authResponse,
        isLogged: true,
        provider: 'google',
      }
  
      this.setState({
        logInInfo
      })
    }
  }
  public componentWillMount() {
   

    // FB.getLoginStatus((res: FB.LoginStatusResponse) => {
    //   if (res.status === "connected") {
    //     const logInInfo = {
    //       data: res.authResponse,
    //       isLogged: true,
    //       provider: 'facebook',
    //     }

    //     this.setState({
    //       logInInfo
    //     })

    //   } 
    // })
  }

  public normalLogin() {
    console.log('Normal login')
  }

  public handleOnChange = (e: any) => {
    if(e.target.placeholder === "Email") {
      this.email = e.target.value
    } else {
      this.password = e.target.value
    }
  }

  public login = () => {
    this.setState({
      logInInfo: {
        isLogged: true,
        provider: 'facebook'
      }
    })
  }

  public logout = () => {
    if(this.state.logInInfo.provider.toLowerCase() === "facebook") {
      FB.logout((res) => {
        console.log('logout: ', res)
      })
    }
  }

  public render() {
    return (
      <div className="main-container">
        <div className="form-container">
        { this.state.logInInfo && this.state.logInInfo.isLogged &&
          <p> Usuário já está logado com {this.state.logInInfo.provider}. 
          <span className="logout" onClick={this.logout}> Clique aqui </span> para deslogar  
          </p> }
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
              {/* <button className="btn btn-success" onClick={this.loginCommand}><i className="fa fa-sign-in"/>{' '}Log In</button> */}
              <button className="login-button" onClick={this.normalLogin}>Login</button>
            </div>
          {/* <Form className="login-form">
            <Input className="form-input" placeholder="Nome" />
            <Input className="form-input" placeholder="Senha" />
            <Button className="submit-login" variant="raised">Login</Button>
          </Form> */}
          <div className="button-container">
          <FacebookLogin
              appId="374974243246808"
              autoLoad={true}
              fields="name,email,picture"
              onClick={this.login}
              callback={this.responseFacebook} />,
            {/* <button className="facebook-login"><img className="company-logo" src={require('./icons/facebook-icon.png')}/> Facebook </button> */}
            <GoogleLogin
                clientId="976690849194-r8vga09mbnlp8upssajkqq5pjk6k29qn.apps.googleusercontent.com"
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
