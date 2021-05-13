export const normalizeEntities = (entitiesArray) => {
  return entitiesArray.reduce((normalizedResults, e) => {
    normalizedResults[e.id] = normalizeEntity(e);
    return normalizedResults;
  }, {});
};

export const normalizeEntity = e => {
  const normalized = {};

  Object.keys(e).forEach(key => {
    let val = e[key];
    if (Array.isArray(val)) {
      val = val.map(v => (v.id ? v.id : v));
    }

    normalized[key] = val;
  });

  return normalized;
};

export const denormalizeEntities = (entitiesObject) => (
  Object.keys(entitiesObject).map(k => entitiesObject[k])
);