import React, {useState} from 'react';
import {StyleSheet, View, ActivityIndicator, FlatList} from 'react-native';
import {color, themeView} from '../asset/theme';
import {
  tasteDiveSimilarApi,
  tastDiveApiResponse,
  InfoType,
} from '../utils/requestService';
import {ApiConfig} from '../utils/requestConfig';
import {AxiosResponse} from 'axios';
import Cell from '../component/cell';
import NavigationService from '../navigator/navigationService';
import EmptyDataView from '../component/emptyData';
import SearchView from '../component/search';

const Search = () => {
  const [text, onChangeText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRequest, setIsRequest] = useState(false);
  const [displayData, setDisplayData] = useState([] as InfoType[]);

  function search() {
    text.length > 0 && requestData(20);
  }

  function requestData(length: number) {
    let params = {
      k: ApiConfig.key,
      q: encodeURIComponent(text),
      limit: length,
      info: 1,
    };

    setIsLoading(true);
    tasteDiveSimilarApi<tastDiveApiResponse>(params).then(
      (res: AxiosResponse<tastDiveApiResponse>) => {
        if (res.data) {
          setDisplayData(res.data.Similar.Results);
        }
        setIsLoading(false);
        setIsRequest(true);
      },
    );
  }

  function returnCell(item: InfoType) {
    return (
      <Cell
        item={item}
        onPress={() => NavigationService.navigate('itemDetails', {item})}
      />
    );
  }

  function returnEmptyView() {
    return <EmptyDataView requested={isRequest} />;
  }

  function onEndReach() {
    requestData((Math.ceil(displayData.length / 20) + 1) * 20);
  }

  return (
    <View style={styles.container}>
      {isLoading && (
        <ActivityIndicator
          style={themeView.loadingView}
          animating={true}
          color={color.themeButton}
          size={'large'}
        />
      )}
      <SearchView
        onChangeText={onChangeText}
        text={text}
        onPress={() => search()}
      />
      <FlatList
        data={displayData}
        renderItem={({item}: {item: InfoType}) => returnCell(item)}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={returnEmptyView()}
        onEndReached={() => onEndReach()}
        onEndReachedThreshold={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Search;
