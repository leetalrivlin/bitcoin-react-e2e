import './contact-list.scss'
import { ContactPreview } from '../contact-preview';

export function ContactList({ contacts, onSelectContact }) {

    return (
      <div className="flex column align-center contact-list">
        {
          contacts && contacts.map(contact => <ContactPreview onSelectContact={onSelectContact} key={contact._id} contact={contact} />)
        }
      </div>
    )
  }
