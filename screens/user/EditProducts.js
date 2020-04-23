/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

import HeaderIcon from '../../components/UI/HeaderIcon';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/actions/products';
import Input from '../../components/UI/Input';
import Loader from '../../components/UI/Loader';
import Colors from '../../constants/Colors';

const headerIcon = (props, handleSubmit) => {
  props.navigation.setOptions({
    headerRight: () => (
      <HeaderIcon
        title="Save"
        iconName="save"
        iconTitle="Save"
        handlePress={handleSubmit}
      />
    ),
  });
};

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

const EditProductScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const item = props.route.params ? props.route.params.item : null;

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: item ? item.title : '',
      imageUrl: item ? item.imageUrl : '',
      description: item ? item.description : '',
      price: '',
    },
    inputValidities: {
      title: item ? true : false,
      imageUrl: item ? true : false,
      description: item ? true : false,
      price: item ? true : false,
    },
    formIsValid: item ? true : false,
  });

  const { title, imageUrl, description, price } = formState.inputValues;

  const product = {
    title,
    imageUrl,
    description,
    price: +price,
  };

  useEffect(() => {
    if (error) {
      Alert.alert('Error!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ]);
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      if (item) {
        product.id = item.id;
        await dispatch(updateProduct(product));
      } else {
        await dispatch(addProduct(product));
      }
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }
  }, [dispatch, item ? item.id : '', formState]);

  useEffect(() => {
    headerIcon(props, submitHandler);
  }, [submitHandler]);

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

  if (isLoading) {
    <Loader size="large" color={Colors.primary} />;
  }
  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior="padding"
      keyboardVerticalOffset="50">
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={handleInputChange}
            initialValue={item ? item.title : ''}
            initiallyValid={!!item}
            required
          />

          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image Url"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={handleInputChange}
            initialValue={item ? item.imageUrl : ''}
            initiallyValid={!!item}
            required
          />

          {item ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={handleInputChange}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={handleInputChange}
            initialValue={item ? item.description : ''}
            initiallyValid={!!item}
            required
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  keyboard: {
    flex: 1,
  },
});

export default EditProductScreen;
