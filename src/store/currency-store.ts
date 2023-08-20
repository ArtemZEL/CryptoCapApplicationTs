import create from 'zustand';
import { coinsAPI, CurrencyHistoryType, ResponseItemType } from '../api/api';
type CurrencyStateType = {
  currentCurrency: null | ResponseItemType;
  currencyHistory: null | CurrencyHistoryType;
  setCurrentCurrency: (id: string) => void;
  setCurrencyHistory: (id: string) => void;
};

export const useCurrencyStore = create<CurrencyStateType>((set) => ({
  currentCurrency: null,
  currencyHistory: null,
  setCurrentCurrency: async (id: string) => {
    const { data } = await coinsAPI.getAssetsItem(id);
    const currentCurrency = data.data;
    set(() => {
      return { currentCurrency };
    });
  },
  setCurrencyHistory: async (id: string) => {
    const { data } = await coinsAPI.getAssetsItemHistory(id);
    const currencyHistory = data.data;
    set(() => {
      return { currencyHistory };
    });
  },
}));
