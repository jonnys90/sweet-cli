const initMaxLen = (d2arr, xpadding) => {
  let maxLenArr = [];
  let maxLenPaddArr = [];
  // let totalLen = -1;
  let i = 0;
  xpadding *= 2;
  for (let a of d2arr[0]) {
    maxLenArr = [...maxLenArr, a.length];
    maxLenPaddArr = [...maxLenPaddArr, a.length];
  }
  for (let row of d2arr) {
    i = -1;
    for (let cell of row) {
      if (maxLenArr[++i] < cell.length) maxLenArr[i] = cell.length;
    }
  }
  let l = maxLenArr.length;
  for (i = 0; i < l; i++) {
    maxLenPaddArr[i] = maxLenArr[i] + xpadding;
  }
  // for (let n of maxLenArr) {
  //   totalLen += n + 1;
  // }
  // totalLen += xpadding * 2 * d2arr[0].length;
  return { maxLenArr, maxLenPaddArr };
  // return { maxLenArr, totalLen };
};
export default initMaxLen;
