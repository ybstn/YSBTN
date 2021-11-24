import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

    render() {
    return (
      <header>
            <Navbar variant="pills" className="UserNavBar navbar-expand-sm navbar-toggleable-sm ng-white" light>
          <Container>
                    <NavbarBrand tag={RRNavLink} to="/">YBSTN</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                                <NavLink tag={RRNavLink} className="d-none d-sm-block MenuLink text-light" to="/" activeClassName="MenuLinkActive" exact path="/">АЛЬБОМЫ</NavLink>
                                <NavLink tag={RRNavLink} className="d-xs-block d-sm-none MenuLink text-dark" style={{ textShadow:'none'}}
                                    to="/" activeClassName="MenuLinkActive" exact path="/">АЛЬБОМЫ</NavLink>
                </NavItem>
                <NavItem>
                                <NavLink tag={RRNavLink} className="d-none d-sm-block MenuLink text-light" to="/events" activeClassName="MenuLinkActive">СОБЫТИЯ</NavLink>
                                <NavLink tag={RRNavLink} className="d-xs-block d-sm-none MenuLink text-dark " style={{ textShadow: 'none' }}
                                    to="/events" activeClassName="MenuLinkActive">СОБЫТИЯ</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
