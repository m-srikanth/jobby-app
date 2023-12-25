import {BrowserRouter, Switch, Route} from 'react-router-dom'

import ProtectedRout from './components/ProtectedRout'
import JobItemDetails from './components/JobItemDetails'
import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import './App.css'

// Replace your code here
const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRout exact path="/" component={Home} />
      <ProtectedRout exact path="/jobs" component={Jobs} />
      <ProtectedRout exact path="/jobs/:id" component={JobItemDetails} />
    </Switch>
  </BrowserRouter>
)

export default App
