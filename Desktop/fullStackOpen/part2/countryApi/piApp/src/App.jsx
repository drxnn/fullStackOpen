import { useState } from "react";
import axios from "axios";
import Display from "./Components/Display";

function App() {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      getAllCountries();
    }
  };
  const getAllCountries = () => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const filteredCountries = response.data.filter((country) =>
          country.name.common.toLowerCase().includes(value)
        );
        console.log(filteredCountries);
        setCountries(filteredCountries);
      })
      .catch((error) => {
        console.error(`Error fetching all countries: ${error.message}`);
      });
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <h1>find countries</h1>
      <input
        value={value}
        onChange={handleValueChange}
        onKeyDown={handleKeyPress}
      ></input>

      <Display countries={countries} />
    </>
  );
}

export default App;
