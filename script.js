//ATENÇÃO: O PARÂMETRO OPCIONAL 'thisArg' SÓ
//FUNCIONARÁ EM CALLBACKS DEFINIDAS COM A KEYWORD
//FUNCTION.

function newForEach(array, callback, thisArg) {
  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    boundCallback(array[i], i, [...array]);
  }

  return undefined;
}

function newMap(array, callback, thisArg) {
  const mapedArray = [...array];

  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    mapedArray[i] = boundCallback(array[i], i, [...array]);
  }

  return mapedArray;
}

function newFilter(array, callback, thisArg) {
  const filteredArray = [];

  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    if (boundCallback(array[i], i, [...array])) {
      filteredArray.push(array[i]);
    }
  }

  return filteredArray;
}

function newFind(array, callback, thisArg) {
  let foundItem = undefined;

  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    if (boundCallback(array[i], i, [...array])) {
      foundItem = array[i];

      break;
    }
  }

  return foundItem;
}

function newFindIndex(array, callback, thisArg) {
  let indexOfArrayItem = -1;

  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    if (boundCallback(array[i], i, [...array])) {
      indexOfArrayItem = i;

      break;
    }
  }

  return indexOfArrayItem;
}

function newReduce(array, callback, accumulator = array[0]) {
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
}

function newSome(array, callback, thisArg) {
  let someItemPassTest = false;

  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    if (boundCallback(array[i], i, [...array])) {
      someItemPassTest = true;

      break;
    }
  }

  return someItemPassTest;
}

function newEvery(array, callback, thisArg) {
  let everyItemPassTest = true;

  for (let i = 0; i < array.length; i++) {
    const boundCallback = callback.bind(thisArg);

    if (!boundCallback(array[i], i, [...array])) {
      everyItemPassTest = false;

      break;
    }
  }

  return everyItemPassTest;
}

function newFill(array, value, start = 0, end = array.length) {
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
}

function newIncludes(array, searchElement, fromIndex = 0) {
  let isItemPresent = false;

  for (let i = fromIndex; i < array.length; i++) {
    if (searchElement === array[i]) {
      isItemPresent = true;

      break;
    }
  }

  return isItemPresent;
}

function newIndexOf(array, searchElement, fromIndex = 0) {
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
}

function newConcat(array, ...valuesOrArrays) {
  const copyArray = [...array];

  for (let i = 0; i < valuesOrArrays.length; i++) {
    if (Array.isArray(valuesOrArrays[i])) {
      const line = valuesOrArrays[i];

      for (let j = 0; j < line.length; j++) {
        copyArray.push(line[j]);
      }
    } else {
      copyArray.push(valuesOrArrays[i]);
    }
  }

  return copyArray;
}

function newJoin(array, separator = ",") {
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
}

function newSlice(array, startIndex = 0, numberOfElements = array.length) {
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
}

function newFlat(array, depth = 1) {
  let copyArray = [...array];

  if (depth === 0) depth = 1;

  if (depth < 0) depth *= -1;

  while (depth > 0) {
    copyArray = newReduce(copyArray, (acc, cur) => newConcat(acc, cur), []);

    depth--;
  }

  return copyArray;
}

function newFlatMap(array, callback, thisArg) {
  let copyArray = [...array];

  copyArray = newMap(copyArray, callback, thisArg);

  copyArray = newReduce(copyArray, (acc, cur) => newConcat(acc, cur), []);

  return copyArray;
}
