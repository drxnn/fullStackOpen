import { useDispatch } from "react-redux";
import { setFilter } from "../reducers/filterReducer";
const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    let content = event.target.value;
    console.log(content);

    dispatch(setFilter(content));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input name="filter" onChange={handleChange} />
    </div>
  );
};

export default Filter;
