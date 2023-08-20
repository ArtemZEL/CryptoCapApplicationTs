import React from 'react';
import style from '../scss/Container.module.scss';

export const withContainer = (component: () => React.ReactNode) => () =>
  <div className={style.container}>{component()}</div>;
