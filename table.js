// import chalk from "chalk";
import { EOL } from "node:os";

const tableSet1 = "│─┌┐└┘├┤┬┴┼";
const TABLESET = {
  horisontal: 1, // ─
  vertical: 0, // │
  topLeft: 2,
  topRight: 3,
  bottomLeft: 4,
  bottomRight: 5,
};

const TEXTALIGN = {
  CENTER: "center",
  RIGHT: "right",
  LEFT: "left",
};

const defaultOptions = {
  title: "",
  // titleAlign: textAlign,
  // titleColor: color
  // titleBgColor: bgColor
  trim: true,
  padding: 2,
  // xpadding: padding,
  // ypadding: round(padding / 2),
  // margin: 0,
  textAlign: TEXTALIGN.CENTER,
  // color: chalk.greenBright,
  // bgColor: chalk.bgBlack,
  // borderColor: color,
  // borderBgColor: bgColor,
};

const normalizeOptions = (str, options) => {
  let {
    trim,
    title,
    titleAlign,
    padding,
    xpadding,
    ypadding,
    textAlign,
    color,
    bgColor,
    borderBgColor,
    borderColor,
    titleColor,
    titleBgColor,
  } = {
    ...defaultOptions,
    ...options,
  };
  let charSet = tableSet1;
  if (!borderBgColor) borderBgColor = bgColor;
  if (!borderColor) borderColor = color;
  if (!titleColor) titleColor = color;
  if (!titleBgColor) titleBgColor = bgColor;
  if (!titleAlign) titleAlign = textAlign;
  let text = str.split(/\r\n|\r|\n/);
  const { xpadding: nxpadding, ypadding: nypadding } = setPaddings(
    xpadding,
    ypadding,
    padding
  );
  if (trim) text = text.map((txt) => txt.trim());
  let { maxChars, maxCharsWithPadding } = getMaxChars(text, title, nxpadding);
  return {
    text,
    title,
    titleAlign,
    textAlign,
    charSet,
    maxChars,
    maxCharsWithPadding,
    nxpadding,
    nypadding,
    color,
    bgColor,
    borderBgColor,
    borderColor,
    titleColor,
    titleBgColor,
  };
};

const box = (str, options) => {
  const {
    text,
    title,
    titleAlign,
    textAlign,
    charSet,
    maxChars,
    maxCharsWithPadding,
    nxpadding,
    nypadding,
    color,
    bgColor,
    borderBgColor,
    borderColor,
    titleColor,
    titleBgColor,
  } = normalizeOptions(str, options);
  let tableText = "";
  tableText += boxHead(
    title,
    maxCharsWithPadding,
    titleAlign,
    charSet,
    borderColor,
    borderBgColor,
    titleColor,
    titleBgColor
  );
  tableText += boxBody(
    text,
    maxChars,
    textAlign,
    charSet,
    nxpadding,
    nypadding,
    color,
    bgColor,
    borderColor,
    borderBgColor
  );
  tableText += boxFooter(
    maxCharsWithPadding,
    charSet,
    borderColor,
    borderBgColor
  );
  console.log(tableText);
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

const boxLine = (
  line,
  maxChars,
  align,
  charSet,
  xpadding,
  color,
  bgColor,
  borderColor,
  borderBgColor
) => {
  let str;
  let nline = "";
  let delta = maxChars - line.length;
  switch (align) {
    case TEXTALIGN.LEFT:
      nline += line + " ".repeat(delta);
      break;
    case TEXTALIGN.RIGHT:
      nline += " ".repeat(delta) + line;
      break;
    case TEXTALIGN.CENTER:
      delta = Math.round(delta / 2);
      nline += " ".repeat(delta) + line + " ".repeat(delta);
      break;
  }
  if (nline.length > maxChars) xpadding--;
  str = " ".repeat(xpadding);
  if (nline.length > maxChars) xpadding++;
  str += nline + " ".repeat(xpadding);
  str = paintText(str, color, bgColor);
  let prePostFix = paintText(
    charSet[TABLESET.vertical],
    borderColor,
    borderBgColor
  );
  return prePostFix + str + prePostFix + EOL;
};

const boxBody = (
  text,
  maxChars,
  align,
  charSet,
  xpadding,
  ypadding,
  color,
  bgColor,
  borderColor,
  borderBgColor
) => {
  let str = "";
  str += boxVPadding(
    maxChars,
    align,
    charSet,
    xpadding,
    ypadding,
    bgColor,
    borderColor,
    borderBgColor
  );
  for (let line of text) {
    str += boxLine(
      line,
      maxChars,
      align,
      charSet,
      xpadding,
      color,
      bgColor,
      borderColor,
      borderBgColor
    );
  }
  str += boxVPadding(
    maxChars,
    align,
    charSet,
    xpadding,
    ypadding,
    bgColor,
    borderColor,
    borderBgColor
  );
  return str;
};

const boxVPadding = (
  maxChars,
  align,
  charSet,
  xpadding,
  ypadding,
  bgColor,
  borderColor,
  borderBgColor
) => {
  let str = "";
  for (let i = 0; i < ypadding; i++)
    str += boxLine(
      " ",
      maxChars,
      align,
      charSet,
      xpadding,
      undefined,
      bgColor,
      borderColor,
      borderBgColor
    );
  return str;
};

const boxHead = (
  title,
  maxChars,
  align,
  charSet,
  borderColor,
  borderBgColor,
  titleColor,
  titleBgColor
) => {
  let str = charSet[TABLESET.topLeft];
  let delta = maxChars - title.length;
  let line;
  str = paintText(str, borderColor, borderBgColor);
  title = paintText(title, titleColor, titleBgColor);
  switch (align) {
    case TEXTALIGN.LEFT:
      line = charSet[TABLESET.horisontal].repeat(delta);
      line = paintText(line, borderColor, borderBgColor);
      str += title + line;
      break;
    case TEXTALIGN.CENTER:
      delta = Math.round(delta / 2);
      str +=
        paintText(
          charSet[TABLESET.horisontal].repeat(delta % 2 ? delta - 1 : delta),
          borderColor,
          borderBgColor
        ) +
        title +
        paintText(
          charSet[TABLESET.horisontal].repeat(delta),
          borderColor,
          borderBgColor
        );
      break;
    case TEXTALIGN.RIGHT:
      str +=
        paintText(
          charSet[TABLESET.horisontal].repeat(delta),
          borderColor,
          borderBgColor
        ) + title;
      break;
  }
  line = charSet[TABLESET.topRight];
  line = paintText(line, borderColor, borderBgColor);
  return str + line + EOL;
};

const paintText = (str, color, bgColor) => {
  if (color) str = color(str);
  if (bgColor) str = bgColor(str);
  return str;
};

const boxFooter = (maxChars, charSet, borderColor, borderBgColor) =>
  paintText(
    charSet[TABLESET.bottomLeft] +
      charSet[TABLESET.horisontal].repeat(maxChars) +
      charSet[TABLESET.bottomRight],
    borderColor,
    borderBgColor
  ) + EOL;

const getMaxChars = (text, title, padding) => {
  let maxChars = 0;
  for (let line of text) {
    maxChars = maxChars < line.length ? line.length : maxChars;
  }
  if (title && maxChars < title.length) maxChars = title.length;
  if (maxChars % 2) maxChars++;
  return { maxChars, maxCharsWithPadding: maxChars + padding * 2 };
};

// export default table;
export { box };
