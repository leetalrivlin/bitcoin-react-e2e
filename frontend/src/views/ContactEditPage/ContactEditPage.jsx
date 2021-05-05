import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { contactService } from '../../services/contactService';
import { connect } from 'react-redux';
import { saveContact, removeContact } from '../../store/actions/contactActions';
import './ContactEditPage.scss';

class _ContactEditPage extends Component {
  state = {
    contact: null,
    errMsg: '',
  };
  async componentDidMount() {
    const { id } = this.props.match.params;
    try {
      const contact = id
        ? await contactService.getContactById(id)
        : contactService.getEmptyContact();
      this.setState({ contact });
    } catch (err) {
      this.setState({ errMsg: 'Contact Not Found' });
    }
  }

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.type === 'number' ? +target.value : target.value;
    this.setState((prevState) => ({
      contact: { ...prevState.contact, [field]: value },
    }));
  };
  onSaveContact = async (ev) => {
    ev.preventDefault();
    await this.props.saveContact({ ...this.state.contact });
    this.props.history.push('/contact');
  };

  onDeleteContact = async (contactId) => {
    await this.props.removeContact(contactId);
    this.props.history.push('/contact');
  };

  get title() {
    const title = this.state.contact._id ? 'Edit Contact' : 'Add New Contact';
    return title;
  }

  render() {
    if (!this.state.contact) return <div>{this.state.errMsg || 'Loading'}</div>;
    const { name, phone, email } = this.state.contact;
    const route = this.state.contact._id
      ? `/contact/${this.state.contact._id}`
      : '/contact';
    return (
      <div className="main-layout contact-edit-page">
        <Link to={route}className="back-icon">&larr;</Link>

        <h2 className="edit-title">{this.title}</h2>
        <form
          className="flex column contact-edit"
          onSubmit={this.onSaveContact}
        >
          <div className="flex space-between align-center">
            <label htmlFor="name">Name:</label>
            <input
              required
              type="text"
              id="name"
              value={name}
              onChange={this.handleChange}
              name="name"
              placeholder="Enter contact name"
            />
          </div>

          <div className="flex space-between align-center">
            <label htmlFor="phone">Phone:</label>
            <input
              required
              type="tel"
              id="phone"
              value={phone}
              onChange={this.handleChange}
              name="phone"
              placeholder="Enter phone-number"
            />
          </div>

          <div className="flex space-between align-center">
            <label htmlFor="email">Email:</label>
            <input
              required
              type="email"
              id="email"
              value={email}
              onChange={this.handleChange}
              name="email"
              placeholder="Enter email"
            />
          </div>

          <p>{this.state.errMsg}</p>

          <section className="flex space-between">
            <button className="btn form-btn">Save Contact</button>
            <button
              onClick={() => this.onDeleteContact(this.state.contact._id)}
              className="btn form-btn delete-btn"
            >
              Delete Contact
            </button>
          </section>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  saveContact,
  removeContact,
};

export const ContactEditPage = connect(
  null,
  mapDispatchToProps
)(_ContactEditPage);
