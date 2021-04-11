export const normalize = (entitiesArray) => {
  return entitiesArray.reduce((normalized, e) => {
    normalized[e.id] = e;
    return normalized;
  }, {});
};

export const denormalize = (entitiesObject) => (
  Object.keys(entitiesObject).map(k => entitiesObject[k])
);

export default normalize;