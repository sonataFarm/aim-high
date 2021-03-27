import api from '../util/api-util'

export const
  RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER',
  REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

export const logIn = user => dispatch => {
  api.logIn(user).then(
    res => { debugger; dispatch(receiveCurrentUser(res.data)); },
    err => console.log(err)
  );
};

export const logOut = user => dispatch => {
  api.logOut(user).then(
    res => dispatch(removeCurrentUser()),
    err => console.log(err)
  );
}

export const receiveCurrentUser = (user) => ({
  type: RECEIVE_CURRENT_USER,
  payload: user
});

export const removeCurrentUser = () => ({
  type: REMOVE_CURRENT_USER
});
