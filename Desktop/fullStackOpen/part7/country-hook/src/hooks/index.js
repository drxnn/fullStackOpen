import axios from "axios";
import { useState, useEffect } from "react";

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    console.log("in effect");
    if (name) {
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then((res) => {
          setCountry(res.data);
          console.log(country);
        })
        .catch(() => setCountry(null));
    }
  }, [name]);

  return country;
};

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};
