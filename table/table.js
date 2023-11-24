import { EOL } from "node:os";
import initMaxLen from "./init/initMaxLen.js";
import TABLESET from "./enums/tableSet.js";
import initOptions from "./init/initOptions.js";
import tableCharSets from "./tableCharSets.js";
import TEXTALIGN from "./enums/textAlign.js";
import normalizeTableArr from "./init/normalizeTableArr.js";
const { defaultCharSet } = tableCharSets;

const table = (d2arr, options) => {
  let charSet = defaultCharSet;
  let {
    xpadding,
    ypadding,
    textAlign,
    color,
    bgColor,
    borderColor,
    borderBgColor,
    headerColor,
    headerBgColor,
  } = initOptions(options);
  d2arr = normalizeTableArr(d2arr);
  let { maxLenArr, maxLenPaddArr, maxLenVerArr } = initMaxLen(d2arr, xpadding);
  let allstr = "";
  let i,
    l,
    r = 0,
    subR = 0,
    nowR = -1,
    d2arrLen = d2arr.length - 1;
  allstr += drawDividerLine(
    maxLenPaddArr,
    charSet[TABLESET.topLeft],
    charSet[TABLESET.horisontal],
    charSet[TABLESET.leftTopRight],
    charSet[TABLESET.topRight],
    borderColor,
    borderBgColor
  );
  for (let row of d2arr) {
    l = row.length - 1;
    allstr += yPaddingLine(
      maxLenPaddArr,
      charSet[TABLESET.vertical],
      " ",
      charSet[TABLESET.vertical],
      ypadding,
      color,
      bgColor,
      borderColor,
      borderBgColor
    );
    nowR++;
    for (subR = 0; subR < maxLenVerArr[nowR]; subR++) {
      i = -1;
      for (let cell of row) {
        i++;
        allstr += drawLine(
          cell[subR] ? cell[subR] : " ",
          maxLenArr[i],
          charSet[TABLESET.vertical],
          " ",
          i < l ? undefined : charSet[TABLESET.vertical],
          xpadding,
          textAlign,
          nowR ? color : headerColor,
          nowR ? bgColor : headerBgColor,
          borderColor,
          borderBgColor
        );
      }
      allstr += EOL;
    }
    allstr += yPaddingLine(
      maxLenPaddArr,
      charSet[TABLESET.vertical],
      " ",
      charSet[TABLESET.vertical],
      ypadding,
      color,
      bgColor,
      borderColor,
      borderBgColor
    );
    if (r++ < d2arrLen) {
      allstr += drawDividerLine(
        maxLenPaddArr,
        charSet[TABLESET.topLeftBottom],
        charSet[TABLESET.horisontal],
        charSet[TABLESET.center],
        charSet[TABLESET.topRightBottom],
        borderColor,
        borderBgColor
      );
    }
  }
  allstr += drawDividerLine(
    maxLenPaddArr,
    charSet[TABLESET.bottomLeft],
    charSet[TABLESET.horisontal],
    charSet[TABLESET.leftBottomRight],
    charSet[TABLESET.bottomRight],
    borderColor,
    borderBgColor
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
  bgColor,
  borderColor,
  borderBgColor
) => {
  let text = "";
  let r = -1;
  for (let i = 0; i < ypadding; i++) {
    for (let n of maxLen) {
      // console.log({ n });
      text += drawLine(
        undefined,
        n,
        ++r ? "" : leftChar,
        fillerChar,
        rightChar,
        undefined,
        undefined,
        color,
        bgColor,
        borderColor,
        borderBgColor,
        false
      );
    }
    text += EOL;
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
  bgColor,
  borderColor,
  borderBgColor,
  fillerBorder
) => {
  text = setDefaultString(text);
  let str = paintText(setDefaultString(leftChar), borderColor, borderBgColor);
  let delta = maxLen - text.length;
  let line = fillerChar.repeat(padding);
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
      if (delta && text.length % 2 != maxLen % 2) ndelta++;
      line += fillerChar.repeat(ndelta);
      break;
  }
  line += fillerChar.repeat(padding);
  if (fillerBorder) {
    line = paintText(line, borderColor, borderBgColor);
  } else {
    line = paintText(line, color, bgColor);
  }
  str +=
    line + paintText(setDefaultString(rightChar), borderColor, borderBgColor);
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
    str += drawLine(
      undefined,
      n,
      tleft,
      fillerChar,
      i < l ? centerChar : rightChar,
      undefined,
      undefined,
      undefined,
      undefined,
      color,
      bgColor,
      true
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
export { TEXTALIGN };
