const logsStorage = () => {
  const ID = 'logs';

  const setLogs = (value) => {
    const logs = getLogs()
    localStorage.setItem(ID, JSON.stringify([...logs, { ...value, time: new Date() }]));
  }

  const getLogs = () => {
    return JSON.parse(localStorage.getItem(ID)) || [];
  }

  const removeLogs = () => {
    localStorage.removeItem(ID);
  }

  return {
    setLogs,
    getLogs,
    removeLogs,
  }
}

export default logsStorage