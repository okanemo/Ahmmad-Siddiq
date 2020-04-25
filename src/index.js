import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Login from '../src/components/screen/Login';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux';
import store from '../src/redux/Store';
import Dashboard from '../src/components/screen/Dashboard';
import DashboardAdmin from '../src/components/screen/DashboardAdmin';
import Register from '../src/components/screen/Register';
import Forgote from '../src/components/screen/Forgote';
const Data = () => {
  return(
    <Provider store={store}>
      <Router>
        <Route path='/' exact component={Login} />
        <Route path='/Dashboard' component={Dashboard} />
        <Route path='/Dashboard-admin' component={DashboardAdmin} />
        <Route path='/Register' component={Register} />
        <Route path='/Forgote' component={Forgote} />
      </Router>
    </Provider>
  )
}

ReactDOM.render(<Data />,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
