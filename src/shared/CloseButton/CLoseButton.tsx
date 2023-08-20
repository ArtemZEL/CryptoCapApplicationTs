import React from 'react';
import style from './CLoseButton.module.scss';

type PropsType = {
  handleClose: () => void;
};
function CLoseButton({ handleClose }: PropsType) {
  return (
    <button onClick={handleClose} className={style.close}>
      x
    </button>
  );
}

export default CLoseButton;
