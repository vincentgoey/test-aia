import axios from 'axios';
import queryString from 'query-string';
import {ApiConfig} from './requestConfig';

const METHODS = {
  get: 'get',
};

class RequestUtil {
  httpGet<T>(url: string, params: Record<string, unknown>) {
    url = this.getRequestUrlWithParams(this.getRequestUrl(url), params);
    return this.sendRequest(METHODS.get, url) as T;
  }

  getRequestUrlWithParams(url: string, params: Record<string, unknown>) {
    if (typeof params === 'string') {
      url += '/' + params;
    } else if (params) {
      url += '?' + queryString.stringify(params);
    }
    return url;
  }

  getRequestUrl(url: string) {
    return `${ApiConfig.apiDomain}${url}`;
  }

  sendRequest<T>(method: string, url: string): Promise<T> {
    const basicMap = {
      method,
      url,
      timeout: 15000,
    };

    return new Promise((resolve, reject) => {
      return axios(basicMap)
        .then(res => {
          resolve(res as T);
        })
        .catch(err => {
          const error = err.response || err;
          reject();
        });
    });
  }
}

const requestUtil = new RequestUtil();
export default requestUtil;
