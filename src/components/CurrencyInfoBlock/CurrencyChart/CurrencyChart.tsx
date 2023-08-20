import React, { useEffect, useRef, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import style from './CurrencyChart.module.scss';
import { useResize } from '../../../processes/hooks/useResize';
type PropsType = {
  history: Array<{ date: string; priceUsd: string; time: number }>;
};

function CurrencyChart({ history }: PropsType) {
  const dataArr = history
    ? history.map((el) => {
        return { name: el.date.slice(0, 10), price: +el.priceUsd };
      })
    : null;

  const [data, setData] = useState(dataArr);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const windowSize = useResize();
  useEffect(() => {
    setData(dataArr);
    inputRef.current!.checked = true;
  }, [history]);

  const onMonthHandler = () => {
    setData(dataArr && [...dataArr.slice(-30)]);
  };
  const onYearHandler = () => {
    setData(dataArr && dataArr);
  };
  const onWeekHandler = () => {
    setData(dataArr && [...dataArr.slice(-7)]);
  };
  if (!data) {
    return <div>No chart data</div>;
  }
  return (
    <div className={style.chartBlock}>
      <div className={style.chartBlock__radioButtons}>
        <div className={style.radioButtons__button}>
          <input
            ref={inputRef}
            defaultChecked
            id={'year'}
            name={'chart'}
            type="radio"
            onClick={onYearHandler}
          />
          <label htmlFor="year">Прошлом году</label>
        </div>
        <div className={style.radioButtons__button}>
          <input id={'month'} name={'chart'} type="radio" onClick={onMonthHandler} />
          <label htmlFor="month">Прошлом месяце</label>
        </div>
        <div className={style.radioButtons__button}>
          <input id={'week'} name={'chart'} type="radio" onClick={onWeekHandler} />
          <label htmlFor="week">Прошлой неделе</label>
        </div>
      </div>
      <ResponsiveContainer className={style.chartBlock__chart} width="110%" height="94%">
        <LineChart
          data={data}
          width={300}
          height={200}
          margin={{
            top: 20,
            right: 4,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis fontSize={10} className={style.chart__names} dataKey="name" />
          <YAxis fontSize={10} className={style.chart__names} />
          <Tooltip contentStyle={{ fontSize: windowSize > 500 ? '15px' : '15px' }} />
          <Legend fontSize={10} />
          <Line
            fontSize={3}
            type="monotone"
            dataKey="price"
            stroke="#b0cb04"
            activeDot={{ r: 4 }}
            legendType={'none'}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default CurrencyChart;
