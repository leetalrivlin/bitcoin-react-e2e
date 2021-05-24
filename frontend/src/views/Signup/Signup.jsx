import { Component } from 'react';
import { userService } from '../../services/userService';
import './signup.scss';

export class Signup extends Component {
  state = {
    user: null,
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState((prevState) => ({
      user: { ...prevState.user, [field]: value },
    }));
  };

  onSaveUser = async (ev) => {
    ev.preventDefault();
    const logedinUser = await userService.signup(this.state.user);
    this.setState({ user: logedinUser });
    ev.target[0].value = '';
    this.props.history.push('/');
  };

  render() {
    return (
      <section className="flex column align-center main-layout signup-container">
        <form onSubmit={this.onSaveUser}>
          <h3>Please enter your name:</h3>
          <div className="flex align-center space-between input-container">
            <input
              required
              type="text"
              id="name"
              onChange={this.handleChange}
              name="name"
              placeholder="Enter your name"
            />
            <button className="btn signup-btn">Signup</button>
          </div>
        </form>
      </section>
    );
  }
}
