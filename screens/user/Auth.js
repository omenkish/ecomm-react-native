import React, { useCallback, useReducer, useState, useEffect } from 'react';
import { Button, ScrollView, StyleSheet, View, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import { signup, login } from '../../redux/actions/auth';
import Loader from '../../components/UI/Loader';

const UPDATE_FORM_INPUT = 'UPDATE_FORM_INPUT';

const formReducer = (state, action) => {
  if (action.type === UPDATE_FORM_INPUT) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues,
    };
  }
  return state;
};

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occured!!', error, [{ text: 'Okay' }]);
      setError(null);
    }
  }, [error]);

  const handleAuth = async () => {
    let action;
    if (isSignup) {
      action = signup(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    } else {
      action = login(
        formState.inputValues.email,
        formState.inputValues.password,
      );
    }
    setIsLoading(true);
    setError(null);
    try {
      await dispatch(action);
      props.navigation.replace('Products');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleInputChange = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: UPDATE_FORM_INPUT,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState],
  );
  return (
    <View style={styles.screen}>
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id="email"
            label="Email"
            keyboardType="email-address"
            email
            required
            autoComplete="none"
            errorText="Please enter a valid email address"
            onInputChange={handleInputChange}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            minLength={5}
            required
            autoComplete="none"
            errorText="Please enter a valid password"
            onInputChange={handleInputChange}
            initialValue=""
          />
          <View style={styles.action}>
            {isLoading ? (
              <Loader size="small" color={Colors.accent} />
            ) : (
              <Button
                title={isSignup ? 'Sign Up' : 'Login'}
                color={Colors.primary}
                onPress={handleAuth}
                style={styles.button}
                disabled={!formState.formIsValid}
              />
            )}
          </View>
          <View style={styles.action}>
            <Button
              title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup(prevState => !prevState);
              }}
              style={styles.button}
            />
          </View>
        </ScrollView>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '90%',
    padding: 20,
  },
  action: {
    marginTop: 15,
  },
  button: {
    paddingTop: 20,
  },
});

export default AuthScreen;
