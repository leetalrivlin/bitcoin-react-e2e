import './TransferFund.scss';

export const TransferFund = ({ contactName, onHandleChange, onTransferCoins }) => {
  return (
    <section className="transfer-fund-container">
      <h3>Transfer coins to {contactName}:</h3>
      <form className="flex justify-center align-center" onSubmit={onTransferCoins}>
        <label htmlFor="amount">Amount:</label>
        <input
          required
          type="number"
          id="amount"
          onChange={onHandleChange}
          name="amount"
        />
        <button className="btn">Transfer</button>
      </form>
    </section>
  );
};
