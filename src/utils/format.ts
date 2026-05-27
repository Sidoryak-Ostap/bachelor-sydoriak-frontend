export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (date: string | Date, locale: string = 'en') => {
  const localeParam = locale === 'en' ? 'en-US' : 'uk-UA';

  return new Date(date).toLocaleDateString(localeParam, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const formattedShortDate = (date: string | Date, locale: string = 'en') => {
  const localeParam = locale === 'en' ? 'en-US' : 'uk-UA';
  return new Date(date).toLocaleDateString(localeParam, {
    month: 'long',
    day: 'numeric',
  });
};
