import AsyncStorage from '@react-native-community/async-storage';

export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';

let timer;

export const authenticate = (token, userId, expireTime) => {
  return dispatch => {
    dispatch(setLogoutTimer(expireTime));
    dispatch({ type: AUTHENTICATE, userId, token });
  };
};

export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAJfmMiI7nHkCSNzPKGdvNihlT0HZX6GDo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      const { message } = errorResponse.error;
      handleErrors(message);
    }

    const responseData = await response.json();
    const { idToken, localId, expiresIn } = responseData;
    dispatch(authenticate(idToken, localId, parseInt(expiresIn, 10) * 1000));
    saveDataToStorage(idToken, localId, expiresIn);
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAJfmMiI7nHkCSNzPKGdvNihlT0HZX6GDo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
      },
    );

    if (!response.ok) {
      const errorResponse = await response.json();
      const { message } = errorResponse.error;
      handleErrors(message);
    }

    const responseData = await response.json();

    const { idToken, localId, expiresIn } = responseData;
    dispatch(authenticate(idToken, localId, parseInt(expiresIn, 10) * 1000));
    saveDataToStorage(idToken, localId, expiresIn);
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};

const saveDataToStorage = async (token, userId, expiryTime) => {
  const expiryDate = new Date(
    new Date().getTime() + parseInt(expiryTime, 10) * 1000,
  );
  try {
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token,
        userId,
        expiryDate: expiryDate.toISOString(),
      }),
    );
  } catch (e) {
    // saving error
  }
};

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const handleErrors = errorMessage => {
  const message = {
    EMAIL_NOT_FOUND: 'Invalid email/password',
    EMAIL_EXISTS: 'This email is already registered to another account',
    INVALID_PASSWORD: 'Invalid email/password',
    default: 'Something went wrong!',
  };

  throw new Error(message[errorMessage] || message.default);
};
