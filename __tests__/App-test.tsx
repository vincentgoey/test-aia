/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';
import {
  tasteDiveSimilarApi,
  tastDiveApiResponse,
} from '../src/utils/requestService';
import {ApiConfig} from '../src/utils/requestConfig';
import axios from 'axios';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// jest.mock('axios');

it('renders correctly', () => {
  renderer.create(<App />);
});

it('Call Api with Response', () => {
  // const response = axios.get(
  //   'https://tastedive.com/api/similar?k=443699-Dev-SCUW82NE&type=movie&info=1&q=!!!',
  // );
  // console.log('test: ', JSON.stringify(response));
  // expect(response).not.toBeNull();
  let params = {
    k: ApiConfig.key,
    q: encodeURIComponent('!!!'),
    limit: 1,
    info: 1,
  };
  tasteDiveSimilarApi(params).then(res => {
    const expectedResult = {
      Name: '!!!',
      Type: 'music',
      wTeaser:
        'A musician is a person who composes, conducts, or performs music. According to the United States Employment Service, "musician" is a general term used to designate one who follows music as a profession. Musicians include songwriters who write both music and lyrics for songs, conductors who direct a musical performance, or performers who perform for an audience. A music performer is generally either a singer who provides vocals or an instrumentalist who plays a musical instrument. Musicians may perform on their own or as part of a group, band or orchestra. Musicians specialize in a musical style, and some musicians play in a variety of different styles depending on cultures and background. A musician who records and releases music can be known as a recording artist.',
      wUrl: 'https://en.wikipedia.org/wiki/Musician',
      yUrl: 'https://www.youtube-nocookie.com/embed/38aHYZwP00E',
      yID: '38aHYZwP00E',
    };
    expect((res.data as tastDiveApiResponse).Similar.Info[0]).toEqual(
      expectedResult,
    );
  });
});
