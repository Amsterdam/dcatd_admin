let result = {};

const recursiveDiff = (obj1, obj2, ignore = []) => {
  Object.keys(obj1).map((key) => {
    if (ignore.includes(key)) {
      return null;
    }

    if (Array.isArray(obj1[key]) || typeof obj1[key] === 'object') {
      recursiveDiff(obj1[key], obj2[key]);
      return null;
    }

    if (obj1[key] && obj2[key] !== obj1[key]) {
      result[key] = obj1[key] || obj2[key];
    }

    return null;
  });

  return result;
};

const isEqual = (obj1, obj2, ignore = []) => {
  result = {};
  const diff = recursiveDiff(obj1, obj2, ignore);
  return Object.keys(diff).length === 0;
};

export default isEqual;
