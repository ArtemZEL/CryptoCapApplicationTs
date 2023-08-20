import React from 'react';
import style from './AddCurrencyButton.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';

type PropsType = {
  id: string;
};
// Добавление будет происходить по поиску id валюты
function AddCurrencyButton({ id }: PropsType) {
  const navigate = useNavigate();
  const location = useLocation();
  const handleOpenModal = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`add/${id}`, { state: { background: location } });
  };
  return (
    <div>
      <button onClick={handleOpenModal} className={style.addButton}>
        +
      </button>
    </div>
  );
}

export default AddCurrencyButton;
