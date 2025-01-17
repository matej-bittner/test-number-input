import * as React from "react";

import {
  ListItemIcon,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  Country,
  default as CountrySelectComponent,
  type Value,
} from "react-phone-number-input";

interface ISelectProps
  extends React.ComponentProps<typeof CountrySelectComponent> {
  value?: Value;
  options: {
    value?: Country;
    label: string;
  }[];
  onChange: (newValue: Value) => void;
  variant?: "filled" | "outlined" | "standard";
  size?: "medium" | "small";
  readOnly?: boolean;

  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  id?: string;
  disabled?: boolean;
}

const CountrySelect = ({
  options,
  onChange,
  iconComponent: Icon,
  value,

  variant,
  id,
  onBlur,
  onFocus,
  readOnly,
  size,
  ...props
}: ISelectProps) => {
  return (
    <Select
      // {...props}
      value={value}
      defaultValue={value}
      size={size}
      readOnly={readOnly}
      onFocus={onFocus}
      onBlur={onBlur}
      id={id}
      variant={variant}
      renderValue={(selected) => Icon({ country: selected })}
      onChange={(event: SelectChangeEvent<Value>) => {
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
      {options.map(({ label, value: country }) => {
        return (
          <MenuItem key={country + label} value={country as Value}>
            <ListItemIcon>{Icon({ country })}</ListItemIcon>
            {label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default CountrySelect;
