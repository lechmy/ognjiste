import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { FaRegEye, FaPrint } from 'react-icons/fa';
import Workers from "../workers/Workers";
import { ADMIN } from "../../consts/consts";
import "./Header.css"

export default function Header({ onPrint, onOverview, onReport, onLog }) {
  const currentWorker = useSelector(state => state.workers.currentWorker)

  return (
    <header className="header">
      <Workers />
      <div className="header-controls">
        {currentWorker?.name === ADMIN &&
          <>
            <Button
              className="header-controls-btn"
              variant="contained"
              startIcon={<FaPrint />}
              onClick={onLog}>
              Logovi
            </Button>
            <Button
              className="header-controls-btn"
              variant="contained"
              startIcon={<FaPrint />}
              onClick={onReport}>
              Izvestaj
            </Button>
          </>
        }
        <Button
          className="header-controls-btn"
          variant="contained"
          startIcon={<FaPrint />}
          onClick={onPrint}
          disabled={currentWorker ? false : true}>
          Stampaj
        </Button>
        <Button
          className="header-controls-btn"
          variant="contained"
          startIcon={<FaRegEye />}
          onClick={onOverview}>
          Pregled stolova
        </Button>
      </div>
    </header>
  )
}