import { orderBy, toNumber, isString } from 'lodash';

const isNumber = (n: unknown) => {
  return typeof n != 'boolean' && !isNaN(n as number);
};

export const sort = <T>(data: T[], by: Extract<keyof T, string>, order?: 'asc' | 'desc'): T[] => {
  const sortedData = orderBy(
    [...data],
    (item) => {
      const element = item[by];
      if (isNumber(element)) {
        return toNumber(element);
      }
      if (isString(element)) {
        return element.toLowerCase();
      }

      return element;
    },
    [order ?? 'desc']
  );
  return sortedData;
};

export const getTypedKeys = <T extends string | number | symbol, K>(obj: Record<T, K>) => {
  return Object.keys(obj) as T[];
};
