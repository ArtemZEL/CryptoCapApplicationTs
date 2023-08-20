import React from 'react';
import style from './ModalContainer.module.scss';
import CLoseButton from '../CloseButton/CLoseButton';

type PropsType = {
  children: React.ReactNode;
  handleClose: () => void;
  nameText: string;
};
function ModalContainer({ children, handleClose, nameText }: PropsType) {
  return (
    <div onClick={handleClose} className={style.modal}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={style.paper}
      >
        <CLoseButton handleClose={handleClose} />
        <div className={style.paperName}>{nameText}</div>
        {children}
      </div>
    </div>
  );
}

export default ModalContainer;
