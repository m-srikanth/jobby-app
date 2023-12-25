import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const changeRout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="navStyle">
      <img
        src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        alt="website logo"
        className="webLogo"
      />
      <div className="navDiv">
        <Link className="link" to="/">
          <p>Home</p>
        </Link>
        <Link className="link" to="/jobs">
          <p>Jobs</p>
        </Link>
      </div>
      <button type="button" className="logoutBut" onClick={changeRout}>
        Logout
      </button>
    </nav>
  )
}

export default withRouter(Header)
