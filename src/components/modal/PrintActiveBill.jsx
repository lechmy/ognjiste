import React from 'react'
import { useSelector } from 'react-redux';
import Button from '@mui/material/Button';

export default function PrintActiveBill({ activeTable, handleModalClose, handlePrint }) {
  const currentWorker = useSelector(state => state.workers.currentWorker);

  const d = new Date(activeTable?.date);
  const sum = activeTable?.bills.reduce((acc, curr) => {
    return acc + (curr.quantity * curr.cena);
  }, 0);

  return (
    <div className="active-bill">
      <h1>Iznos</h1>

      {activeTable ? (
        <>
          <div className="articles-container">
            <div className="articles-row">
              <span className="articles-column-name">Ime proizvoda</span>
              <span className="articles-column-quantity">Kol<span className="print-disable">icina</span></span>
              <span className="articles-column-quantity">Cena</span>
            </div>
            
            {activeTable?.bills?.length ? activeTable.bills.map((currentBillRow) => (
              <div className="articles-row">
                <span className="articles-column-name">{currentBillRow.artikal}</span>
                <span className="articles-column-quantity">{currentBillRow.quantity}</span>
                <span className="articles-column-price">{currentBillRow.cena}</span>
              </div>
            )) : null}

            <div className="check-details">
              <div>Suma: {sum} RSD</div>
              <div>Konobar: {currentWorker.name}</div>
              <div>Datum: {d.toLocaleString()}</div>
            </div>
            <div className="check-signature">
              Potpis:
              <hr />
            </div>
          </div>
          <div className="modal-controls">
            <Button size='large' variant="contained" color="error" onClick={() => handleModalClose()}>Zatvori</Button>
            <Button size='large' variant="contained" onClick={handlePrint}>Stampaj</Button>
          </div>
        </>
      ) : null}
    </div>
  )
}
