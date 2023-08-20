import { create } from 'zustand';
import { coinsAPI, ResponseAssetsType } from '../api/api';
import {
  deleteUsersCurrency,
  getUsersCurrencies,
  getUsersCurrenciesIds,
  getWalletOldValue,
  setUsersCurrency,
} from '../processes/getLocalStorageData';
import { getPortfolioValues, getPortfolioValue } from '../processes/getPortfolioValue';
import { useCurrencyStore } from './currency-store';
type PortfolioValueType = {
  newValue: number;
  walletDifference: number;
  walletPercentDifference: number;
};
export type CurrenciesWalletType = Array<{ value: number; id: string }> | null;
export type PortfolioStateType = {
  profileValue: null | PortfolioValueType;
  currenciesWallet: CurrenciesWalletType;
  usersCurrencies: null | ResponseAssetsType;
  fetchUsersCurrencies: () => void;
  addProfileValue: () => void;
  addCurrenciesWallet: () => void;
  addCurrency: (id: string, value: number) => void;
  deleteCurrency: (id: string) => void;
};

export const useProfileStore = create<PortfolioStateType>((set) => ({
  profileValue: null,
  currenciesWallet: null,
  usersCurrencies: null,
  fetchUsersCurrencies: async () => {
    const userCurrenciesIds = getUsersCurrenciesIds();
    if (!!userCurrenciesIds.length) {
      const { data } = await coinsAPI.getAssetsWithIds(userCurrenciesIds.join());
      set(() => {
        return { usersCurrencies: data };
      });
    }
  },
  addProfileValue: () => {
    set((state) => {
      const oldValue = getWalletOldValue();
      const value = getPortfolioValue(state.usersCurrencies, state.currenciesWallet);
      const profileValue = getPortfolioValues(oldValue, value);
      localStorage.setItem('walletValue', String(value));
      return { profileValue };
    });
  },
  addCurrenciesWallet: () =>
    set(() => {
      const json = getUsersCurrencies();
      if (!json) {
        localStorage.setItem('usersCurrencies', JSON.stringify([]));
      }
      return { currenciesWallet: json ? json : null };
    }),
  addCurrency: (id: string, value: number) => {
    set((state) => {
      const newCurr = useCurrencyStore.getState().currentCurrency;

      const newCurrValue = { value, id };
      if (newCurr) {
        if (!state.usersCurrencies || !state.currenciesWallet) {
          setUsersCurrency(id, value, null);
          return { usersCurrencies: [newCurr], currenciesWallet: [newCurrValue] };
        }

        if (state.usersCurrencies && state.currenciesWallet) {
          const oldValue = state.currenciesWallet.find((c) => c.id === id);
          setUsersCurrency(id, value, oldValue ? oldValue : null);

          const currenciesWallet = oldValue
            ? state.currenciesWallet.map((coin) =>
                coin.id === id
                  ? {
                      ...coin,
                      value: coin.value + value,
                    }
                  : coin
              )
            : [...state.currenciesWallet, newCurrValue];

          const usersCurrencies = oldValue
            ? state.usersCurrencies
            : [...state.usersCurrencies, newCurr];
          return { currenciesWallet, usersCurrencies };
        }
      }
      return { ...state };
    });
  },
  deleteCurrency: (id: string) => {
    set((state) => {
      deleteUsersCurrency(id);
      const currenciesWallet =
        state.currenciesWallet && state.currenciesWallet.filter((coin) => coin.id !== id);
      const usersCurrencies =
        state.usersCurrencies && state.usersCurrencies.filter((coin) => coin.id !== id);

      return { currenciesWallet, usersCurrencies };
    });
  },
}));
