import React from 'react';
import { useProfileStore } from '../../store/basket-store';
import style from './PortfolioValue.module.scss';
function PortfolioValue() {
  const profileValue = useProfileStore((state) => state.profileValue);
  const { newValue, walletDifference, walletPercentDifference } = profileValue
    ? profileValue
    : { newValue: 0, walletDifference: 0, walletPercentDifference: 0 };

  return (
    <div className={style.cashbuy}>
      <b>{String(newValue).slice(0, 9)}</b>
      {` ${walletDifference > 0 ? '+' : ''}${String(walletDifference).slice(0, 4)} (${
        walletPercentDifference > 0 ? '+' : ''
      }${String(walletPercentDifference).slice(0, 4)}%)`}
    </div>
  );
}

export default PortfolioValue;
