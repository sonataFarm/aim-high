const normalize = (entities) => {
  return entities.reduce((normalized, e) => {
    normalized[e.id] = e;
    return normalized;
  }, {});
};

export default normalize;