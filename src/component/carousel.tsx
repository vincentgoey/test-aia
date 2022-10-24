import React from "react";
import { Text, StyleSheet, ImageBackground } from "react-native";
import PropTypes from "prop-types";
import { FunctionComponent } from "react";

const propTypes = {
  item: PropTypes.any,
};

type CarouselCellProps = PropTypes.InferProps<typeof propTypes>;

const CarouselCell: FunctionComponent<CarouselCellProps> = (props) => {
  return (
    <ImageBackground
      style={styles.coverImg}
      source={{
        uri: `https://img.youtube.com/vi/${props.item.yID}/hqdefault.jpg`,
      }}
    >
      <Text style={styles.normalTxt}>{props.item.Name}</Text>
    </ImageBackground>
  );
};

CarouselCell.propTypes = propTypes;

const styles = StyleSheet.create({
  normalTxt: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "white",
    fontSize: 20,
  },
  coverImg: {
    width: "100%",
    height: 190,
    resizeMode: "cover",
    borderRadius: 20,
  },
});

export default CarouselCell;
