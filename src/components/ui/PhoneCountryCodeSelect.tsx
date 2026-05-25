interface PhoneCountryCodeSelectProps {
  className?: string;
  defaultValue?: string;
}

import { getCountries, getCountryCallingCode } from "react-phone-number-input";

const COMMON_COUNTRIES = [
  "US",
  "AM",
  "CA",
  "GB",
  "DE",
  "FR",
  "AE",
  "RU",
  "IN"
] as const;

function toFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

export function PhoneCountryCodeSelect({
  className,
  defaultValue = "US"
}: PhoneCountryCodeSelectProps): JSX.Element {
  const countries = getCountries().filter((country) =>
    (COMMON_COUNTRIES as readonly string[]).includes(country)
  );

  return (
    <select
      aria-label="Phone country code"
      className={`h-[52px] w-full border border-[#9c9c9c] bg-transparent px-2 text-[14px] text-[#1f2d41] outline-none focus:border-[#7f7f7f] ${className ?? ""}`}
      defaultValue={defaultValue}
    >
      {countries.map((country) => (
        <option key={country} value={country}>
          {toFlagEmoji(country)} +{getCountryCallingCode(country)}
        </option>
      ))}
    </select>
  );
}
