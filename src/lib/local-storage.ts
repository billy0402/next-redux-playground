const loadJson = <T>(key: string): T =>
  JSON.parse(localStorage.getItem(key) || 'null');

const saveJson = <T>(key: string, data: T) =>
  localStorage.setItem(key, JSON.stringify(data));

export { loadJson, saveJson };
