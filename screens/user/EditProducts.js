/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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

const EditProductScreen = props => {
  const item = props.route.params ? props.route.params.item : null;
  const [title, setTitle] = useState(item ? item.title : '');
  const [imageUrl, setImageUrl] = useState(item ? item.imageUrl : '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(item ? item.description : '');

  const dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    const product = {
      title,
      imageUrl,
      description,
      price: +price,
    };
    if (item) {
      product.id = item.id;
      dispatch(updateProduct(product));
    } else {
      dispatch(addProduct(product));
    }
    props.navigation.goBack();
  }, [dispatch, description, imageUrl, item, price, title]);

  useEffect(() => {
    headerIcon(props, handleSubmit);
  }, [handleSubmit]);
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={text => setImageUrl(text)}
          />
        </View>
        {!item && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={text => setPrice(text)}
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
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
