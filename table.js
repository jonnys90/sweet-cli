import { EOL } from "node:os";
import initMaxLen from "./init/initMaxLen.js";
import TABLESET from "./enums/tableSet.js";
import initOptions from "./init/initOptions.js";
import tableCharSets from "./tableCharSets.js";
import TEXTALIGN from "./enums/textAlign.js";

const { defaultCharSet } = tableCharSets;

const table = (d2arr, options) => {
  let charSet = defaultCharSet;
  let { xpadding, ypadding, textAlign } = initOptions(options);
  let { maxLenArr, maxLenPaddArr } = initMaxLen(d2arr, xpadding);
  let allstr = "";
  let i,
    l,
    r = 0,
    d2arrLen = d2arr.length - 1;

  // console.log({ maxLenArr, maxLenPaddArr, xpadding, ypadding });
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
    allstr += yPaddingLine(
      maxLenPaddArr,
      charSet[TABLESET.vertical],
      " ",
      charSet[TABLESET.vertical],
      ypadding
    );
    for (let cell of row) {
      i++;
      allstr += drawLine(
        cell,
        maxLenArr[i],
        charSet[TABLESET.vertical],
        " ",
        i < l ? undefined : charSet[TABLESET.vertical],
        xpadding,
        textAlign
      );
    }
    allstr += EOL;
    allstr += yPaddingLine(
      maxLenPaddArr,
      charSet[TABLESET.vertical],
      " ",
      charSet[TABLESET.vertical],
      ypadding
    );
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

const yPaddingLine = (maxLen, leftChar, fillerChar, rightChar, ypadding) => {
  let text = "";
  for (let i = 0; i < ypadding; i++) {
    text += drawDividerLine(maxLen, leftChar, fillerChar, rightChar, rightChar);
  }
  return text;
};

const drawLine = (
  text,
  maxLen,
  leftChar,
  fillerChar,
  rightChar,
  padding = 0,
  textAlign
) => {
  text = setDefaultString(text);
  let str = setDefaultString(leftChar);
  let delta = maxLen - text.length;
  str += fillerChar.repeat(padding);
  switch (textAlign) {
    case TEXTALIGN.LEFT:
      str += text;
      str += fillerChar.repeat(delta);
      break;
    case TEXTALIGN.RIGHT:
      str += fillerChar.repeat(delta);
      str += text;
      break;
    default:
      let ndelta = parseInt(delta / 2);
      str += fillerChar.repeat(ndelta);
      str += text;
      if (delta && text.length % 2) ndelta++;
      str += fillerChar.repeat(ndelta);
      break;
  }
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
    l = maxLen.length - 1;
  for (let n of maxLen) {
    let tleft = "";
    if (!i) tleft = leftChar;
    if (n % 2) tleft += fillerChar;
    str += drawLine(
      undefined,
      n,
      tleft,
      fillerChar,
      i < l ? centerChar : rightChar
    );
    // str += drawLine(
    //   undefined,
    //   n,
    //   i === 0 ? leftChar : "@",
    //   fillerChar,
    //   i < l ? centerChar : rightChar
    // );
    i++;
  }
  return str + EOL;
};

export default table;
