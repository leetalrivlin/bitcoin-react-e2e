import { MovePreview } from '../move-preview/move-preview';
import './move-list.scss';

export const MoveList = ({ moves, title, isShowContact }) => {
  return (
    <section className="move-list-container flex column align-center">
      <h3>{title}</h3>
      <hr />
      <ul className="clean-list flex column align-center">
        {moves.map((move, idx) => (
          <MovePreview move={move} key={idx} isShowContact={isShowContact}/>
        ))}
      </ul>
    </section>
  );
};
