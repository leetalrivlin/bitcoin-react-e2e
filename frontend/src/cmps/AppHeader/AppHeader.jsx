import './AppHeader.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions/userActions';
import { NavLink } from 'react-router-dom';
import { userService } from '../../services/userService';

class _AppHeader extends Component {

  onLogout = async () => {
    await userService.logout();
    this.props.setUser();
  };

  render() {
    const { user } = this.props;
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

        <ul className="flex clean-list nav-list">
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
              <p className="active-nav" onClick={this.onLogout}>Logout</p>
            </li>
          )}
        </ul>
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

export const AppHeader = connect(mapStateToProps, mapDispatchToProps)(_AppHeader);
