import { ResponseAssetsType } from '../api/api';
import { CurrenciesWalletType } from '../store/basket-store';

export const getPortfolioValue = (
  usersCurrencies: ResponseAssetsType | null,
  currenciesWallet: CurrenciesWalletType
) => {
  const usdSum = { sum: 0 };

  for (const prop in currenciesWallet) {
    const currency =
      usersCurrencies && usersCurrencies.find((c) => c.id === currenciesWallet[+prop].id);
    const newUsdValue = currency && +currency.priceUsd * currenciesWallet[+prop].value;

    if (newUsdValue) {
      usdSum.sum = usdSum.sum + newUsdValue;
    }
  }
  return usdSum.sum;
};

export const getPortfolioValues = (oldValue: number, newValue: number) => {
  const walletDifference = newValue - oldValue;
  const percent = oldValue === 0 ? newValue : newValue / (oldValue / 100) - 100;
  const walletPercentDifference = isNaN(percent) ? 0 : percent;
  return { newValue, walletDifference, walletPercentDifference };
};

export type PortfolioValueType = {
  newValue: number;
  walletDifference: number;
  walletPercentDifference: number;
};
