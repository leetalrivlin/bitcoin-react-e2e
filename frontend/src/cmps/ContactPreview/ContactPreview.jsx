import { Link } from 'react-router-dom'
import './ContactPreview.scss';

export function ContactPreview({ contact }) {
  return (
    <Link to={'/contact/' + contact._id} className="contact-preview">
      <div className="flex align-center">
        <img src={`https://i.pravatar.cc/150?u=${contact._id}`} alt="" />
        <p>{contact.name}</p>
      </div>
    </Link>
  );
}
