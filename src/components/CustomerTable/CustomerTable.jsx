import { useSelector } from 'react-redux';
import "./CustomerTable.css";

export default function CustomerTable({ className = '', table, worker, onClick }) {
  const { tableId, date, place, paid } = table;
  const d = new Date(date);

  const active = useSelector(state => state.tables.currentTable === tableId);

  return (
    <div className={`table ${active ? 'active' : ''} ${paid ? 'paid' : ''}  ${className}`} onClick={onClick}>
      {worker?.name && (<h3>{worker.name}</h3>)}
      <p>{place}</p>
      <small>{d.toLocaleString()}</small>
    </div>
  );
}
