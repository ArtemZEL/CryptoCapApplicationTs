import React from 'react';
import style from './Pagination.module.scss';
type PropsType = { page: number; setPage: (num: number) => void; itemsCount: number };
function Pagination({ setPage, itemsCount, ...props }: PropsType) {
  const page = props.page;
  const pages = Array.from({ length: Math.ceil(itemsCount / 6) }, (_, index) => index + 1);
  const firstPages = pages.slice(0, 4);
  const currentPages = pages.slice(page - 1, page + 2);
  const lastPages = pages.slice(-3);
  const handleSetPage = (page: number) => {
    setPage(page);
  };
  return (
    <div className={style.pagination}>
      <button
        disabled={page < 1}
        onClick={() => {
          page > 0 && handleSetPage(page - 1);
        }}
      >
        ⇦
      </button>
      {page < 3 &&
        firstPages.map((p) => (
          <button
            onClick={() => {
              handleSetPage(p - 1);
            }}
            className={p === page + 1 ? style.active : ''}
            key={p}
          >
            {p}
          </button>
        ))}
      {page > 2 && (
        <button
          onClick={() => {
            handleSetPage(0);
          }}
          className={1 === page + 1 ? style.active : ''}
        >
          1
        </button>
      )}
      {page < pages.length - 3 && <span>...</span>}
      {page > 2 &&
        page < pages.length - 3 &&
        currentPages.map((p) => (
          <button
            onClick={() => {
              handleSetPage(p - 1);
            }}
            className={p === page + 1 ? style.active : ''}
            key={p}
          >
            {p}
          </button>
        ))}
      {page > 2 && <span>...</span>}
      {page < pages.length - 3 && (
        <button
          onClick={() => {
            handleSetPage(pages.length - 1);
          }}
          className={pages.length === page + 1 ? style.active : ''}
        >
          {pages.length}
        </button>
      )}
      {page > pages.length - 4 &&
        pages.length > 3 &&
        lastPages.map((p) => (
          <button
            onClick={() => {
              handleSetPage(p - 1);
            }}
            className={p === page + 1 ? style.active : ''}
            key={p}
          >
            {p}
          </button>
        ))}
      <button
        disabled={page + 1 === pages.length}
        onClick={() => {
          page < pages.length && handleSetPage(page + 1);
        }}
      >
        ⇨
      </button>
    </div>
  );
}

export default Pagination;
