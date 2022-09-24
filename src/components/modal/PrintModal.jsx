import React, { useRef, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from "react-to-print";
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { Button } from "@mui/material";
import Modal from '@mui/material/Modal';
import CustomerTable from "../CustomerTable";
import PrintActiveBill from "./PrintActiveBill";
import { removeAllFromCurrentBill } from '../bill/billSlice';
import { clearCurrentWorker } from "../workers/workersSlice";
import { clearCurrentTable, setCurrentTable, setCurrentTableToPaid } from './activeTablesSlice';
import "./modal.css";

const ComponentToPrint = forwardRef((props, ref) => {
  return <div ref={ref} style={{height: '100%'}}><PrintActiveBill {...props} /></div>;
});

export default function PrintModal({ open: openForPrint, handlePrintModalClose }) {
  const dispatch = useDispatch();
  const componentRef = useRef();
  const dailyReportRef = useRef();
  const currentWorker = useSelector(state => state.workers.currentWorker);
  const currentTable = useSelector(state => state.tables.currentTable);
  const workerTables = useSelector(state => state.tables.activeTables[currentWorker?.name]) || {};
  
  const handleClose = (e, reason) => {
    if(reason === 'backdropClick') {
      // return;
    }
    dispatch(removeAllFromCurrentBill());
    dispatch(clearCurrentWorker());
    dispatch(clearCurrentTable());
    handlePrintModalClose();
  }

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => dispatch(setCurrentTableToPaid({worker: currentWorker?.name, tableId: currentTable}))
  });

  const addBill = (id) => {
    dispatch(setCurrentTable(id));
  }

  const handlePrintReport = useReactToPrint({
    content: () => dailyReportRef.current,
  });


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70vw',
    height: '90vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3
  };

  return (
    <div>
      <Modal
        open={openForPrint}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Grid container spacing={4} sx={{ height: '100%' }}>
            <Grid item xs={4} sx={{ height: '100%' }}>
              <ComponentToPrint bodyClass="printing" ref={componentRef} item activeTable={workerTables[currentTable]} handleModalClose={handleClose} handlePrint={handlePrint} />
            </Grid>
            <Grid item xs={8}>
              <div className="print-modal-container">
                <div className="tables">
                  {Object.values(workerTables).map(t => (
                    <CustomerTable key={t.tableId} table={t} worker={currentWorker} onClick={() => {addBill(t.tableId)}} />
                  ))}
                </div>
                <Button size='large' variant="contained" onClick={handlePrintReport}>Dnevni izvestaj</Button>
                <div className="print-daily-report" ref={dailyReportRef}>
                  {Object.values(workerTables).map((table, index) => <PrintActiveBill key={index} activeTable={table} />)}
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
