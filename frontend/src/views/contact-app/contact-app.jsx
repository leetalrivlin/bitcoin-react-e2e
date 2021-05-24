import { Component } from 'react';
import { connect } from 'react-redux';
import {
  loadContacts,
  removeContact,
} from '../../store/actions/contactActions';
import { Link } from 'react-router-dom';
import { ContactList } from '../../cmps/contact-list';
import { ContactFilter } from '../../cmps/contact-filter';
import './contact-app.scss';

class _ContactApp extends Component {
  componentDidMount() {
    this.loadContacts();
  }

  async loadContacts(filterBy = {}) {
    await this.props.loadContacts(filterBy);
  }

  onChangeFilter = (filterBy) => {
    this.loadContacts(filterBy);
  };

  onDeleteContact = async (contactId) => {
    await this.props.removeContact(contactId);
  };

  render() {
    const { contacts } = this.props;
    return (
      <div className="main-layout contact-page">
        <ContactFilter onChangeFilter={this.onChangeFilter} />
        <Link to={'/contact/edit/'}>
          <img
            src={require('../../assets/icons/plus-black.png').default}
            alt="Add"
            title="Add"
            className="plus-icon"
          />
        </Link>
        {contacts && (
          <ContactList
            onSelectContact={this.onSelectContact}
            contacts={contacts}
          />
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  contacts: state.contactReducer.contacts,
});

const mapDispatchToProps = {
  loadContacts,
  removeContact,
};

export const ContactApp = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactApp);
