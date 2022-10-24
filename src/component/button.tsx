import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {FunctionComponent} from 'react';

const propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  titleStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
};

type ButtonProps = PropTypes.InferProps<typeof propTypes>;

const Button: FunctionComponent<ButtonProps> = props => {
  return (
    <TouchableOpacity style={{...props.buttonStyle}} onPress={props.onPress}>
      <Text style={{...props.titleStyle}}>{props.title}</Text>
    </TouchableOpacity>
  );
};

Button.propTypes = propTypes;

export default Button;
