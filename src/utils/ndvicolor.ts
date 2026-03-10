export const getNDVIColor = (ndvi: number) => {
  if (ndvi < 0.2) {
    return '#FF0000';
  } else if (ndvi < 0.4) {
    return '#FFA500';
  } else if (ndvi < 0.6) {
    return '#FFFF00';
  } else if (ndvi < 0.8) {
    return '#ADFF2F';
  } else {
    return '#008000';
  }
};
