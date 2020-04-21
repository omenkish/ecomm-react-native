/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useReducer } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import HeaderIcon from '../../components/UI/HeaderIcon';
import { useDispatch } from 'react-redux';
import { addProduct, updateProduct } from '../../redux/actions/products';

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
      [action.input]: action.value,
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

  const handleSubmit = useCallback(() => {
    if (!formState.formIsValid) {
      return Alert.alert(
        'Wrong input!',
        'Please check the errors in the form.',
        [{ text: 'Okay' }],
      );
    }
    if (item) {
      product.id = item.id;
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct(product));
    }
    props.navigation.goBack();
  }, [dispatch, product]);

  useEffect(() => {
    headerIcon(props, handleSubmit);
  }, [handleSubmit]);

  const handleFormInput = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: UPDATE_FORM_INPUT,
      value: text,
      isValid: isValid,
      input: inputIdentifier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={handleFormInput.bind(this, 'title')}
            autoCapitalize="words"
            autoCorrect
            returnKeyType="next"
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={handleFormInput.bind(this, 'imageUrl')}
          />
        </View>
        {!item && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={handleFormInput.bind(this, 'price')}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={() => handleFormInput('description')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'OpenSans-Bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
