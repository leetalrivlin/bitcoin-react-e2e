import './Confirm.scss';

export const Confirm = ({ question, onClose, onConfirm }) => {
  return (
    <section className="flex column justify-center align-center confirm">
      <p>{question}</p>
      <div className="flex space-between btn-container">
        <button className="btn" onClick={onConfirm}>OK</button>
        <button className="btn" onClick={onClose}>Close</button>
      </div>
    </section>
  );
};
