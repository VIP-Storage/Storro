export const getIconColor = (color: string): string => {
  switch (color) {
    case 'green':
      return '#76ff03';
    case 'red':
      return '#ff1744';
    case 'blue':
      return '#65acf3';
    default:
      return '#000';
  }
}
