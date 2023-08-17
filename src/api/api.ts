import { instance } from './instatapi';

export const coinsAPI = {
  async getAssets(page: number, limit: number) {
    const res = await instance.get<AxiosResponseType<ResponseAssetsType>>('assets', {
      params: { limit: String(limit), offset: String(page) },
    });
    return res.data;
  },
  async getAssetsWithIds(ids: string) {
    const res = await instance.get<AxiosResponseType<ResponseAssetsType>>('assets', {
      params: { ids: ids },
    });
    return res.data;
  },
  getAssetsItem(id: string) {
    return instance.get<AxiosResponseType<ResponseItemType>>(`assets/${id}`);
  },
  getAssetsItemHistory(id: string) {
    return instance.get(`assets/${id}/history`, { params: { interval: 'd1' } });
  },
};

export type ResponseAssetsType = Array<ResponseItemType>;

export type ResponseItemType = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  //Тип элемента ответа от API
};

export type AxiosResponseType<T> = { data: T };

export type CurrencyHistoryType = Array<{ date: string; priceUsd: string; time: number }>;
