
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { ThemeProvider } from "@emotion/react";
import { store } from "./store";
import BillContainer from "./components/bill-container";
import Menu from "./components/menu";
import TablesModal from "./components/modal/Modal";
import PrintModal from "./components/modal/PrintModal";
import Overview from "./components/Overview/Overview";
import ReportModal from "./components/ReportModal/ReportModal";
import LogModal from "./components/LogModal/LogModal";
import Header from "./components/Header/Header";

import theme from "./theme";
import './app.css';
import './print.css';
import 'normalize.css';

function App() {
  const [open, setOpen] = useState(false);
  const [openForPrint, setOpenForPrint] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [showLog, setShowLog] = useState(false);


  const handleTableModalClose = () => {
    setOpen(false)
  }

  const handlePrintModalClose = () => {
    setOpenForPrint(false)
  }

  useEffect(() => {
    const handleTabClose = event => {
      event.preventDefault();
      return (event.returnValue = 'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);


  return (
    <Provider store={store}>  
      <ThemeProvider theme={theme}>
        <div className="app">
          <Header
            onPrint={() => setOpenForPrint(true)}
            onOverview={() => setShowOverview(true)}
            onReport={() => setShowReport(true)}
            onLog={() => setShowLog(true)}
          />
          <div className="app-content">
            {showOverview
              ? <Overview onClose={() => setShowOverview(false)} />
              : <>
                <BillContainer handleTableModalOpen={() => setOpen(true)}/>
                <Menu />  
              </>
            }
          </div>
        </div>
        <TablesModal open={open} handleTableModalClose={handleTableModalClose} />
        <PrintModal open={openForPrint} handlePrintModalClose={handlePrintModalClose} />
        {showReport && <ReportModal open={showReport} onClose={() => setShowReport(false)} />}
        {showLog && <LogModal open={showLog} onClose={() => setShowLog(false)} />}
      </ThemeProvider>
    </Provider>
  );
}

export default App;
