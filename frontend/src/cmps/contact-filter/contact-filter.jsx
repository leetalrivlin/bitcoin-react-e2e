import { Component } from 'react';
import './contact-filter.scss';

export class ContactFilter extends Component {
  state = {
    term: '',
  };
  handleChange = ({ target }) => {
    const field = target.name
    const value = target.type === 'number' ? +target.value : target.value
    this.setState({ [field]: value }, () => {
        this.props.onChangeFilter({ ...this.state })
    })
}
  render() {
    const { term } = this.state
    return (
        <form className="flex column align-start contact-form" onSubmit={(ev) => ev.preventDefault()}>
          <label htmlFor="term">Search Contact</label>
          <input
            type="text"
            placeholder="Search"
            id="term"
            name="term"
            value={term}
            onChange={this.handleChange}
          />
        </form>
    );
  }
}
