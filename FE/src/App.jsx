import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import useDeviceDetect from "./hooks/useDeviceDetect";
import useWindowSize from "./hooks/useWindowSize";
import MobileMenu from "./components/MobileMenu";

import "./App.css";

function App() {

  const { isMobile } = useDeviceDetect()
  const size = useWindowSize()


  return (
    <>
      <LocalizationProvider dateAdapter={AdapterLuxon} adapterLocale="hu-en">
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
        { size.width <= 1024 && <MobileMenu />}
      </LocalizationProvider>
    </>
  );
}

export default App;
