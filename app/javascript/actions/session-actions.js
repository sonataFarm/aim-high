import api from '../util/api-util'

export const
  RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER',
  REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER',
  RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';

export const logIn = user => dispatch => {
  api.logIn(user).then(
    res => dispatch(receiveCurrentUser(res.data)),
    err => { dispatch(receiveSessionErrors(err.response.data)) }
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

export const receiveSessionErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  payload: errors
})
