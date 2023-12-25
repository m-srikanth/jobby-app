import {Redirect, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    const token = Cookies.get('jwt_token')
    if (token === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <div className="homeContainer">
        <Header />
        <div className="divHome">
          <h1 className="homeHead">Find The job that fits your life</h1>
          <p className="homePara">Millions of people are searching for jobs</p>
          <Link className="link" to="/jobs">
            <button type="button" className="logoutBut">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    )
  }
}

export default Home
