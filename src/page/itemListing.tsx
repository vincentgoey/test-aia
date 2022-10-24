/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {ReactNode, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Dimensions,
} from 'react-native';
import {
  tasteDiveSimilarApi,
  tastDiveApiResponse,
  InfoType,
} from '../utils/requestService';
import {ApiConfig} from '../utils/requestConfig';
import {AxiosResponse} from 'axios';
import NavigationService from '../navigator/navigationService';
import Cell from '../component/cell';
import {themeView} from '../asset/theme';
import _ from 'lodash';
import Carousel from 'react-native-snap-carousel';
import CellView from '../component/carousel';
import Button from '../component/button';

const App = () => {
  const [displayData, setDisplayData] = useState([] as InfoType[]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentOrder, setCurrentOrder] = useState('NONE');

  useEffect(() => {
    requestData('!!!', 20);
  }, []);

  function requestData(q: string, length: number) {
    let params = {
      k: ApiConfig.key,
      q: encodeURIComponent(q),
      limit: length,
      info: 1,
    };

    setIsLoading(true);
    tasteDiveSimilarApi<tastDiveApiResponse>(params).then(
      (res: AxiosResponse<tastDiveApiResponse>) => {
        setIsLoading(false);
        if (res.data) {
          setDisplayData(res.data.Similar.Results);
        }
      },
    );
  }

  function onEndReach() {
    requestData('!!!', (Math.ceil(displayData.length / 20) + 1) * 20);
  }

  function reorderData() {
    if (currentOrder == 'NONE') {
      setCurrentOrder('ASC');
      setDisplayData(_.orderBy(displayData, ['Name'], ['asc']));
    } else if (currentOrder == 'ASC') {
      console.log('here');
      setCurrentOrder('DESC');
      setDisplayData(_.orderBy(displayData, ['Name'], ['desc']));
    } else {
      setCurrentOrder('ASC');
      setDisplayData(_.orderBy(displayData, ['Name'], ['asc']));
    }
  }

  function returnCItem({item}: {item: InfoType}) {
    return <CellView item={item} />;
  }

  function returnCItem1(baseData: {
    index: number;
    dataIndex: number;
    item: any;
  }) {
    return <CellView item={baseData.item} />;
  }

  function returnCell(item: InfoType) {
    return (
      <Cell
        item={item}
        onPress={() => NavigationService.navigate('itemDetails', {item})}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      {isLoading && (
        <ActivityIndicator
          style={themeView.loadingView}
          animating={true}
          color={'#FF0000'}
          size={'large'}
        />
      )}
      <View style={styles.buttonWrapper}>
        <Button
          buttonStyle={styles.buttonView}
          titleStyle={styles.normalTxt}
          onPress={() => reorderData()}
          title={`Reorder - ${currentOrder}`}
        />
        <Button
          buttonStyle={styles.buttonView}
          titleStyle={styles.normalTxt}
          onPress={() => NavigationService.navigate('Search', null)}
          title={'Search'}
        />
      </View>

      <View style={styles.carouselWrapper}>
        <Carousel
          layout={'default'}
          data={displayData.slice(0, 8)}
          sliderWidth={Dimensions.get('window').width}
          itemWidth={Dimensions.get('window').width - 50}
          renderItem={returnCItem1}
          vertical={false}
        />
      </View>
      <FlatList
        data={displayData}
        renderItem={({item}: {item: InfoType}) => returnCell(item)}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => onEndReach()}
        onEndReachedThreshold={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    height: 30,
    width: '100%',
    flexDirection: 'row',
  },
  buttonView: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
  },
  normalTxt: {color: 'black', fontSize: 12},
  coverImg: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  carouselWrapper: {
    height: 210,
    width: '100%',
    paddingTop: 5,
  },
});

export default App;
