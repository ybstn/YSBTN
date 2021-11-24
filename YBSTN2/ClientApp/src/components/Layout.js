import React, { Component } from 'react';
import { NavMenu } from './NavMenu';

import { AdminNavMenu } from './AdminNavMenu';
import { authenticationService } from '../services/authentication.service';
export class Layout extends Component {
  static displayName = Layout.name;

    render() {
       
        let currentUser = authenticationService.isLogedIn();
        let menu;
        if (currentUser) {
            menu = <AdminNavMenu />;
        }
        else {
            menu = <NavMenu />;
        }
    return (
        <div className="MainContainer">

            {menu}
            <div className="container-fluid p-0 PageContainer">
              {this.props.children}
        </div>
      </div>
    );
  }
}
