const initMaxLen = (d2arr, xpadding) => {
  d2arr = init3DArr(d2arr);
  let d2arr0Len = d2arr[0].length;
  let maxLenArr = new Array(d2arr0Len);
  let maxLenPaddArr = new Array(d2arr0Len);
  let maxLenVerArr = new Array(d2arr.length);
  let i = 0,
    r = -1;
  xpadding *= 2;
  for (i = 0; i < d2arr0Len; i++) {
    maxLenArr[i] = d2arr[0][0].length;
    maxLenPaddArr[i] = d2arr[0][0].length;
  }
  for (i = 0; i < maxLenVerArr.length; i++) {
    maxLenVerArr[i] = 0;
  }
  for (let row of d2arr) {
    i = -1;
    for (let cell of row) {
      let { max: cellLen, vmax } = findMaxLenInCell(cell);
      if (maxLenArr[++i] < cellLen) maxLenArr[i] = cellLen;
      if (maxLenVerArr[++r] < vmax) maxLenVerArr[r] = vmax;
    }
  }
  let l = maxLenArr.length;
  for (i = 0; i < l; i++) {
    maxLenPaddArr[i] = maxLenArr[i] + xpadding;
  }
  return { maxLenArr, maxLenPaddArr, maxLenVerArr };
};

const findMaxLenInCell = (multiText) => {
  let max = 0,
    vmax = 0;
  let l;
  for (let line of multiText) {
    l = line.length;
    if (max < l) max = l;
    if (line) vmax++;
  }
  return { max, vmax };
};

const init3DArr = (d2Arr) => {
  let d2ArrLen = d2Arr.length;
  for (let row = 0; row < d2ArrLen; row++) {
    for (let cell = 0; cell < d2Arr[row].length; cell++) {
      d2Arr[row][cell] = d2Arr[row][cell].split(/\r\n|\r|\n/);
    }
  }
  return d2Arr;
};

export default initMaxLen;
