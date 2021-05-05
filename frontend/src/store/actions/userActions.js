import { userService } from "../../services/userService"

export function setUser() {
  return async dispatch => {
    const user = await userService.getLogedinUser();
    // console.log('user', user);
    dispatch({ type: 'SET_USER', user })
  }
}

export function addMove(contact, amount, userId) {
  return async (dispatch) => {
    // console.log(contact, amount, userId);
    const updatedUser = await userService.addMove(contact, amount, userId);
    dispatch({ type: 'SET_USER', user:updatedUser });
  };
}
