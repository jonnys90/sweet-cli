import TEXTALIGN from "../enums/textAlign.js";

import tableCharSets from "../tableCharSets.js";

const defaultOptions = {
  //   title: "",
  // titleAlign: textAlign,
  // titleColor: color
  // titleBgColor: bgColor
  trim: true,
  padding: 2,
  // xpadding: padding,
  // ypadding: round(padding / 2),
  // margin: 0,
  // textAlign: TEXTALIGN.CENTER,
  // color: chalk.greenBright,
  // bgColor: chalk.bgBlack,
  // borderColor: color,
  // borderBgColor: bgColor,
};

const initOptions = (options = {}) => {
  let {
    trim,
    // title,
    // titleAlign,
    padding,
    xpadding,
    ypadding,
    textAlign,
    color,
    bgColor,
    borderBgColor,
    borderColor,
    // titleColor,
    // titleBgColor,
  } = {
    ...defaultOptions,
    ...options,
  };
  let charSet = tableCharSets.defaultCharSet;
  if (!borderBgColor) borderBgColor = bgColor;
  if (!borderColor) borderColor = color;
  //   if (!titleColor) titleColor = color;
  //   if (!titleBgColor) titleBgColor = bgColor;
  //   if (!titleAlign) titleAlign = textAlign;
  //   let text = str.split(/\r\n|\r|\n/);
  const { xpadding: nxpadding, ypadding: nypadding } = setPaddings(
    xpadding,
    ypadding,
    padding
  );
  //   if (trim) text = text.map((txt) => txt.trim());
  //   let { maxChars, maxCharsWithPadding } = getMaxChars(text, title, nxpadding);
  return {
    // text,
    // title,
    // titleAlign,
    trim,
    textAlign,
    charSet,
    // maxChars,
    // maxCharsWithPadding,
    xpadding: nxpadding,
    ypadding: nypadding,
    color,
    bgColor,
    borderBgColor,
    borderColor,
    // titleColor,
    // titleBgColor,
  };
};
const setPaddings = (xpadding, ypadding, padding = 2) => {
  if (!xpadding) {
    xpadding = padding;
  }
  if (!ypadding) {
    ypadding = Math.round(padding / 2);
  }
  return { xpadding, ypadding };
};
export default initOptions;
