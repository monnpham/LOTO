import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { Toaster } from "react-hot-toast";
import HomePage from "./page/HomePage";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
