import { useMemo, useState } from "react";
import { getCountryCallingCode, isPossiblePhoneNumber } from "react-phone-number-input";

import { PhoneCountryCodeSelect } from "@/components/ui/PhoneCountryCodeSelect";

interface PhoneNumberFieldProps {
  className?: string;
  codeClassName?: string;
  defaultCountry?: string;
  errorClassName?: string;
  inputClassName?: string;
  placeholder?: string;
}

const MAX_E164_DIGITS = 15;

function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

export function PhoneNumberField({
  className,
  codeClassName,
  defaultCountry = "US",
  errorClassName,
  inputClassName,
  placeholder = "Phone number"
}: PhoneNumberFieldProps): JSX.Element {
  const [country, setCountry] = useState(defaultCountry);
  const [nationalNumber, setNationalNumber] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const callingCode = getCountryCallingCode(country);
  const maxNationalDigits = Math.max(1, MAX_E164_DIGITS - callingCode.length);
  const fullNumber = `+${callingCode}${nationalNumber}`;

  const errorMessage = useMemo(() => {
    if (!isTouched || nationalNumber.length === 0) return "";

    return isPossiblePhoneNumber(fullNumber) ? "" : "Մուտքագրեք վավեր հեռախոսահամար։";
  }, [fullNumber, isTouched, nationalNumber.length]);

  return (
    <div className={`flex flex-col gap-1.5 ${className ?? ""}`}>
      <div className="grid grid-cols-[82px_minmax(0,1fr)] gap-2 sm:grid-cols-[92px_minmax(0,1fr)]">
        <PhoneCountryCodeSelect
          className={codeClassName}
          defaultValue={defaultCountry}
          onChange={(nextCountry, nextCallingCode) => {
            setCountry(nextCountry);
            setNationalNumber((current) =>
              current.slice(0, Math.max(1, MAX_E164_DIGITS - nextCallingCode.length))
            );
          }}
          value={country}
        />
        <input
          aria-invalid={Boolean(errorMessage)}
          className={`h-[52px] min-w-0 w-full border border-[#9c9c9c] bg-transparent px-3 [font-family:'Poppins',sans-serif] text-[15px] text-[#1f2d41] outline-none transition focus:border-[#c99716] focus:ring-2 focus:ring-[#e6c044]/30 sm:text-[17px] ${inputClassName ?? ""}`}
          inputMode="tel"
          maxLength={maxNationalDigits}
          onBlur={() => setIsTouched(true)}
          onChange={(event) => {
            setNationalNumber(digitsOnly(event.target.value).slice(0, maxNationalDigits));
          }}
          placeholder={placeholder}
          type="tel"
          value={nationalNumber}
        />
      </div>
      {errorMessage ? (
        <p
          className={`[font-family:'Poppins',sans-serif] text-[12px] font-semibold text-[#b3261e] ${errorClassName ?? ""}`}
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
