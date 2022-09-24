import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableFooter from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { updateTable } from './activeTablesSlice';

export default function ActiveBill({ handleModalClose, clearRadio, handleAddBill }) {
  const dispatch = useDispatch();
  const currentTableId = useSelector(state => state.tables.currentTable);
  const currentWorker = useSelector(state => state.workers.currentWorker);
  const currentBill = useSelector(state => state.bill.currentBill);
  const activeTable = useSelector(state => state.tables.activeTables[currentWorker.name][currentTableId]);

  const d = new Date(activeTable?.date);

  const handleUpdateTable = () => {
    handleAddBill()
    dispatch(updateTable({tableId: currentTableId, worker: currentWorker.name, bill: currentBill}));
    clearRadio();
    handleModalClose();
  }

  return (
    <div className='active-bill' style={{ height: '100%' }}>
        <h1 style={{ height: '40px', marginBottom: '5px' }}>Racun</h1>

        {activeTable ? (
          <>
          <TableContainer component={Paper} sx={{ height: 'calc(90vh - 164px)'}}>
          <Table stickyHeader sx={{ minWidth: 400 }} aria-label="bill">
            <TableHead>
              <TableRow>
                <TableCell>Ime proizvoda</TableCell>
                <TableCell align="right">Kolicina</TableCell>
                <TableCell align="right">Cena</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {activeTable?.bills?.length > 0 ? activeTable.bills.map((currentBillRow) => (
                <TableRow
                  key={currentBillRow.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="currentBillRow">
                    {currentBillRow.artikal}
                  </TableCell>
                  <TableCell align="right">{currentBillRow.quantity}</TableCell>
                  <TableCell align="right">{currentBillRow.cena}</TableCell>
                </TableRow>
              )) : null}
            </TableBody>
            <TableFooter>
            <TableRow>
              <TableCell rowSpan={3}></TableCell>
              <TableCell>Suma</TableCell>
              <TableCell align="right">{activeTable.total}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Konobar</TableCell>
              <TableCell align="right">{currentWorker.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Datum</TableCell>
              <TableCell align="right">{d.toLocaleString()}</TableCell>
            </TableRow>
          </TableFooter>
          </Table>
        </TableContainer>

        <div className="buttons">
          <Button size='large' variant="contained" onClick={handleUpdateTable}>Dodaj</Button>
        </div>
        </>
       ) : null}
      
    </div>
  )
}
