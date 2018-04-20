let result = {};

const recursiveDiff = (object1, object2, ignore = []) => {
  Object.keys(object1).map((key) => {
    if (ignore.includes(key)) {
      return null;
    }

    if (Array.isArray(object1[key]) || typeof object1[key] === 'object') {
      recursiveDiff(object1[key], object2[key], ignore);
      return null;
    }

    if (object1[key] && object2[key] !== object1[key]) {
      result[key] = object1[key];
    }

    return null;
  });

  return result;
};

const isEqual = (object1, object2, ignore = []) => {
  result = {};
  const diff = recursiveDiff(object1, object2, ignore);
  return Object.keys(diff).length === 0;
};

export default isEqual;
