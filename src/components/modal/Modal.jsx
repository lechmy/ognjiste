import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from "react-to-print";
import Box from '@mui/material/Box';
import { Grid, Button } from '@mui/material';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import CustomerTable from "../CustomerTable";
import ActiveBill from "./ActiveBill";
import OrderInfo from '../OrderInfo';
import { removeAllFromCurrentBill } from '../bill/billSlice';
import { clearCurrentWorker } from "../workers/workersSlice";
import { createTable, clearCurrentTable, setCurrentTable } from './activeTablesSlice';
import "./modal.css";

export default function TablesModal({ open, handleTableModalClose }) {
  const orderPrintRef = useRef();
  const dispatch = useDispatch();
  const [val, setVal] = useState('');

  const currentBill = useSelector(state => state.bill.currentBill);
  const currentWorker = useSelector(state => state.workers.currentWorker);
  const workerTables = useSelector(state => state.tables.activeTables[currentWorker?.name]) || {};

  const handlePrint = useReactToPrint({
    content: () => orderPrintRef.current,
  });

  const handleClose = (e, reason) => {
    if(reason === 'backdropClick') {
      return;
    }
    dispatch(removeAllFromCurrentBill());
    dispatch(clearCurrentWorker());
    dispatch(clearCurrentTable());
    handleTableModalClose();
  }

  const handleChange = (e) => {
    setVal(e.target.value);
  }

  const handleClearRadio = () => {
    setVal('');
  }

  const addTable = () => {
    if(val !== '') {
      handlePrint()
      const table = { worker: currentWorker, place: val, date: Date.now(), bill: currentBill };
      dispatch(createTable(table));
      handleClose();
    }
    setVal('');
  }

  const addBill = (id) => {
    dispatch(setCurrentTable(id));
  }

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
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <Grid container spacing={4} sx={{ height: '100%' }}>
            <Grid item xs={4} sx={{ height: '100%' }}>
              <ActiveBill item handleModalClose={handleClose} clearRadio={handleClearRadio} handleAddBill={handlePrint} />
            </Grid>
            <Grid item xs={8}>
              <FormControl sx={{ marginBottom: '30px' }}>
                <FormLabel id="select hall">Izaberi salu</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="select hall"
                  name="radio-buttons-group"
                  value={val}
                  onChange={handleChange}
                >
                  <FormControlLabel value="Velika Sala" control={<Radio />} label="Velika Sala" />
                  <FormControlLabel value="Mala Sala" control={<Radio />} label="Mala Sala" />
                  <FormControlLabel value="Velika basta" control={<Radio />} label="Velika basta" />
                  <FormControlLabel value="Mala Basta" control={<Radio />} label="Mala Basta" />
                </RadioGroup>
                <Button variant="outlined" disabled={val === ''} onClick={addTable}>Dodaj Sto</Button>
              </FormControl>

              <div className='tables'>
                {Object.values(workerTables).map(t => (
                  <CustomerTable key={t.tableId} table={t} worker={currentWorker} onClick={() => {addBill(t.tableId)}} />
                ))}
              </div>
              
              <OrderInfo reference={orderPrintRef} />
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
