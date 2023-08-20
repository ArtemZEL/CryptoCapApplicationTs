import { useQuery } from 'react-query';
import { coinsAPI } from '../../api/api';

export const useGetAllCurrencies = (page: number) => {
  return useQuery(['currencies', page], async () => {
    return await coinsAPI.getAssets(page * 6, 6);
  });
};
