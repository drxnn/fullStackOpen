import React from "react";
import CountryData from "../CountryData";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const Display = ({ countries }) => {
  const [countriesToShow, setCountriesToShow] = useState([]);

  countries.forEach((el) => (el.show = false));
  console.log(countries);

  const buttonHandler = (index) => {
    const updatedCountries = [...countries];
    updatedCountries[index].show = true;
    const countryToShow = updatedCountries.filter((el) => el.show === true);
    setCountriesToShow(countryToShow);
  };

  return (
    <>
      {countries.length <= 1 && <CountryData country={countries[0]} />}
      {countriesToShow && <CountryData country={countriesToShow[0]} />}

      <ul>
        {countries.map((x, i) => {
          return (
            <div className="container-div" key={uuidv4()}>
              {" "}
              <li>{x.name.common}</li>
              <button onClick={() => buttonHandler(i)} className="btn">
                show
              </button>
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default Display;
