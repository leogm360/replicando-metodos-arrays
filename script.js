Array.prototype.newForEach = function (callback, thisArg) {
  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    boundCallback(array[i], i, [...array]);
  }

  return undefined;
};

Array.prototype.newMap = function (callback, thisArg) {
  const mapedArray = [...array];

  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    mapedArray[i] = boundCallback(array[i], i, [...array]);
  }

  return mapedArray;
};

Array.prototype.newFilter = function (callback, thisArg) {
  const filteredArray = [];

  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    if (boundCallback(array[i], i, [...array])) {
      filteredArray.push(array[i]);
    }
  }

  return filteredArray;
};

Array.prototype.newFind = function (callback, thisArg) {
  let foundItem = undefined;

  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    if (boundCallback(array[i], i, [...array])) {
      foundItem = array[i];

      break;
    }
  }

  return foundItem;
};

Array.prototype.newFindIndex = function (callback, thisArg) {
  let indexOfArrayItem = -1;

  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    if (boundCallback(array[i], i, [...array])) {
      indexOfArrayItem = i;

      break;
    }
  }

  return indexOfArrayItem;
};

Array.prototype.newReduce = function (callback, accumulator = array[0]) {
  if (newJoin(array, "").length === 0 && accumulator === undefined) {
    throw new TypeError("Reduce of empty array with no initial value");
  }

  let i = accumulator === array[0] ? 1 : 0;

  for (i; i < array.length; i++) {
    if (newJoin(array, "").length === 1 && accumulator === undefined) {
      accumulator = newFind(array, (element) => element !== undefined);

      break;
    }

    if (newJoin(array, "").length === 0) {
      break;
    }

    accumulator = callback(accumulator, array[i], i, [...array]);
  }

  return accumulator;
};

Array.prototype.newSome = function (callback, thisArg) {
  let someItemPassTest = false;

  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    if (boundCallback(array[i], i, [...array])) {
      someItemPassTest = true;

      break;
    }
  }

  return someItemPassTest;
};

Array.prototype.newEvery = function (callback, thisArg) {
  let everyItemPassTest = true;

  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    if (!boundCallback(array[i], i, [...array])) {
      everyItemPassTest = false;

      break;
    }
  }

  return everyItemPassTest;
};

Array.prototype.newEvery = function (value, start = 0, end = array.length) {
  if (start < 0) {
    start = array.length + start;
  }

  if (end < 0) {
    end = array.length + end;
  }

  for (let i = 0; i < array.length; i++) {
    if (i >= start && i < end) array[i] = value;
  }

  return array;
};

Array.prototype.newIncludes = function (searchElement, fromIndex = 0) {
  let isItemPresent = false;

  for (let i = fromIndex; i < array.length; i++) {
    if (searchElement === array[i]) {
      isItemPresent = true;

      break;
    }
  }

  return isItemPresent;
};

Array.prototype.newIndexOf = function (searchElement, fromIndex = 0) {
  let elementIndex = -1;

  if (fromIndex < 0) {
    fromIndex *= -1;
  }

  for (let i = fromIndex; i < array.length; i++) {
    if (searchElement === array[i]) {
      elementIndex = i;
    }
  }

  return elementIndex;
};

Array.prototype.newConcat = function (...valuesOrArrays) {
  const concatenatedArray = [...array];

  for (let i = 0; i < valuesOrArrays.length; i++) {
    if (Array.isArray(valuesOrArrays[i])) {
      const line = valuesOrArrays[i];

      for (let j = 0; j < line.length; j++) {
        concatenatedArray.push(line[j]);
      }
    } else {
      concatenatedArray.push(valuesOrArrays[i]);
    }
  }

  return concatenatedArray;
};

Array.prototype.newJoin = function (separator = ",") {
  let concatenatedString = "";

  for (let i = 0; i < array.length; i++) {
    if (i === array.length - 1) {
      concatenatedString += `${
        array[i] === undefined || array[i] === null ? "" : array[i]
      }`;
    } else {
      concatenatedString += `${
        array[i] === undefined || array[i] === null ? "" : array[i]
      }${separator}`;
    }
  }

  return concatenatedString;
};

Array.prototype.newSlice = function (
  array,
  startIndex = 0,
  numberOfElements = array.length
) {
  const slicedArray = [];

  if (startIndex < 0) {
    startIndex = array.length + startIndex;
  }

  if (numberOfElements < 0) {
    numberOfElements *= -1;
  }

  for (let i = 0; i < array.length; i++) {
    if (i >= startIndex && i <= numberOfElements - 1) {
      slicedArray.push(array[i]);
    }
  }

  return slicedArray;
};

Array.prototype.newFlat = function (depth = 1) {
  let flatenedArray = [...array];

  if (depth < 0) depth *= -1;

  while (depth > 0) {
    flatenedArray.newReduce((acc, cur) => acc.newConcat(cur));

    depth--;
  }

  return flatenedArray;
};

Array.prototype.newFlatMap = function (callback, thisArg) {
  let copyArray = [...array];

  flatenedArray
    .newMap(callback, thisArg)
    .newReduce((acc, cur) => acc.newConcat(cur));

  return copyArray;
};
