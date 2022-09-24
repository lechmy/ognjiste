const tablesStorage = () => {
  const ID = "tables"

  const setTable = (value) => {
    localStorage.setItem(ID, JSON.stringify(value));
  }

  const getTables = () => {
    return JSON.parse(localStorage.getItem(ID));
  }

  const removeTables = () => {
    localStorage.removeItem(ID);
  }

  return {
    setTable,
    getTables,
    removeTables,
  }
}

export default tablesStorage
