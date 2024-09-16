// hooks n shit
import { useState } from "react";

export const useField = (type, name) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = (e) => {
    e.preventDefault();
    setValue("");
  };

  return {
    type,
    value,
    name,
    onChange,
    reset,
  };
};

// takes name value and the onChange handler
