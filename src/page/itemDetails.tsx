/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import NavigationService from '../navigator/navigationService';
import {common} from '../asset/image';
import {color} from '../asset/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';
import Button from '../component/button';

const ItemDetails = (props: any) => {
  const displayData = props.route.params.item;
  const wUrl = displayData.wUrl;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    checkIsFav();
  }, []);

  async function checkIsFav() {
    try {
      const value = await AsyncStorage.getItem('@fav_list');
      if (value !== null) {
        const favList = JSON.parse(value);
        const tempFav =
          JSON.stringify(favList).indexOf(JSON.stringify(displayData)) > -1;
        if (tempFav) setIsFav(true);
      }
    } catch (e) {
      // error reading value
    }
  }

  async function favAction() {
    let currentStatus = !isFav;
    setIsFav(!isFav);
    if (currentStatus) {
      try {
        const value = await AsyncStorage.getItem('@fav_list');
        if (value !== null) {
          let tempValue = JSON.parse(value);
          tempValue.push(displayData);
          await AsyncStorage.setItem('@fav_list', JSON.stringify(tempValue));
        } else {
          let tempArray = [];
          tempArray.push(displayData);
          await AsyncStorage.setItem(
            '@fav_list',
            JSON.stringify(tempArray) as any,
          );
        }
      } catch (e) {
        // error reading value
      }
    } else {
      try {
        const value = await AsyncStorage.getItem('@fav_list');
        if (value !== null) {
          let tempValue = JSON.parse(value);
          const currentyID = displayData.yID;
          tempValue = _.filter(tempValue, v => {
            return v.yID != currentyID;
          });

          await AsyncStorage.setItem('@fav_list', JSON.stringify(tempValue));
        }
      } catch (e) {
        // error reading value
      }
    }
  }

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView style={{flex: 1}}>
        <YoutubePlayer height={250} videoId={displayData.yID} />
        <TouchableOpacity
          style={styles.favIconWrapper}
          onPress={() => favAction()}>
          <Image
            style={{flex: 1, resizeMode: 'contain'}}
            source={isFav ? common.fav : common.not_fav}
          />
        </TouchableOpacity>
        <Text style={styles.nameTxt}>{displayData.Name}</Text>
        <Text style={styles.teaserTxt}>{displayData.wTeaser}</Text>
        {displayData.wUrl.length > 5 && (
          <Button
            onPress={() => NavigationService.navigate('WebView', {wUrl})}
            buttonStyle={styles.buttonWrapper}
            titleStyle={styles.buttonTitle}
            title={'More Details'}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  teaserTxt: {
    fontSize: 12,
    marginTop: 5,
    color: color.black,
    marginHorizontal: 8,
  },
  nameTxt: {
    fontSize: 16,
    marginTop: 5,
    color: color.black,
    marginHorizontal: 8,
  },
  favIconWrapper: {
    height: 50,
    width: 50,
    marginLeft: 8,
  },
  buttonWrapper: {
    marginHorizontal: 8,
    borderRadius: 8,
    backgroundColor: color.themeButton,
    height: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {color: color.white, fontSize: 14},
});

export default ItemDetails;
