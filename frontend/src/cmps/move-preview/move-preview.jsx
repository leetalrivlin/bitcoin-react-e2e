import './move-preview.scss';

export const MovePreview = ({ move, isShowContact }) => {
  return (
    <li className="flex column align-center move-preview-container">
      <div className="flex align-center move-info">
      <img
          src={require('../../assets/icons/bitcoin-green.png').default}
          alt="coins"
          className="coins-icon"
        />
      { isShowContact && <p>To: {move.to}</p>}
      <p>At: {new Date(move.at).toLocaleString()}</p>
      <p className="flex align-center">
        <span>Amount: {move.amount}</span>
      </p>
      </div>
      <hr />
    </li>
  );
};
