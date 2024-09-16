// hooks n shit
import { useState } from "react";

export const useField = (type, name) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return {
    type,
    value,
    name,
    onChange,
  };
};

// takes name value and the onChange handler
