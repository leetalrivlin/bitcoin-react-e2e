import { userService } from "../../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function setUser() {
  return async dispatch => {
    const user = await userService.getLogedinUser();
    dispatch({ type: 'SET_USER', user })
  }
}

export function addMove(contact, amount, userId) {
  return async (dispatch) => {
    const updatedUser = await userService.addMove(contact, amount, userId);
    dispatch({ type: 'SET_USER', user:updatedUser });
    toast.dark('Transfer approved');
  };
}
