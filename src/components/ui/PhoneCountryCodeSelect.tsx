import { Check, ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { getCountries, getCountryCallingCode } from "react-phone-number-input";
import labels from "react-phone-number-input/locale/en.json";

interface PhoneCountryCodeSelectProps {
  className?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (country: string, callingCode: string) => void;
}

function toFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

const countryLabels = labels as Record<string, string>;

const countryOptions = getCountries().map((country) => {
  const callingCode = getCountryCallingCode(country);

  return {
    callingCode,
    country,
    flag: toFlagEmoji(country),
    label: countryLabels[country] ?? country
  };
});

export function PhoneCountryCodeSelect({
  className,
  defaultValue = "US",
  value,
  onChange
}: PhoneCountryCodeSelectProps): JSX.Element {
  const currentValue = value ?? defaultValue;
  const fallbackCountry = countryOptions.some((option) => option.country === currentValue)
    ? currentValue
    : countryOptions.some((option) => option.country === defaultValue)
    ? defaultValue
    : "US";
  const [selectedCountry, setSelectedCountry] = useState(fallbackCountry);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const selectedOption =
    countryOptions.find((option) => option.country === selectedCountry) ?? countryOptions[0];

  useEffect(() => {
    if (value && countryOptions.some((option) => option.country === value)) {
      setSelectedCountry(value);
    }
  }, [value]);

  const filteredOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase().replace(/^\+/, "");

    if (!normalizedQuery) return countryOptions;

    return countryOptions.filter((option) => {
      return (
        option.label.toLowerCase().includes(normalizedQuery) ||
        option.country.toLowerCase().includes(normalizedQuery) ||
        option.callingCode.includes(normalizedQuery)
      );
    });
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;

    const focusTimer = window.setTimeout(() => searchRef.current?.focus(), 20);

    return () => window.clearTimeout(focusTimer);
  }, [isOpen]);

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent): void => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);

    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  const selectCountry = (country: string, callingCode: string): void => {
    setSelectedCountry(country);
    setIsOpen(false);
    setQuery("");
    onChange?.(country, callingCode);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Phone country code"
        className={`group flex h-[52px] w-full items-center justify-between gap-1 border border-[#9c9c9c] bg-white/70 px-2 text-[#1f2d41] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] outline-none transition duration-200 hover:border-[#c99716] hover:bg-white focus:border-[#c99716] focus:ring-2 focus:ring-[#e6c044]/30 ${className ?? ""}`}
        onClick={() => setIsOpen((current) => !current)}
        onKeyDown={(event) => {
          if (event.key.length === 1 || event.key === "Backspace") {
            setIsOpen(true);
          }
        }}
        type="button"
      >
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="text-[16px] leading-none">{selectedOption.flag}</span>
          <span className="truncate [font-family:'Poppins',sans-serif] text-[13px] font-semibold leading-none">
            +{selectedOption.callingCode}
          </span>
        </span>
        <ChevronDown
          aria-hidden="true"
          className={`h-3.5 w-3.5 shrink-0 text-[#516170] transition duration-200 group-hover:text-[#c99716] ${
            isOpen ? "rotate-180 text-[#c99716]" : ""
          }`}
        />
      </button>

      {isOpen ? (
        <div className="absolute left-0 top-[calc(100%+6px)] z-[2147483647] w-[min(250px,calc(100vw-2rem))] overflow-hidden rounded-[6px] border border-[#d2b046] bg-white shadow-[0_18px_38px_rgba(15,23,42,0.22)]">
          <div className="flex items-center gap-2 border-b border-[#ece3bf] bg-[#fff9df] px-3 py-2">
            <Search className="h-4 w-4 shrink-0 text-[#b38612]" aria-hidden="true" />
            <input
              ref={searchRef}
              aria-label="Search country code"
              className="min-w-0 flex-1 bg-transparent [font-family:'Poppins',sans-serif] text-[13px] text-[#1f2d41] outline-none placeholder:text-[#7a8490]"
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Escape") {
                  setIsOpen(false);
                  setQuery("");
                }
              }}
              placeholder="Search country or code"
              value={query}
            />
          </div>

          <div className="max-h-[190px] overflow-y-auto py-1" role="listbox">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => {
                const isSelected = option.country === selectedCountry;

                return (
                  <button
                    aria-selected={isSelected}
                    className={`flex w-full items-center gap-2 px-3 py-2 text-left transition ${
                      isSelected
                        ? "bg-[#f7e7a9] text-[#14213d]"
                        : "text-[#263545] hover:bg-[#fff4c7]"
                    }`}
                    key={option.country}
                    onClick={() => selectCountry(option.country, option.callingCode)}
                    role="option"
                    type="button"
                  >
                    <span className="text-[17px] leading-none">{option.flag}</span>
                    <span className="min-w-0 flex-1 truncate [font-family:'Poppins',sans-serif] text-[13px] font-medium">
                      {option.label}
                    </span>
                    <span className="[font-family:'Poppins',sans-serif] text-[12px] font-semibold text-[#9f7412]">
                      +{option.callingCode}
                    </span>
                    {isSelected ? (
                      <Check className="h-3.5 w-3.5 shrink-0 text-[#9f7412]" aria-hidden="true" />
                    ) : null}
                  </button>
                );
              })
            ) : (
              <p className="px-3 py-4 text-center [font-family:'Poppins',sans-serif] text-[13px] text-[#6d7681]">
                No country found
              </p>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
