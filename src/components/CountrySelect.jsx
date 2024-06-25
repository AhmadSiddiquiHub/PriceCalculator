import React, { useState, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const CountrySelect = () => {
  const [value, setValue] = useState();
  const options = countryList().getData();

  const changeHandler = (value) => {
    setValue(value);
  };

  useEffect(() => {
    const defaultCountry = options.find((option) => option.label === "Germany");
    setValue(defaultCountry);
  }, [options]);

  return (
    <Select
      className="inp-outline inp-select"
      options={options}
      value={value}
      onChange={changeHandler}
    />
  );
};

export default CountrySelect;
