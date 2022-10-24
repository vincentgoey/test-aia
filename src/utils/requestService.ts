import {AxiosResponse} from 'axios';
import {ApiConfig} from './requestConfig';
import requestUtil from './requestUtils';

export interface tastDiveApiResponse {
  Similar: {
    Info: InfoType[];
    Results: InfoType[];
  };
}
export interface InfoType {
  Name: string;
  Type: string;
  wTeaser: string;
  wUrl: string;
  yUrl: string;
  yID: string;
}

export function tasteDiveSimilarApi<T>(param: Record<string, unknown>) {
  return requestUtil.httpGet<Promise<AxiosResponse<T>>>(
    ApiConfig.apiUrl.similar,
    param,
  );
}
