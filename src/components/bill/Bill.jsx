import { useSelector, useDispatch } from "react-redux";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { addToCurrentBill, removeFromCurrentBill } from "../bill/billSlice";

export default function Bill() {
  const currentBill = useSelector(state => state.bill.currentBill);
  const dispatch = useDispatch();
  
  const increaseQuantity = (a) => {
    dispatch(addToCurrentBill(a));
  }

  const decreaseQuantity = (a) => {
    dispatch(removeFromCurrentBill(a));
  }

  return (
    <div className='bill'>
        <TableContainer component={Paper}>
        <Table stickyHeader sx={{ minWidth: 400 }} aria-label="bill">
          <TableHead>
            <TableRow>
              <TableCell>Ime proizvoda</TableCell>
              <TableCell align="right">Kolicina</TableCell>
              <TableCell align="right">Cena</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {currentBill.length > 0 ? currentBill.map((currentBillRow) => (
              <TableRow
                key={currentBillRow.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="currentBillRow">
                  {currentBillRow.artikal}
                </TableCell>
                <TableCell align="right">{currentBillRow.quantity}</TableCell>
                <TableCell align="right">{currentBillRow.cena}</TableCell>
                <TableCell align="right">
                  <FaPlus onClick={() => increaseQuantity(currentBillRow)} style={{ cursor: 'pointer', marginRight: '10px' }}/>
                  <FaMinus onClick={() => decreaseQuantity(currentBillRow)} style={{ cursor: 'pointer', marginLeft: '10px' }}/>
                </TableCell>
              </TableRow>
            )) : null}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
