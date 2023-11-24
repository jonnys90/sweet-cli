/**
 * @description 
  │   vertical
  ─   horisontal
  ┌   topLeft
  ┐   topRight
  └   bottomLeft
  ┘   bottomRight
  ├   topLeftBottom
  ┤   topRightBottom
  ┬   leftTopRight
  ┴   leftBottomRight
  ┼   center
 */
/**
 *
 * @param {string} vertical │
 * @param {string} horisontal ─
 * @param {string} topLeft ┌
 * @param {string} topRight ┐
 * @param {string} bottomLeft └
 * @param {string} bottomRight ┘
 * @param {string} topLeftBottom ├
 * @param {string} topRightBottom ┤
 * @param {string} leftTopRight ┬
 * @param {string} leftBottomRight ┴
 * @param {string} center ┼
 * @returns
 */
const customCharSet = (
  vertical,
  horisontal,
  topLeft,
  topRight,
  bottomLeft,
  bottomRight,
  topLeftBottom,
  topRightBottom,
  leftTopRight,
  leftBottomRight,
  center
) =>
  vertical +
  horisontal +
  topLeft +
  topRight +
  bottomLeft +
  bottomRight +
  topLeftBottom +
  topRightBottom +
  leftTopRight +
  leftBottomRight +
  center;
export default customCharSet;
