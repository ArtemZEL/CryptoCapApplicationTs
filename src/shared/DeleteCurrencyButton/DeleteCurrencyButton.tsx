import React from 'react';
import style from './DeleteCurrencyButton.module.scss';
import { useProfileStore } from '../../store/basket-store';
type PropsType = {
  id: string;
};
function DeleteCurrencyButton({ id }: PropsType) {
  const deleteCurrency = useProfileStore((state) => state.deleteCurrency);

  const deleteHandle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    deleteCurrency(id);
  };
  return (
    <button onClick={deleteHandle} className={style.delete}>
      🗑️
    </button>
  );
}

export default DeleteCurrencyButton;
