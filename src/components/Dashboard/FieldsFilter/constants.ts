export const CROP_TYPES = [
  { value: 'wheat', secondValue: 'пшениця', label: 'general.cropOptions.wheat' },
  { value: 'barley', secondValue: 'ячмінь', label: 'general.cropOptions.barley' },
  { value: 'soyBeans', secondValue: 'соя', label: 'general.cropOptions.soyBeans' },
  { value: 'rapeseed', secondValue: 'ріпак', label: 'general.cropOptions.rapeseed' },
  { value: 'sunflower', secondValue: 'соняшник', label: 'general.cropOptions.sunflower' },
  { value: 'corn', secondValue: 'кукурудза', label: 'general.cropOptions.corn' },
  { value: 'rye', secondValue: 'жито', label: 'general.cropOptions.rye' },
  { value: 'oats', secondValue: 'овес', label: 'general.cropOptions.oats' },
];

export const SOIL_TYPES = [
  { value: 'loam', secondValue: 'суглинок', label: 'general.soilOptions.loam' },
  { value: 'sandy', secondValue: 'пісок', label: 'general.soilOptions.sand' },
  { value: 'clay', secondValue: 'глина', label: 'general.soilOptions.clay' },
  { value: 'silt', secondValue: 'мул', label: 'general.soilOptions.silt' },
  { value: 'peat', secondValue: 'торф', label: 'general.soilOptions.peat' },
  { value: 'chalk', secondValue: 'крейда', label: 'general.soilOptions.chalk' },
  { value: 'gravel', secondValue: 'гравій', label: 'general.soilOptions.gravel' },
];

export const FORECAST_STATUS_LABELS: Record<string, { en: string; uk: string }> = {
  final: {
    en: 'Final forecast',
    uk: 'Фінальний прогноз',
  },
  mid_preliminary: {
    en: 'Mid-season forecast',
    uk: 'Прогноз середини сезону',
  },
  early_preliminary: {
    en: 'Early forecast',
    uk: 'Ранній прогноз',
  },
};
