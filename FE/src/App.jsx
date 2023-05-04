import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";

import "./App.css";

function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="hu-en">
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
      </LocalizationProvider>
    </>
  );
}

export default App;
