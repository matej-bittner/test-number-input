import * as React from "react";

import { ListItemIcon, MenuItem, Select } from "@mui/material";
import {
  Country,
  default as CountrySelectComponent,
  type Value,
} from "react-phone-number-input";
interface ISelectProps
  extends React.ComponentProps<typeof CountrySelectComponent> {
  value?: Country;
  options: {
    value?: Country;
    label: string;
  }[];
}

const CountrySelect = ({
  options,
  onChange,
  iconComponent: Icon,
  value,
  ...rest
}: ISelectProps) => {
  return (
    <Select
      {...rest}
      value={value}
      defaultValue={value}
      size="small"
      renderValue={(selected) => Icon({ country: selected })}
      onChange={(event: React.ChangeEvent<{ value: Value }>) => {
        // console.log("val", event.target.value);

        onChange!(event.target.value as Value);
      }}
      sx={{
        "& label": { paddingLeft: (theme) => theme.spacing(2) },
        "& input": { paddingLeft: (theme) => theme.spacing(3.5) },
        "& fieldset": {
          paddingLeft: (theme) => theme.spacing(2.5),
          borderRadius: "0px",
          borderTopLeftRadius: "5px",
          borderBottomLeftRadius: "5px",
        },

        ".MuiSelect-select": {
          display: "flex",
          alignItems: "center",
        },
      }}
      MenuProps={{
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        PaperProps: {
          style: {
            maxHeight: 200,
            overflow: "auto",
            marginTop: 5,
          },
        },
      }}
    >
      {options?.map(({ label, value: country }) => {
        return (
          <MenuItem key={country + label} value={country}>
            <ListItemIcon>{Icon({ country })}</ListItemIcon>
            {label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default CountrySelect;
