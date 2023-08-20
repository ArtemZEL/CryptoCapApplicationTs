import React, { useState } from 'react';
import style from './PortfolioModal.module.scss';
import Pagination from '../../Pagination/Pagination';
import CurrenciesTable from '../../CurrencyTable/CurrenciesTable';
import { getUsersCurrencies } from '../../../processes/getLocalStorageData';
import { useProfileStore } from '../../../store/basket-store';
import ModalContainer from '../../../shared/ModalContainer/ModalContainer';

type PropsType = {
  handleClose: () => void;
};

function PortfolioModal({ handleClose }: PropsType) {
  const [page, setPage] = useState(0);
  const currencies = useProfileStore((state) => state.usersCurrencies);
  console.log('currencies', currencies?.length);
  return (
    <ModalContainer handleClose={handleClose} nameText={'Пользователя корзина'}>
      {!currencies?.length && <div className={style.profile__empty}>Корзина пуста</div>}
      {!!currencies?.length && (
        <div>
          <CurrenciesTable
            userCurrencies={getUsersCurrencies()}
            page={page}
            type={'portfolio'}
            currencies={currencies.length ? currencies.slice(page * 6, page * 6 + 6) : null}
          />
          {currencies.length > 6 && (
            <Pagination itemsCount={currencies.length} page={page} setPage={setPage} />
          )}
        </div>
      )}
    </ModalContainer>
  );
}

export default PortfolioModal;
