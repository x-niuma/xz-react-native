import { Dimensions } from 'react-native';
const window = Dimensions.get('window');

export default {
  window: window,
  gWidth: window.width,
  gHeight: window.height
};
