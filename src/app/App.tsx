import React, { useEffect } from 'react';
import Header from '../components/Header/Header';
import Routing from '../page/Routing';
import style from './App.module.scss';
import { withProviders } from './provider/with-providers';
import { useProfileStore } from '../store/basket-store';

function App() {
  const fetchUsersCurrencies = useProfileStore((state) => state.fetchUsersCurrencies);
  const addCurrenciesWallet = useProfileStore((state) => state.addCurrenciesWallet);
  const addProfileValue = useProfileStore((state) => state.addProfileValue);
  const usersCurrencies = useProfileStore((state) => state.usersCurrencies);
  const currenciesWallet = useProfileStore((state) => state.currenciesWallet);

  useEffect(() => {
    fetchUsersCurrencies();
    addCurrenciesWallet();
  }, []);

  useEffect(() => {
    currenciesWallet && usersCurrencies && addProfileValue();
  }, [currenciesWallet, usersCurrencies]);
  return (
    <div className={style.app}>
      <Header />
      <Routing />
    </div>
  );
}

export default withProviders(App);
