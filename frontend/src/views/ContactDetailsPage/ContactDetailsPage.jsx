import { Component } from 'react';
import { Link } from 'react-router-dom';
import './ContactDetailsPage.scss';
import { TransferFund } from '../../cmps/TransferFund/TransferFund';
import { connect } from 'react-redux';
import { setUser, addMove } from '../../store/actions/userActions';
import {
  getContactById,
  removeContact,
} from '../../store/actions/contactActions';
import { MoveList } from '../../cmps/MoveList/MoveList';

class _ContactDetailsPage extends Component {
  state = {
    amount: null,
    contactMoves: null,
  };

  async componentDidMount() {
    await this.props.getContactById(this.props.match.params.id);
    this.contactMoves();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.getContactById(this.props.match.params.id);
    }
    if (prevProps.user.moves?.length !== this.props.user.moves?.length) {
      this.contactMoves();
    }
  }

  onDeleteContact = async () => {
    await this.props.removeContact(this.props.contact._id);
    this.props.history.push('/contact');
  };

  handleChange = ({ target }) => {
    var value = target.type === 'number' ? +target.value : target.value;
    this.setState({ amount: value });
  };

  onTransferCoins = async (ev) => {
    ev.preventDefault();
    this.props.addMove(
      this.props.contact,
      this.state.amount,
      this.props.user._id
    );
    ev.target[0].value = null;
  };

  contactMoves = () => {
    const contactMoves = this.props.user.moves.filter(
      (move) => move.toId === this.props.contact._id
    );
    this.setState({ contactMoves });
  };

  render() {
    const { contact } = this.props;
    if (!contact) return <div>Loading Contact.....</div>;
    return (
      <section className="main-layout contact-details-page">
        <Link to={'/contact'} className="back-icon">
          &larr;
        </Link>
        <div className="flex justify-center">
          <div className="flex column align-center details-content">
            <img
              src={`https://i.pravatar.cc/150?u=${contact._id}`}
              alt=""
              className="user-img"
            />
            <p>{contact.name}</p>
            <p>{contact.phone}</p>
            <p>{contact.email}</p>
            <div className="flex space-between btn-container">
              <Link to={'/contact/edit/' + contact._id} className="btn">
                Edit
              </Link>
              <button onClick={() => this.onDeleteContact()} className="btn">
                Delete
              </button>
            </div>
          </div>
          <div className="flex column">
            <TransferFund
              contactName={contact.name}
              onHandleChange={this.handleChange}
              onTransferCoins={this.onTransferCoins}
            />

            {this.state.contactMoves && this.state.contactMoves.length > 0 && (
              <MoveList
                moves={this.state.contactMoves}
                title="Your Moves:"
                isShowContact={false}
              />
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
  contact: state.contactReducer.currContact,
});

const mapDispatchToProps = {
  setUser,
  addMove,
  getContactById,
  removeContact,
};

export const ContactDetailsPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(_ContactDetailsPage);
