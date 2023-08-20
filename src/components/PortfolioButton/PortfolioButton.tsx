import React from 'react';
import style from './PortfolioButton.module.scss';
import { ReactComponent as IconPortfolio } from '../../assets/wallet.svg';
import { useLocation, useNavigate } from 'react-router-dom';

function PortfolioButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleOpenModal = () => {
    navigate('portfolio', { state: { background: location } });
  };
  return (
    <button onClick={handleOpenModal} className={style.portfolioButton}>
      <IconPortfolio style={{ height: '40px', width: '40px' }} />
    </button>
  );
}

export default PortfolioButton;
