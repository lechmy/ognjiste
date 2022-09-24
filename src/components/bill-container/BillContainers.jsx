import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { removeAllFromCurrentBill } from "../bill/billSlice";
import Bill from "../bill";
import "./bill-container.css";

export default function BillContainers({ handleTableModalOpen }) {
  const currentWorker = useSelector(state => state.workers.currentWorker);
  const currentBill = useSelector(state => state.bill.currentBill);
  const dispatch = useDispatch();

  return (
    <div className="bill-container">
      <header className="bill-header">
        <div className="bill-header-commands">
          <Button onClick={() => dispatch(removeAllFromCurrentBill())} color="error">Obrisi sve</Button>
          <Button onClick={handleTableModalOpen} disabled={!currentWorker || currentBill === null || currentBill.length === 0 } color="success">Sacuvaj</Button>
        </div>
      </header>
      <Bill />
    </div>
  )
}
