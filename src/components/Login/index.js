import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {userName: '', passWord: '', error: ''}

  updatePassword = event => {
    this.setState({passWord: event.target.value})
  }

  updateName = event => {
    this.setState({userName: event.target.value})
  }

  sendData = event => {
    event.preventDefault()
    this.getData()
  }

  updateJwt = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    if (jwtToken !== undefined) {
      const {history} = this.props
      history.replace('/')
    }
  }

  getData = async () => {
    const {userName, passWord} = this.state
    const userDetails = {
      username: userName,
      password: passWord,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      this.updateJwt(data.jwt_token)
    } else {
      this.setState({error: data.error_msg})
    }
  }

  render() {
    const {userName, passWord, error} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="div1">
        <p className="userEdit">
          <span className="userEdit1">username:</span> rahul
          <span className="userEdit1"> password:</span> rahul@2021
        </p>
        <div className="div2">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="loginLogo"
          />
          <form className="formStyle" onSubmit={this.sendData}>
            <label htmlFor="userName" className="labelStyle">
              USERNAME
            </label>
            <input
              type="text"
              value={userName}
              placeholder="Username"
              className="inputStyle"
              id="userName"
              onChange={this.updateName}
            />
            <label htmlFor="passWord" className="labelStyle">
              PASSWORD
            </label>
            <input
              type="password"
              value={passWord}
              placeholder="Username"
              className="inputStyle"
              id="passWord"
              onChange={this.updatePassword}
            />
            <button type="submit" className="loginButton">
              Login
            </button>
            <p className="errorMsg">{error}</p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
