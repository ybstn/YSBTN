import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { EventsPage } from './components/EventsPage';
import { history } from './helpers/history';
import { authenticationService } from './services/authentication.service';
import { PrivateRoute } from './components/PrivateRoute';
import { LoginPage } from './LoginPage/LoginPage';
import { AdminPage } from './components/AdminPage'; 

import './custom.css'

export default class App extends Component {
  static displayName = App.name;
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }
    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));


    }
    logout() {
        authenticationService.logout();
        history.push('/login');
    }
  render () {
      return (
          <Router history={history}>
              <Layout>
                  <Route exact path='/' component={Home} />
                  <Route path='/events' component={EventsPage} />
                  <PrivateRoute path='/admin' component={AdminPage} />
                  <Route path="/login" component={LoginPage} />
              </Layout>
        </Router>
    );
  }
}
