import React from 'react';
import style from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import PortfolioButton from '../PortfolioButton/PortfolioButton';
import TopCurrencies from '../TopCurrencieCoin/TopCurrencies';
import PortfolioValue from '../PortfolioValue/PortfolioValue';

import { ReactComponent as Logo } from '../../assets/icons8-crypto.svg';
import { useProfileStore } from '../../store/basket-store';

function Header() {
  const navigate = useNavigate();
  const portfolioValue = useProfileStore((state) => state.profileValue);
  const valueExist = portfolioValue !== null && portfolioValue.newValue > 0;
  const handleMain = () => {
    navigate('/');
  };
  return (
    <div className={style.header}>
      <div onClick={handleMain} className={style.logo}>
        {/*Логотип*/}
        <Logo className={style.logo__svg} />
        <span>rypto</span>
      </div>
      <div className={`${style.portfolio} ${!valueExist && style.portfolio_withoutValue}`}>
        {valueExist && <PortfolioValue />}
        {/* Корзина с приобретенной валютой */}
        <PortfolioButton />
      </div>
      {/* Популярная валюта */}
      <TopCurrencies />
    </div>
  );
}

export default Header;
