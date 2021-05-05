import { Component } from 'react';
import { ContactList } from '../../cmps/ContactList';
import { ContactFilter } from '../../cmps/ContactFilter';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  loadContacts,
  removeContact,
} from '../../store/actions/contactActions';
import './ContactPage.scss';

class _ContactPage extends Component {
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

export const ContactPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactPage);
