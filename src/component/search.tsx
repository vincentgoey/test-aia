import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {FunctionComponent} from 'react';
import {color} from '../asset/theme';

const propTypes = {
  onChangeText: PropTypes.any,
  text: PropTypes.any,
  onPress: PropTypes.func.isRequired,
};

type SearchProps = PropTypes.InferProps<typeof propTypes>;

const SearchView: FunctionComponent<SearchProps> = props => {
  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={props.onChangeText}
        value={props.text}
        placeholder={'Search Text'}
      />
      <TouchableOpacity
        style={{
          margin: 8,
          backgroundColor: color.themeButton,
          height: 40,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={props.onPress}>
        <Text style={styles.searchTxt}>SEARCH</Text>
      </TouchableOpacity>
    </View>
  );
};

SearchView.propTypes = propTypes;

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  searchTxt: {
    fontSize: 12,
    color: color.white,
  },
});

export default SearchView;
