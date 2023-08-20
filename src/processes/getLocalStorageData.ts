export const getUsersCurrencies = (): Array<{ id: string; value: number }> => {
  const localStorageStringifyData = localStorage.getItem('usersCurrencies');
  return localStorageStringifyData ? JSON.parse(localStorageStringifyData) : null;
};
export const getUsersCurrenciesIds = (): Array<number> => {
  const localStorageStringifyData = localStorage.getItem('usersCurrencies');
  const localStorageParsedData = localStorageStringifyData
    ? JSON.parse(localStorageStringifyData)
    : null;
  return localStorageParsedData
    ? localStorageParsedData.map((c: { id: string; value: number }) => c.id)
    : [];
};

export const setUsersCurrency = (
  id: string,
  value: number,
  oldValue: { value: number; id: string } | null
) => {
  const localState = getUsersCurrencies();
  const newLocalState = oldValue
    ? localState.map((coin) =>
        coin.id === id
          ? {
              ...coin,
              value: coin.value + value,
            }
          : coin
      )
    : [
        ...localState,
        {
          id,
          value,
        },
      ];
  localStorage.setItem('usersCurrencies', JSON.stringify(newLocalState));
};

export const deleteUsersCurrency = (id: string) => {
  const localState = getUsersCurrencies();
  const newLocalState = localState.filter((coin) => coin.id !== id);
  localStorage.setItem('usersCurrencies', JSON.stringify(newLocalState));
};

export const getWalletOldValue = () => {
  const oldStringifyWalletValue = localStorage.getItem('walletValue');
  !oldStringifyWalletValue && localStorage.setItem('walletValue', '0');
  return oldStringifyWalletValue ? +oldStringifyWalletValue : 0;
};
