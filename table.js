import { EOL } from "node:os";
import initMaxLen from "./init/initMaxLen.js";
import TABLESET from "./enums/tableSet.js";
import initOptions from "./init/initOptions.js";
import tableCharSets from "./tableCharSets.js";

const { defaultCharSet } = tableCharSets;
/*
  │ 0   vertical
  ─ 1   horisontal
  ┌ 2   topLeft
  ┐ 3   topRight
  └ 4   bottomLeft
  ┘ 5   bottomRight
  ├ 6   topLeftBottom
  ┤ 7   topRightBottom
  ┬ 8   leftTopRight
  ┴ 9   leftBottomRight
  ┼ 10  center
*/

const table = (d2arr, options) => {
  let charSet = defaultCharSet;
  let { xpadding, ypadding } = initOptions(options);
  let { maxLenArr, maxLenPaddArr } = initMaxLen(d2arr, xpadding);
  let allstr = "";
  let i,
    l,
    r = 0,
    d2arrLen = d2arr.length - 1;

  console.log({ maxLenArr, maxLenPaddArr, xpadding, ypadding });
  // console.log({ maxLenArr, totalLen, xpadding, ypadding });
  allstr += drawDividerLine(
    maxLenPaddArr,
    charSet[TABLESET.topLeft],
    charSet[TABLESET.horisontal],
    charSet[TABLESET.leftTopRight],
    charSet[TABLESET.topRight]
  );
  for (let row of d2arr) {
    i = -1;
    l = row.length - 1;
    for (let cell of row) {
      i++;
      allstr += drawLine(
        cell,
        maxLenArr[i],
        charSet[TABLESET.vertical],
        " ",
        i < l ? undefined : charSet[TABLESET.vertical],
        xpadding
      );
    }
    allstr += EOL;
    if (r++ < d2arrLen) {
      allstr += drawDividerLine(
        maxLenPaddArr,
        charSet[TABLESET.topLeftBottom],
        charSet[TABLESET.horisontal],
        charSet[TABLESET.center],
        charSet[TABLESET.topRightBottom]
      );
    }
  }
  allstr += drawDividerLine(
    maxLenPaddArr,
    charSet[TABLESET.bottomLeft],
    charSet[TABLESET.horisontal],
    charSet[TABLESET.leftBottomRight],
    charSet[TABLESET.bottomRight]
  );
  allstr += console.log(allstr);
};

const setDefaultString = (str, def = "") => (str ? str : def);

const drawLine = (
  text,
  maxLen,
  leftChar,
  fillerChar,
  rightChar,
  padding = 0
) => {
  text = setDefaultString(text);
  let str = setDefaultString(leftChar);
  let delta = maxLen - text.length;
  str += fillerChar.repeat(padding);
  str += text;
  str += fillerChar.repeat(delta);
  str += fillerChar.repeat(padding);
  str += setDefaultString(rightChar);
  return str;
};

const drawDividerLine = (
  maxLen,
  leftChar,
  fillerChar,
  centerChar,
  rightChar
) => {
  let str = "";
  let i = 0,
    l = maxLen.length;
  for (let n of maxLen) {
    str += drawLine(
      undefined,
      n,
      i === 0 ? leftChar : "",
      fillerChar,
      i + 1 < l ? centerChar : rightChar
    );
    i++;
  }
  return str + EOL;
};

export default table;
