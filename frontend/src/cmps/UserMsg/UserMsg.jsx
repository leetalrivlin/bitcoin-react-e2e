import './UserMsg.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure();

export const UserMsg = () => {
  const notify = () => {
    toast.dark(
      'cool',
      {
        position: toast.POSITION.BOTTOM_RIGHT,
      }
    );
  };

  return (
    <div>
      <button onClick={notify}>Click</button>
    </div>
  );
};
