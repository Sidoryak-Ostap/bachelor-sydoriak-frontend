export function calculateYieldForecast(ndvi: number | null | undefined): number {
  if (ndvi === null || ndvi === undefined || isNaN(ndvi)) {
    return 0;
  }

  const minNdvi = 0.2;
  const maxNdvi = 0.85;
  const minYield = 4.0;
  const maxYield = 7.0;

  const clampedNdvi = Math.max(minNdvi, Math.min(maxNdvi, ndvi));

  const estimatedYield =
    ((clampedNdvi - minNdvi) * (maxYield - minYield)) / (maxNdvi - minNdvi) + minYield;

  return estimatedYield;
}
