import {
  BaseTextFieldProps,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import * as _ from "lodash";
import React, { useMemo } from "react";
import {
  CountryData,
  CountryIso2,
  FlagImage,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import "react-international-phone/style.css";
import { defaultCountriess } from "../language/countryDataa";
import { defaultCS } from "../language/csdefault";

export interface MUIPhoneProps extends BaseTextFieldProps {
  defaultCountry?: CountryIso2;
  dropdownCountries?: CountryIso2[];
  name: string;
  disableDialCodeAndPrefix?: boolean;
  hideDropdown?: boolean;
  locale?: "en" | "cs";
}

export const MuiPhone: React.FC<MUIPhoneProps> = ({
  name,
  defaultCountry = "cz",
  dropdownCountries,
  disableDialCodeAndPrefix = false,
  hideDropdown,
  locale,
  ...restProps
}) => {
  const [field, meta, helpers] = useField<string>(name);
  // function localizeCountries(
  //   countries: CountryData[],
  //   localization: { [key: string]: string }
  // ): CountryData[] {
  //   return countries.map((country) => {
  //     const countryCode = country[1]; // Kód země

  //     // Zkontrolujte, jestli existuje lokalizovaný název pro tuto zemi
  //     const localizedName = localization[countryCode.toUpperCase()];

  //     // Pokud existuje lokalizovaný název, nahradíme původní název
  //     if (localizedName) {
  //       country[0] = localizedName;
  //     }

  //     return country;
  //   });
  // }

  // const localizedCountries = localizeCountries(defaultCountriess, cs);
  // console.log(localizedCountries);

  const errorMessage = meta.touched && meta.error;
  const isError = meta.touched && Boolean(meta.error);

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

  const { handlePhoneValueChange, inputRef, country, setCountry, inputValue } =
    usePhoneInput({
      defaultCountry: defaultCountry,
      value: field.value,
      countries: countriesToDisplay,
      onChange: (data) => {
        helpers.setValue(data.phone);
      },
      disableDialCodeAndPrefix: hideDropdown ? false : disableDialCodeAndPrefix,
    });

  return (
    <TextField
      {...restProps}
      {...field}
      helperText={errorMessage}
      error={isError}
      value={inputValue}
      onChange={handlePhoneValueChange}
      type="tel"
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

                        fieldset: {
                          display: "none",
                        },
                        '&.Mui-focused:has(div[aria-expanded="false"])': {
                          fieldset: {
                            display: "block",
                          },
                        },

                        ".MuiSelect-select": {
                          padding: "8px !important",
                          margin: "0px",
                          marginBlockStart: "0px",
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
                        <FlagImage iso2={value} style={{ display: "flex" }} />
                      )}
                    >
                      {countriesToDisplay.map((c) => {
                        const country = parseCountry(c);
                        return (
                          <MenuItem
                            sx={{ margin: "0px", marginBlockStart: "0px" }}
                            key={country.iso2}
                            value={country.iso2}
                          >
                            <FlagImage
                              size={24}
                              iso2={country.iso2}
                              style={{ marginRight: "8px" }}
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
