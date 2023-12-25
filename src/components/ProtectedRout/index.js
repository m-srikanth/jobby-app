import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const ProtectedRout = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRout
