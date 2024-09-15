// import React, { useState, useEffect } from "react";
// import Select from "react-select";
// import countryList from "react-select-country-list";

// const CountrySelect = () => {
//   const [value, setValue] = useState();
//   const options = countryList().getData();

//   const changeHandler = (value) => {
//     setValue(value);
//   };

//   useEffect(() => {
//     const defaultCountry = options.find((option) => option.label === "Germany");
//     setValue(defaultCountry);
//   }, [options]);

//   return (
//     <Select
//       className="inp-outline inp-select"
//       options={options}
//       value={value}
//       onChange={changeHandler}
//     />
//   );
// };

// export default CountrySelect;

import React, { useState, useEffect } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const CountrySelect = ({ value, onChange }) => {
  const allOptions = countryList().getData();

  // Filter the country list to include only France, Belgium, and Luxembourg
  const options = allOptions.filter((option) =>
    ["France", "Belgium", "Luxembourg"].includes(option.label)
  );

  const changeHandler = (value) => {
    onChange(value);
  };

  useEffect(() => {
    if (!value) {
      const defaultCountry = options.find(
        (option) => option.label === "Belgium"
      );
      onChange(defaultCountry);
    }
  }, [options, value, onChange]);

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
