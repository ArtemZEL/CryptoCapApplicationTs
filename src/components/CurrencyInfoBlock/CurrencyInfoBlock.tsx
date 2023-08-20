import React from 'react';
import { ResponseItemType } from '../../api/api';
import style from './CurrencyInfoBlock.module.scss';
import { refactorNum } from '../../processes/abbrNum';

type PropsType = {
  currency: ResponseItemType;
};

function CurrencyInfoBlock({ currency }: PropsType) {
  const coin = {} as ResponseItemType;
  if (currency) {
    let prop: keyof ResponseItemType;
    for (prop in currency) {
      coin[prop] = refactorNum(+currency[prop], 3);
    }
  }

  const changePercentNumber = parseFloat(coin.changePercent24Hr);

  const changePercentClass = changePercentNumber > 0 ? style.greenText : style.redText;

  return (
    <div className={style.currencyInfoBlock}>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>24h Change</th>
            <th>Market Cap</th>
            <th>Max Supply</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{coin.priceUsd}</td>
            <td className={changePercentClass}>{`${coin.changePercent24Hr}%`}</td>
            <td>{`$${coin.marketCapUsd}`}</td>
            <td>{`${coin.maxSupply} ${currency.symbol}`}</td>
          </tr>
        </tbody>
      </table>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Supply</th>
            <th>24h USD</th>
            <th>24h VWAP</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{currency.symbol}</td>
            <td>{`${coin.supply} ${currency.symbol}`}</td>
            <td>{`$${coin.volumeUsd24Hr}`}</td>
            <td>{`$${coin.vwap24Hr}`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CurrencyInfoBlock;
