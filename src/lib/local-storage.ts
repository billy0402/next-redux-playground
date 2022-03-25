import { isBrowser } from './utils';

const loadJson = <T>(key: string): T =>
  isBrowser() ? JSON.parse(localStorage.getItem(key) || 'null') : null;
const saveJson = <T>(key: string, data: T) =>
  localStorage.setItem(key, JSON.stringify(data));

const removeJson = (key: string) => localStorage.removeItem(key);

export { loadJson, saveJson, removeJson };
