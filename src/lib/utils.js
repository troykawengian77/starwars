import { PixelRatio, Dimensions, Platform } from 'react-native';

export const { width, height } = Dimensions.get('window');

let ratio = PixelRatio.get();

export const RATIO = 360 / width;

export const BASE_URL = ''

export const dataBulan = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
]

export const dataTahun = () => {
  let data = []
  for (var i = 0; i < 130; i++) {
    data.push((1970 + i).toString())
  }
  return data
}

export const getColor = (status) => {
  switch (status) {
    case 'OPEN':
      return '#f5222d';
    case 'AWAITING':
      return '#fa8c16';
    case 'IN PROGRESS':
      return '#1890ff';
    case 'COMPLETE':
      return '#52c41a';
    case 'CLOSED':
      return '#bfbfbf';
    default:
      break;
  }
}

export const headerHeight = height * 0.06

export const FONT = Platform.OS == 'ios' ? 2 : 0

export default { RATIO, BASE_URL, URL, FONT }
