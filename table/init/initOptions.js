import chalk from "chalk";
import TEXTALIGN from "../enums/textAlign.js";
import tableCharSets from "../tableCharSets.js";
import defaultCharSet from "../tableCharSets.js";

const defaultOptions = {
  // title: "",
  // titleAlign: textAlign,
  // titleColor: color
  // titleBgColor: bgColor
  // trim: true,//?
  padding: 2,
  // xpadding: padding,
  // ypadding: round(padding / 3),
  // margin: 0,//?
  textAlign: TEXTALIGN.CNTER,
  color: chalk.greenBright,
  bgColor: chalk.bgBlack,
  // borderColor: chalk.redBright,
  // borderBgColor: chalk.bgGray,
  headerColor: chalk.blueBright,
  // headerBgColor:bgColor
  charSet: defaultCharSet,
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
    borderColor,
    borderBgColor,
    // titleColor,
    // titleBgColor,
    headerColor,
    headerBgColor,
    charSet,
  } = {
    ...defaultOptions,
    ...options,
  };
  // let charSet = tableCharSets.defaultCharSet;
  if (!borderColor) borderColor = color;
  if (!borderBgColor) borderBgColor = bgColor;
  if (!headerColor) headerColor = color;
  if (!headerBgColor) headerBgColor = bgColor;
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
    headerColor,
    headerBgColor,
  };
};
const setPaddings = (xpadding, ypadding, padding = 2) => {
  if (!xpadding) {
    xpadding = padding;
  }
  if (!ypadding) {
    ypadding = parseInt(padding / 3);
  }
  return { xpadding, ypadding };
};
export default initOptions;
