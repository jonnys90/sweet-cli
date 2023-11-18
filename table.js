import { EOL } from "node:os";
import initMaxLen from "./init/initMaxLen.js";
import TABLESET from "./enums/tableSet.js";
import initOptions from "./init/initOptions.js";
import tableCharSets from "./tableCharSets.js";
import TEXTALIGN from "./enums/textAlign.js";

const { defaultCharSet } = tableCharSets;

const table = (d2arr, options) => {
  let charSet = defaultCharSet;
  let {
    xpadding,
    ypadding,
    textAlign,
    color,
    bgColor,
    borderBgColor,
    borderColor,
  } = initOptions(options);
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
      ypadding,
      color,
      bgColor
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
        textAlign,
        color,
        bgColor
      );
    }
    allstr += EOL;
    allstr += yPaddingLine(
      maxLenPaddArr,
      charSet[TABLESET.vertical],
      " ",
      charSet[TABLESET.vertical],
      ypadding,
      color,
      bgColor
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

const yPaddingLine = (
  maxLen,
  leftChar,
  fillerChar,
  rightChar,
  ypadding,
  color,
  bgColor
) => {
  let text = "";
  for (let i = 0; i < ypadding; i++) {
    text += drawDividerLine(
      maxLen,
      leftChar,
      fillerChar,
      rightChar,
      rightChar,
      color,
      bgColor
    );
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
  textAlign,
  color,
  bgColor
) => {
  text = setDefaultString(text);
  let str = setDefaultString(leftChar);
  let delta = maxLen - text.length;
  let line = fillerChar.repeat(padding);
  // str += fillerChar.repeat(padding);
  switch (textAlign) {
    case TEXTALIGN.LEFT:
      line += text;
      line += fillerChar.repeat(delta);
      break;
    case TEXTALIGN.RIGHT:
      line += fillerChar.repeat(delta);
      line += text;
      break;
    default:
      let ndelta = parseInt(delta / 2);
      line += fillerChar.repeat(ndelta);
      line += text;
      if (delta && text.length % 2) ndelta++;
      line += fillerChar.repeat(ndelta);
      break;
  }
  line += fillerChar.repeat(padding);
  str += paintText(line, color, bgColor) + setDefaultString(rightChar);
  return str;
};

const drawDividerLine = (
  maxLen,
  leftChar,
  fillerChar,
  centerChar,
  rightChar,
  color,
  bgColor
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
      i < l ? centerChar : rightChar,
      undefined,
      color,
      bgColor
    );
    i++;
  }
  return str + EOL;
};

const paintText = (str, color, bgColor) => {
  if (color) str = color(str);
  if (bgColor) str = bgColor(str);
  return str;
};

export default table;
