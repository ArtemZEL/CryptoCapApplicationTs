import { getUsersCurrencies } from './getLocalStorageData';

//добавление количество и возможность удаление из корзины профиля
export const addInPortfolio = (id: string, cryptoValue: number) => {
  const oldStorageData = getUsersCurrencies();
  const oldCurrencyData =
    oldStorageData && oldStorageData.find((c: { id: string; value: number }) => c.id === id);

  if (oldStorageData) {
    return oldCurrencyData
      ? oldStorageData.map((c: { id: string; value: number }) =>
          c.id === oldCurrencyData.id ? { ...c, value: c.value + cryptoValue } : c
        )
      : [...oldStorageData, { id, value: cryptoValue }];
  } else {
    return [{ id, value: cryptoValue }];
  }
};

export const removeFromPortfolio = (id: string) => {
  const currencies = getUsersCurrencies();
  const newCurrencies = currencies.filter((c) => c.id !== id);
  localStorage.setItem('usersCurrencies', JSON.stringify(newCurrencies));
  return newCurrencies;
};
