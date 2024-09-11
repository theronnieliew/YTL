import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];

//Default guideline sizes are based on Figma screen size
const guidelineBaseWidth = 414;
const guidelineBaseHeight = 896;

//Baseline height for shorter/older phones
const minimumHeight = 800;

/**
 * Returns a linear scaled result of the provided size, based on device's screen width
 * @param size
 * @returns number
 */
export const scale = (size: number) => {
  return (shortDimension / guidelineBaseWidth) * size;
};

/**
 * Returns a linear scaled result of the provided size, based on device's screen height
 * @param size
 * @returns number
 */
export const verticalScale = (size: number) => {
  return (longDimension / guidelineBaseHeight) * size;
};

const isSmall = height < minimumHeight;

/**
 * Sometimes you don't want to scale everything in a linear manner, that's where moderateScale comes in.
The cool thing about it is that you can control the resize factor (default is 0.5).

If normal scale will increase your size by +2X, moderateScale will only increase it by +X, 
For example:

➡️   scale(10) = 20

➡️   moderateScale(10) = 15

➡️   moderateScale(10, 0.1) = 11

 * @param size 
 * @param factor 
 * @returns 
 */
export const moderateScale = (size: number, factor = 0.5) => {
  return size + (scale(size) - size) * factor;
};

/**
 * Same as moderateScale, but using verticalScale instead of scale
 * @param size
 * @param factor
 * @returns
 */
export const moderateVerticalScale = (size: number, factor = 0.5) => {
  return size + (verticalScale(size) - size) * factor;
};

export {width, height, minimumHeight, isSmall};
