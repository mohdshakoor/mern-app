import "./App.css";
import Navbar from "./components/Navbar";
import Read from "./components/read";
import Update from "./components/update";
import Create from "./components/create";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route exact path="/" element={<Create />} />
          <Route exact path="/all" element={<Read />} />
          <Route exact path="/update" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
