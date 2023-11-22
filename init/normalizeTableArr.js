const normalizeTableArr = (d2Arr) => {
  let l = d2Arr.length;
  let maxR = findMaxRLength(d2Arr);
  let delta, tarr;
  for (let i = 0; i < l; i++) {
    if (maxR > d2Arr[i].length) {
      delta = maxR - d2Arr[i].length;
      tarr = Array(delta);
      for (let j = 0; j < delta; j++) tarr[j] = "";
      d2Arr[i] = [...d2Arr[i], ...tarr];
    }
  }
  return d2Arr;
};

const findMaxRLength = (d2Arr) => {
  let l = d2Arr.length;
  let maxR = 0;
  for (let i = 0; i < l; i++) {
    if (maxR < d2Arr[i].length) maxR = d2Arr[i].length;
  }
  return maxR;
};

export default normalizeTableArr;
