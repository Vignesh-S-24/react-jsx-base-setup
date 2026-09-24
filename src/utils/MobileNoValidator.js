import {
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
} from "libphonenumber-js";

function getCountriesFromCallingCode(callingCode) {
  const cleanCode = callingCode.replace("+", "").trim();

  return getCountries().filter(
    (country) => getCountryCallingCode(country) === cleanCode,
  )?.[0];
}
export const validatePhoneBasedRegion = (number, countryCode) => {
  try {
    if (!number || !countryCode) {
      return false;
    }

    return isValidPhoneNumber(
      `${number}`,
      `${getCountriesFromCallingCode(countryCode)}`,
    );
  } catch {
    return false;
  }
};
