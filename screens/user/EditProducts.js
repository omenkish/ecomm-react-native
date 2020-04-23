/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useReducer } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';

import HeaderIcon from '../../components/UI/HeaderIcon';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/actions/products';
import Input from '../../components/UI/Input';

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

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      console.log('formState', formState);
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ]);
      return;
    }
    if (item) {
      console.log('formState', formState);
      product.id = item.id;
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct(product));
    }
    props.navigation.goBack();
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
