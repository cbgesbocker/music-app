import * as UserActions from "./user.actions";
import { User } from "src/app/user";

export interface UserState {
  userSignedIn: User;
}

const initialState: UserState = {
  userSignedIn: undefined
};

export function userReducer(
  state = initialState,
  action: UserActions.UserActions
) {
  switch (action.type) {
    case UserActions.POPULATE_USER_DATA:
      return state;
    case UserActions.SET_USER_DATA:
      return {
        ...state,
        userSignedIn: action.payload
      };
    default:
      return state;
  }
}
