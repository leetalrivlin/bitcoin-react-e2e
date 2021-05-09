import './AppHeader.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions/userActions';
import { NavLink } from 'react-router-dom';
import { userService } from '../../services/userService';

class _AppHeader extends Component {
  state = {
    isMenuOpen: false,
  };

  onLogout = async () => {
    await userService.logout();
    this.props.setUser();
  };

  onOpenMenu = () => {
    this.setState({
      isMenuOpen: true,
    });
  };

  onCloseMenu = () => {
    this.setState({
      isMenuOpen: false,
    });
  };

  render() {
    const { user } = this.props;
    const {isMenuOpen} = this.state;
    return (
      <div className="flex space-between align-center header-layout app-header">
        <NavLink exact to="/" className="flex align-center">
          <img
            src={require('../../assets/icons/bitcoin-green.png').default}
            alt="coins"
            className="green-coin"
          />
          <h1 className="logo">Bitcoin</h1>
        </NavLink>

        { isMenuOpen && <div className="full-screen show-screen" onClick={this.onCloseMenu}></div> }
        <ul
          className={
            'flex ' +
            'clean-list ' +
            'nav-list ' +
            (isMenuOpen ? 'menu-open ' : '')
          }
        >
          <li>
            <NavLink exact to="/" activeClassName="active-nav">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" activeClassName="active-nav">
              Contacts
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistic" activeClassName="active-nav">
              Statistics
            </NavLink>
          </li>
          {!user && (
            <li>
              <NavLink to="/signup" activeClassName="active-nav">
                Signup
              </NavLink>
            </li>
          )}
          {user && (
            <li>
              <p className="active-nav" onClick={this.onLogout}>
                Logout
              </p>
            </li>
          )}
        </ul>
        <button className="menu-btn" onClick={this.onOpenMenu}>
          &#9776;
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  setUser,
};

export const AppHeader = connect(
  mapStateToProps,
  mapDispatchToProps
)(_AppHeader);
