import React from 'react';
import style from './CurrencyRow.module.scss';
import { useNavigate } from 'react-router-dom';
import AddCurrencyButton from '../AddCurrencyButton/AddCurrencyButton';
import DeleteCurrencyButton from '../../shared/DeleteCurrencyButton/DeleteCurrencyButton';
import { ResponseItemType } from '../../api/api';
import CryptoIcon from '../../shared/CryptoIcon';
import { refactorNum } from '../../processes/abbrNum';
import { useResize } from '../../processes/hooks/useResize';

type PropsType = {
  currency: ResponseItemType | 'loading';
  type: 'portfolio' | 'main';
  userCurrencies?: Array<{ id: string; value: number }>;
  smallScreen: boolean;
};
function CurrencyRow({ type, currency, userCurrencies, smallScreen }: PropsType) {
  const windowSize = useResize();
  const smallerScreen = windowSize < 420;
  const navigate = useNavigate();
  const userCurrency =
    userCurrencies && currency !== 'loading' && userCurrencies.find((v) => v.id === currency.id);
  const userValue = userCurrency && userCurrency.value;

  const handleCurrencyPage = () => {
    type === 'main' && currency !== 'loading' && navigate(`${currency.id}`);
  };

  if (currency === 'loading') {
    return (
      <tr className={`${style.row} ${type === 'main' ? style.row_Main : ''}`}>
        {[...Array(7)].map((item, index) => (
          <td
            key={index}
            style={{ height: '70px', backgroundColor: 'rgb(234,234,234)' }}
            className={`${style.column}`}
          ></td>
        ))}
      </tr>
    );
  }
  const coin = {} as ResponseItemType;
  if (currency) {
    let prop: keyof ResponseItemType;
    for (prop in currency) {
      coin[prop] = refactorNum(+currency[prop], smallScreen ? 3 : 0);
    }
  }
  const userCount = userValue ? refactorNum(userValue, 3) : '';

  const changePercent24HrNumber = parseFloat(coin.changePercent24Hr);
  const changePercentClass = changePercent24HrNumber > 0 ? style.greenText : style.redText;

  return (
    <tr
      onClick={handleCurrencyPage}
      className={`${style.row} ${type === 'main' ? style.row_Main : ''}`}
    >
      <td className={`${style.column} ${smallerScreen && style.column_smaller}`}>
        <div className={`${style.name}`}>
          {type === 'main' && (
            <div className={`${style.name__icon}`}>
              <CryptoIcon name={currency.symbol.toLowerCase()} size={20} />
            </div>
          )}
          <div>
            {`${currency.name} `}
            {type === 'main' && !smallerScreen && (
              <span className={style.column__symbol}>{currency.symbol}</span>
            )}
            {type === 'main' && smallerScreen && (
              <div className={style.column__symbol}>{currency.symbol}</div>
            )}
          </div>
        </div>
      </td>
      {type === 'portfolio' && (
        <td className={`${style.column} ${type === 'portfolio' ? style.usersCountColumn : ''}`}>
          <span className={style.column_usersCount}>{userCount} </span>
          {currency.symbol}
        </td>
      )}
      <td className={style.column}>{`$${coin.priceUsd}`}</td>
      {type === 'main' && (
        <td className={style.column}>
          <span className={changePercentClass}>{`${coin.changePercent24Hr}%`}</span>
        </td>
      )}
      {type === 'main' && <td className={style.column}>{`$${coin.marketCapUsd}`}</td>}
      {type === 'main' && smallScreen && (
        <td className={`${style.column}`}>{`${coin.supply} ${currency.symbol}`}</td>
      )}
      {type === 'main' && smallScreen && <td className={style.column}>{`$${coin.vwap24Hr}`}</td>}
      {type === 'main' && (
        <td className={style.column}>
          <AddCurrencyButton id={currency.id} />
        </td>
      )}
      {type === 'portfolio' && (
        <td className={style.column}>
          <DeleteCurrencyButton id={currency.id} />
        </td>
      )}
    </tr>
  );
}

export default CurrencyRow;
