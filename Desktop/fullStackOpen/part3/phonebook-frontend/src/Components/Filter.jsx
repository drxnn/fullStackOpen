const Filter = ({ persons, setAppState }) => {
  const handleFiltering = (event) => {
    const argument = event.target.value;

    const listToShow = persons.filter((el) =>
      el.name.toLowerCase().startsWith(argument.toLowerCase())
    );
    setAppState(listToShow);
  };

  return (
    <>
      filter names:
      <input placeholder="filter name:" onChange={handleFiltering} />
    </>
  );
};

export default Filter;
