// 1평 = 3.30578㎡
export const convertToPyeong = (squareMeters: number): number => {
  return Number((squareMeters / 3.30578).toFixed(2));
};

export const formatArea = (squareMeters: number): string => {
  const pyeong = convertToPyeong(squareMeters);
  return `${squareMeters}㎡ (${pyeong}평)`;
}; 