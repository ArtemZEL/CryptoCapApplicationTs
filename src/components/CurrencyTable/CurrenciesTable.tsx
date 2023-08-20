import style from './CurrenciesTable.module.scss';
import React from 'react';
import CurrencyRow from '../CurrencyRow/CurrencyRow';
import { ResponseAssetsType } from '../../api/api';
import { useResize } from '../../processes/hooks/useResize';

type PropsType = {
  userCurrencies?: Array<{ id: string; value: number }>;
  type: 'portfolio' | 'main';
  page: number;
  currencies: ResponseAssetsType | null;
};

function CurrenciesTable({ type, currencies, userCurrencies }: PropsType) {
  const windowSize = useResize();
  const smallScreen = windowSize > 660;
  return (
    <div className={style.table__wrapper}>
      <table
        className={type === 'portfolio' ? `${style.portfolioTable} ${style.table}` : style.table}
      >
        <thead className={style.thead}>
          <tr>
            <th>Name</th>
            {type === 'portfolio' && <th className={style.usersCountTH}>Count</th>}
            <th>Price</th>
            {type === 'main' && <th>24h %</th>}
            {type === 'main' && <th>Market Cap</th>}
            {type === 'main' && smallScreen && <th>Circulating Supply</th>}
            {type === 'main' && smallScreen && <th>VWAP 24h</th>}
            {type === 'main' && <th>buy</th>}
            {type === 'portfolio' && <th>Delete</th>}
          </tr>
        </thead>
        {currencies && (
          <tbody className={style.tbody}>
            {currencies &&
              currencies.map((coin) => (
                <CurrencyRow
                  smallScreen={smallScreen}
                  userCurrencies={userCurrencies}
                  type={type}
                  key={coin.id}
                  currency={coin}
                />
              ))}
          </tbody>
        )}
        {!currencies && (
          <tbody className={style.tbody__loading}>
            {[...Array(6)].map((item, index) => (
              <CurrencyRow key={index} smallScreen={smallScreen} type={type} currency={'loading'} />
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}

export default CurrenciesTable;
