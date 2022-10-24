import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {FunctionComponent} from 'react';
import {color} from '../asset/theme';

const propTypes = {
  requested: PropTypes.bool.isRequired,
};

type EmptyDataProps = PropTypes.InferProps<typeof propTypes>;

const EmptyView: FunctionComponent<EmptyDataProps> = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.normalTxt}>
        {props.requested
          ? `Results is empty, please search with another string.`
          : 'Enter to search'}
      </Text>
    </View>
  );
};

EmptyView.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  normalTxt: {fontSize: 12, color: color.black},
  titleTxt: {
    marginTop: 10,
    fontSize: 18,
    color: '#000000',
  },
});

export default EmptyView;
