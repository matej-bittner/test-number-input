export const localizeCountries = (countries, locale) => {
  return countries.map(({ name, code, dialCode }) => {
    const localizedName = locale[code.toUpperCase()] || name; // Lokalizovaný název podle kódu
    return { name: localizedName, code, dialCode }; // Vytvoření lokalizovaného objektu
  });
};
