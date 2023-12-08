import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import AsideCom from "./Components/AsideCom";
import { useState } from "react";

function App() {
  const [dataArray, setDataArray] = useState([20, 40, 70, 40, 50, 30]);
  const handleNavrbarButtonClick = (newData) => {
    setDataArray(newData);
  };

  return (
    <BrowserRouter>
      <div className="App" >
        <Navbar updateDataArray={handleNavrbarButtonClick} />
        <AsideCom />
        <Routes>
          <Route path="/" element={<Dashboard dataArray={dataArray} />} />
          <Route
            path="/account"
            element={<Dashboard dataArray={dataArray} />}
          />
          <Route
            path="/payroll"
            element={<Dashboard dataArray={dataArray} />}
          />
          <Route path="/report" element={<Dashboard dataArray={dataArray} />} />
          <Route
            path="/advisor"
            element={<Dashboard dataArray={dataArray} />}
          />
          <Route
            path="/contact"
            element={<Dashboard dataArray={dataArray} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
