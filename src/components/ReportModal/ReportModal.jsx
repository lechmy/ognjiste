import { useMemo, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { Button } from "@mui/material";
import { clearAllTable } from "../modal/activeTablesSlice";
import Modal from '@mui/material/Modal';
import workers from "../../data/workers.json";
import "./reportModal.css";

export default function ReportModal({ open, onClose }) {
  const printRef = useRef();
  const activeTables = useSelector(state => state.tables.activeTables);
  const [isPrinted, setIsPrinted] = useState(false)
  const dispatch = useDispatch();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    onAfterPrint: () => setIsPrinted(true)
  });

  const handleClearTables = () => {
    dispatch(clearAllTable())
    onClose()
  }

  const getAllArticles = () => {
    let articles = {}
    workers.workers.forEach(worker => {
      const tables = Object.values(activeTables[worker.name])
      tables.forEach(table => {
        table.bills.forEach(article => {
          if (articles[article.id]) {
            articles[article.id].quantity += article.quantity
            return
          }
          articles[article.id] = Object.assign({}, article)
        })
      })
    })
    return Object.values(articles)
  }

  const getAStatistic = () => {
    let stats = []
    workers.workers.forEach(worker => {
      const tables = Object.values(activeTables[worker.name])
      stats.push({
        name: worker.name,
        totalTables: tables.length,
        sum: tables.reduce((acc, item) => acc + item.total, 0)
      })
    })
    return stats
  }

  const summedArticles = useMemo(() => getAllArticles())
  const statistic = useMemo(() => getAStatistic())

  return (
    <Modal open={open} onClose={onClose}>
      <div className="report-modal">
        <div ref={printRef} className="report-body">
          <h1>Dnevni Izvestaj</h1>
          <div className="report-section">
            <div className="report-row row-header">
              <div className="report-column">Ime</div>
              <div className="report-column">Broj stolova</div>
              <div className="report-column">Ukupan iznos</div>
            </div>
            {statistic.map((stat, index) => {
              return (
                <div key={index} className="report-row">
                  <div className="report-column">{stat.name}</div>
                  <div className="report-column">{stat.totalTables}</div>
                  <div className="report-column">{stat.sum}</div>
                </div>
              )
            })}
          </div>
          <div className="report-section">
            <div className="report-row row-header">
              <div className="report-column-name">Artikal</div>
              <div className="report-column-quantity">Cena</div>
              <div className="report-column-price">Kol<span className="print-disable">icina</span></div>
            </div>
            {summedArticles.map(article => (
              <div key={article.id} className="report-row">
                <div className="report-column-name">{article?.artikal}</div>
                <div className="report-column-quantity">{article?.cena}</div>
                <div className="report-column-price">{article?.quantity}</div>
              </div>
            ))}
          </div>
          <div className="modal-controls">
            <Button variant="contained" color="error" size="large" onClick={onClose}>Zatvori</Button>
            <Button variant="contained" size="large" onClick={handlePrint}>Stampaj</Button>
            <Button variant="contained" color="warning" size="large" onClick={handleClearTables} disabled={!isPrinted}>Obrisi stolove</Button>
          </div>
        </div>
      </div>
    </Modal>
  )
} 