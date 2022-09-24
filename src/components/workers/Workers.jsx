import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { FaUser } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';
import { setCurrentWorker } from "./workersSlice";
import workers from "../../data/workers.json";
import "./workers.css";

export default function Workers() {
  const inputRef = useRef()
  const dispatch = useDispatch();
  const currentWorker = useSelector(state => state.workers.currentWorker);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState(false)
  const [hasError, setHasError] = useState(false)

  const handleWorkerClick = (worker) => {
    if(currentWorker?.id === worker?.id) {
      dispatch(setCurrentWorker(null));
    } else {
      // dispatch(setCurrentWorker(worker));
      setSelectedWorker(worker) 
      setShowPasswordDialog(true)
      setTimeout(() => { inputRef.current.focus() }, 0)
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const password = workers?.workers.find(item => item.name === selectedWorker.name).password
    if(e.target[0].value === password) {
      dispatch(setCurrentWorker(selectedWorker));
      setShowPasswordDialog(false)
      setHasError(false)
    } else {
      setHasError(true)
    }
  }

  const onCloseDialog = () => {
    setShowPasswordDialog(false)
    setHasError(false)
  }

  const onKeypress = (e) => {
    if(e.keyCode === 27) {
      onCloseDialog()
    }
  }

  return (
    <>
      <div className="workers">
        {workers.workers.map(worker => (
          <div 
            key={worker.id} 
            className={currentWorker?.name === worker?.name ? 'active-worker worker' : 'worker'}
            onClick={() => handleWorkerClick(worker)}>
            <FaUser />
            <span>{worker.name}</span>
          </div>
        ))}
      </div>
      {showPasswordDialog && 
        <div className="password-dialog" onKeyDown={onKeypress} tabIndex="0">
          <form onSubmit={onSubmit}>
            <div className="input-wrapper">
              <label>Unesi sifru</label>
              <input type="password" ref={inputRef} />
              {hasError && <span className="error">pogresna sifra</span>}
            </div>
            <Button variant="contained" size="large" type="submit">Ok</Button>
            <FaTimes className="close-btn" onClick={onCloseDialog} />
          </form>
        </div>
      }
    </>
  )
}
