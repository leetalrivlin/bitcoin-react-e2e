import { Component } from 'react';
import { bitcoinService } from '../../services/bitcoinService';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions/userActions';
import './HomePage.scss';
import { MoveList } from '../../cmps/MoveList/MoveList';
import { NavLink } from 'react-router-dom';

class _HomePage extends Component {
  state = {
    rate: null,
    contactMoves: null,
  };

  async componentDidMount() {
    await this.props.setUser();
    if (this.props.user) {
      this.bitCoinRate();
      this.contactMoves();
    }
  }

  bitCoinRate = async () => {
    const rate = await bitcoinService.getRate(this.props.user.coins);
    this.setState({ rate });
  };

  contactMoves = () => {
    const contactMoves = this.props.user.moves.slice(0, 3);
    this.setState({ contactMoves });
  };

  render() {
    const { user } = this.props;
    if (!this.bitCoinRate) return <div>Loading bitcoin rate.....</div>;
    return (
      <section className="main-layout flex space-between home-page">
        <div className="flex column align-start justify-center">
          {user && (
            <div className="home-page-content">
              <div className="hello-container">
                <h2>Hello {user.name}!</h2>
                <p className="flex align-center">
                  <img
                    src={
                      require('../../assets/icons/bitcoin-green.png').default
                    }
                    alt="coins"
                    className="coins-icon"
                  />
                  <span>Coins: {user.coins}</span>
                </p>
                <p className="flex align-center">
                  <img
                    src={require('../../assets/icons/coins.png').default}
                    alt="coins"
                    className="coins-icon"
                  />
                  <span>BTC: {this.state.rate}</span>
                </p>
              </div>
              <NavLink
                to="/contact"
                className="flex align-center justify-center btn cta-btn"
              >
                Continue Transfering
              </NavLink>
              {this.state.contactMoves &&
                this.state.contactMoves.length > 0 && (
                  <MoveList
                    moves={this.state.contactMoves}
                    title="Your last 3 moves:"
                    isShowContact={true}
                  />
                )}
            </div>
          )}
          {!user && (
            <div className="cta-container">
              <p className="cta-sentance">Start transfering with a smile</p>
              <NavLink
                to="/signup"
                className="flex align-center justify-center btn cta-btn"
              >
                Get Started
              </NavLink>
            </div>
          )}
        </div>
        <img src={require('../../assets/imgs/home-2.png').default} alt="" />
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

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage);
