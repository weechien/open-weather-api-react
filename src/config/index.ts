import { getConstants } from './constants';
import { getEnv } from './env';

export const getConfig = () => ({
  ...getConstants(),
  ...getEnv()
});
