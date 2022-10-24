import React from 'react';
import {Text, TouchableOpacity, Image, View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {FunctionComponent} from 'react';

const propTypes = {
  onPress: PropTypes.func.isRequired,
  item: PropTypes.any,
};

type CellProps = PropTypes.InferProps<typeof propTypes>;

const Cell: FunctionComponent<CellProps> = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      {props.item.yID ? (
        <Image
          style={styles.coverImg}
          source={{
            uri: `https://img.youtube.com/vi/${props.item.yID}/hqdefault.jpg`,
          }}
        />
      ) : (
        <View style={styles.emptyViewContainer}>
          <Text style={styles.normalTxt}>No Image Found</Text>
        </View>
      )}
      <Text style={styles.titleTxt}>{props.item.Name}</Text>
      <Text style={styles.normalTxt}>{props.item.Type.toUpperCase()}</Text>
      <Text numberOfLines={2} style={styles.normalTxt}>
        {props.item.wTeaser}
      </Text>
    </TouchableOpacity>
  );
};

Cell.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: '100%',
  },
  normalTxt: {
    marginTop: 5,
    fontSize: 12,
    color: '#000000',
  },
  titleTxt: {
    marginTop: 10,
    fontSize: 18,
    color: '#000000',
  },
  emptyViewContainer: {
    marginTop: 10,
    fontSize: 18,
    color: '#000000',
  },
  coverImg: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
});

export default Cell;
