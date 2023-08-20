import React, { useMemo, useState } from 'react';
import style from './MainPage.module.scss';
import Pagination from '../../components/Pagination/Pagination';
import CurrenciesTable from '../../components/CurrencyTable/CurrenciesTable';
import { withContainerProvider } from '../../app/provider/with-providers';
import { useGetAllCurrencies } from '../../processes/hooks/useGetAllCurrencies';

function MainPage() {
  const [page, setPage] = useState(0);
  const { data } = useGetAllCurrencies(page);
  const currencies = useMemo(() => data?.data, [data?.data]);
  console.log(currencies);
  return (
    <div className={style.main}>
      <h2>Валюты</h2>
      <CurrenciesTable type={'main'} page={page} currencies={currencies ? currencies : null} />
      <Pagination itemsCount={2000} page={page} setPage={setPage} />
    </div>
  );
}

export default withContainerProvider(MainPage);
