import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import { FaMinus } from 'react-icons/fa';
import CustomerTable from "../CustomerTable";
import { updateArticle } from "../modal/activeTablesSlice";
import logsStorage from "../../storage/logs";
import { ADMIN } from "../../consts/consts";
import workers from "../../data/workers.json";
import "./overview.css"


export default function Overview({ onClose }) {
  const [tableDetails, setTableDetails] = useState()
  const currentWorker = useSelector(state => state.workers.currentWorker);
  const activeTables = useSelector(state => state.tables.activeTables);
  const activeTable = useSelector(state => state.tables.activeTables[tableDetails?.worker] ? state.tables.activeTables[tableDetails?.worker][tableDetails?.table?.tableId] : null);
  const dispatch = useDispatch();
  const { setLogs } = logsStorage();

  const decreaseQuantity = (tableId, worker, article) => {
    dispatch(updateArticle({
      tableId,
      worker,
      article
    }));

    setLogs({ ...article, worker: currentWorker.name });
  }

  const handleSelectTable = (table, worker) => {
    setTableDetails({ table, worker })
  }

  return (
    <div className="overview-wrapper">
      <div className="overview-header">
        <h2>Pregled stolova</h2> 
        <Button variant="contained" size="large" onClick={onClose}>Nazad</Button>
      </div>
      <div className="overview-container">
        <div className="overview-body">
          {workers.workers.map(worker => {
            if(worker?.name === currentWorker?.name || currentWorker?.name === ADMIN) {
              const tables = Object.values(activeTables[worker.name])
              return (
                <div key={worker.id} className="overview-row">
                  <div className="overview-worker">{worker.name}</div>
                  <div className="overview-table-container">
                    {tables.map(table => {
                      return (
                        <CustomerTable key={table.tableId} table={table} onClick={() => handleSelectTable(table, worker.name)} />
                        )
                      })}
                  </div>
                </div>
              )
            } else {
              return false
            }
          })}
        </div>
        {activeTable != null && 
          <div className="overview-table-details">
            <Button variant="contained" size="large" className="table-details-close" onClick={() => setTableDetails(null)}>Zatvori</Button>
            <div className="table-details-container table-details-header">
              <div className="name">Artikal</div>
              <div className="price">Cena</div>
              <div className="quantity text-center">Kol.</div>
            </div>
            {activeTable.bills.map(article => (
              <div key={article.id} className="table-details-container">
                <div className="name">{article.artikal}</div>
                <div className="price">{article.cena}</div>
                <div className="quantity">
                  {article.quantity}
                  <FaMinus onClick={() => decreaseQuantity(tableDetails.table.tableId, tableDetails.worker, article)} style={{ cursor: 'pointer', marginLeft: '10px' }}/>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}