import "react-international-phone/style.css";

import { BaseTextFieldProps } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as _ from "lodash";
import React, { useMemo } from "react";
import {
  CountryData,
  CountryIso2,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import { defaultCountriess } from "../../language/countryDataa";
import { defaultCS } from "../../language/csdefault";

export interface PhoneNumberProps extends BaseTextFieldProps {
  /**
   * Phone value.
   */
  value: string;

  /**
   * Callback that calls on phone change.
   */
  onChange: (phone: string) => void;

  /**
   * The default country code (ISO2 format) to be used as the initial value.
   */
  defaultCountry?: CountryIso2;

  /**
   * An array of country codes (ISO2 format) to be displayed in the dropdown and used for country detection.
   */
  dropdownCountries?: CountryIso2[];

  /**
   * Hides the prefix in the input field.
   */
  disableDialCodeAndPrefix?: boolean;

  /**
   * Disables the dropdown. When this is enabled, `disableDialCodeAndPrefix` is always set to true.
   */
  hideDropdown?: boolean;

  /**
   * Translates countries in dropdown.  It can be one of the following values:
   *   - "en" for English
   *   - "cs" for Czech
   */
  locale?: "en" | "cs";
}

/**
 * PhoneNumber is a component that provides a phone number input field
 * . It validates the phone number and displays the prefix
 * and flag of the currently selected country. Users can input their phone number conveniently.
 */
export const PhoneNumber: React.FC<PhoneNumberProps> = ({
  value,
  onChange,
  defaultCountry = "cz",
  dropdownCountries,
  disableDialCodeAndPrefix = false,
  hideDropdown,
  locale,
  ...restProps
}) => {
  const translatedCountries = locale === "en" ? defaultCountriess : defaultCS;
  const countriesToDisplay: CountryData[] = useMemo(() => {
    return dropdownCountries
      ? _.compact(
          _.map(dropdownCountries, (iso2) =>
            _.find(translatedCountries, (country) => country[1] === iso2)
          )
        )
      : translatedCountries;
  }, [dropdownCountries, translatedCountries]);

  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: defaultCountry,
      value,
      countries: countriesToDisplay,
      onChange: (data) => {
        const prefix = "+" + data.country.dialCode;
        const isOnlyPrefix = data.phone === prefix;
        const finalValue = isOnlyPrefix ? "" : data.phone;

        onChange(finalValue);
      },
      disableDialCodeAndPrefix: hideDropdown ? false : disableDialCodeAndPrefix,
    });

  return (
    <TextField
      {...restProps}
      value={inputValue}
      onChange={handlePhoneValueChange}
      type="tel"
      data-cy="phone-number"
      inputRef={inputRef}
      slotProps={
        !hideDropdown
          ? {
              input: {
                startAdornment: (
                  <InputAdornment
                    position="start"
                    sx={{
                      marginRight: "2px",
                      marginLeft: "-8px",
                    }}
                  >
                    <Select
                      size={restProps.size}
                      MenuProps={{
                        transformOrigin: {
                          vertical: "top",
                          horizontal: "left",
                        },
                        sx: {
                          height: "300px",
                          maxWidth: "360px",
                          width: "100%",
                          top: "5px",
                          left: "-34px",
                        },
                      }}
                      sx={{
                        width: "max-content",
                        padding: "2px !important",
                        fieldset: {
                          display: "none !important",
                        },

                        ".MuiSelect-select": {
                          padding: "8px",
                          paddingRight: "24px !important",
                        },
                        svg: {
                          right: 0,
                        },
                      }}
                      value={country.iso2}
                      onChange={(e) =>
                        setCountry(e.target.value as CountryIso2)
                      }
                      renderValue={(value) => (
                        <FlagImage
                          size={24}
                          iso2={value}
                          style={{ display: "flex" }}
                        />
                      )}
                    >
                      {countriesToDisplay.map((c) => {
                        const country = parseCountry(c);
                        return (
                          <MenuItem key={country.iso2} value={country.iso2}>
                            <FlagImage
                              size={24}
                              iso2={country.iso2}
                              style={{
                                marginRight: "8px",
                              }}
                            />

                            <Typography marginRight="8px">
                              {country.name}
                            </Typography>

                            <Typography color="gray">
                              +{country.dialCode}
                            </Typography>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </InputAdornment>
                ),
              },
            }
          : undefined
      }
    />
  );
};
