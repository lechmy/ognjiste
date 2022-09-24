import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import logsStorage from '../../storage/logs';
import "./LogModal.css";

export default function LogModal({ open, onClose }) {
  const { getLogs } = logsStorage()
  
  return (
    <Modal open={open} onClose={onClose}>
      <div className="log-body">
        <h1>Logovi</h1>
        <div className="log-section">
          <div className="log-row row-header">
            <div className="log-column">Radnik</div>
            <div className="log-column">Artikal</div>
            <div className="log-column">Cena</div>
            <div className="log-column">Datum</div>
          </div>
          {getLogs().map((log,index) => {
            return (
              <div key={index} className="log-row">
                <div className="log-column">{log.worker}</div>
                <div className="log-column">{log.artikal}</div>
                <div className="log-column">{log.cena}</div>
                <div className="log-column">{new Date(log.time).toLocaleString()}</div>
              </div>
            )
          })}
        </div>
        <div className="modal-controls">
          <Button variant="contained" color="error" size="large" onClick={onClose}>Zatvori</Button>
        </div>
      </div>
    </Modal>
  )
} 