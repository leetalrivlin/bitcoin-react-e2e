import './AppHeader.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions/userActions';
import { NavLink } from 'react-router-dom';
import { userService } from '../../services/userService';
import { Confirm } from '../Confirm/Confirm';

class _AppHeader extends Component {
  state = {
    isMenuOpen: false,
    isConfirmOpen: false,
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
  
  onOpenConfirm = () => {
    this.setState({
      isConfirmOpen: true,
    });
  };
  
  onLogout = async () => {
    await userService.logout();
    await this.props.setUser();
    this.onCloseConfirm();
  };

  onCloseConfirm = () => {
    this.setState({
      isConfirmOpen: false,
    });
  };
  
  render() {
    const { user } = this.props;
    const { isMenuOpen, isConfirmOpen } = this.state;
    return (
      <section className="flex space-between align-center header-layout app-header">
        <NavLink exact to="/" className="flex align-center">
          <img
            src={require('../../assets/icons/bitcoin-green.png').default}
            alt="coins"
            className="green-coin"
          />
          <h1 className="logo">Bitcoin</h1>
        </NavLink>

        {isMenuOpen && (
          <div
            className="full-screen show-screen"
            onClick={this.onCloseMenu}
          ></div>
        )}
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
              <p className="active-nav" onClick={this.onOpenConfirm}>
                Logout
              </p>
            </li>
          )}
        </ul>
        <button className="menu-btn" onClick={this.onOpenMenu}>
          &#9776;
        </button>
        {isConfirmOpen && (
          <Confirm
            question="Are you sure you want to logout?"
            onClose={this.onCloseConfirm}
            onConfirm={this.onLogout}
          />
        )}
      </section>
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
