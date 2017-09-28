export const shoesFields = 'id,name,shopUrl,season,color,brand,attributes,units,media.images';
export const categoryFields = 'name,key,cid,childKeys,suggestedFilters';
export const buildQueryStrByParameters = (data) => {
  const q = [];
  const keys = Object.keys(data);
  for (let i = 0; i < keys.length; i++) {
    // check is the value type of array or string
    const value = data[keys[i]];
    if (Array.isArray(value)) {
      for (let j = 0; j < value.length; j++) {
        q.push(encodeURI(`${keys[i]}=${value[i]}`));
      }
    } else {
      q.push(encodeURI(`${keys[i]}=${value}`));
    }
  }
  return q.join('&');
};
